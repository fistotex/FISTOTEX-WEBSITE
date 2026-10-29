"""Offline durable review queue and static numeric-card preview. No network or deployment."""
import datetime as dt, hashlib, html, json, re, sqlite3
from decimal import Decimal, InvalidOperation
from urllib.parse import urlparse
HOSTS={'www.bseindia.com','nsearchives.nseindia.com','archives.nseindia.com','www.nseindia.com'}
def now():return dt.datetime.now(dt.timezone.utc).isoformat()
def digest(value):return hashlib.sha256(json.dumps(value,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def valid_source(url):
    u=urlparse(url)
    return u.scheme=='https' and u.hostname in HOSTS and not u.username and not u.password

def validate(candidate, provenance):
    issues=list(candidate.get('issues',[]))
    required=['company','entity','basis','start','end','figures']
    if any(not candidate.get(k) for k in required):issues.append('Missing candidate identity or figures')
    if candidate.get('basis') not in ('Standalone','Consolidated'):issues.append('Unsupported basis')
    try:
        a,b=dt.date.fromisoformat(candidate['start']),dt.date.fromisoformat(candidate['end'])
        if not 80<=(b-a).days<=100:issues.append('Not a quarter')
    except (KeyError,ValueError):issues.append('Invalid quarter')
    if not valid_source(provenance.get('sourceUrl','')):issues.append('Unsupported source URL')
    if not re.fullmatch('[0-9a-f]{64}',provenance.get('documentSha256','')):issues.append('Missing document SHA256')
    if not provenance.get('contextIds') or not provenance.get('factReferences'):issues.append('Missing context/fact provenance')
    if not provenance.get('filingId'):issues.append('Missing source filing identity')
    for metric in ['revenue','patTotal','epsBasic']+(['patOwners'] if candidate.get('basis')=='Consolidated' else []):
        fact=candidate.get('figures',{}).get(metric,{})
        try:
            for key in ['current','prior','yoyPercent','previous','qoqPercent']:
                v=fact.get(key)
                if v is not None and not Decimal(str(v)).is_finite():raise ValueError()
            if fact.get('current') is None:raise ValueError()
        except (InvalidOperation,ValueError):issues.append('Invalid '+metric)
        expected='INR/share' if metric=='epsBasic' else 'INR crore'
        if fact.get('unit')!=expected:issues.append('Wrong unit '+metric)
    if candidate.get('basis')=='Consolidated' and not candidate.get('figures',{}).get('patOwners'):issues.append('Owners PAT absent')
    return sorted(set(issues))

class Queue:
    def __init__(self,path):
        self.db=sqlite3.connect(path)
        self.db.execute('CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY, series TEXT, payload TEXT, state TEXT, issues TEXT, review TEXT, created TEXT)')
        self.db.execute('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, record_id TEXT, action TEXT, evidence TEXT, created TEXT)')
        self.db.commit()
    def ingest(self,candidate,provenance):
        # Copy values so callers cannot mutate stored evidence after review.
        payload=json.loads(json.dumps({'candidate':candidate,'provenance':provenance}))
        identity={k:candidate.get(k) for k in ['entity','basis','start','end']}
        series=digest(identity)
        rid=digest(payload)
        if self.db.execute('SELECT 1 FROM records WHERE id=?',(rid,)).fetchone():return rid
        issues=validate(candidate,provenance)
        # Revised/different source evidence never silently replaces an approved version.
        with self.db:
            prior=self.db.execute('SELECT id,state FROM records WHERE series=?',(series,)).fetchall()
            if prior:
                issues.append('New version/source evidence for an existing company-period-basis; reconcile before review')
                for old,state in prior:
                    if state=='reviewed':
                        self.db.execute("UPDATE records SET state='review_invalidated' WHERE id=?",(old,))
                        self.db.execute('INSERT INTO events(record_id,action,evidence,created) VALUES(?,?,?,?)',(old,'review_invalidated',rid,now()))
            self.db.execute('INSERT INTO records VALUES(?,?,?,?,?,?,?)',(rid,series,json.dumps(payload,sort_keys=True),'review_needed',json.dumps(issues),None,now()))
            self.db.execute('INSERT INTO events(record_id,action,evidence,created) VALUES(?,?,?,?)',(rid,'ingested',provenance.get('documentSha256',''),now()))
        return rid
    def get(self,rid):
        row=self.db.execute('SELECT payload,state,issues,review FROM records WHERE id=?',(rid,)).fetchone()
        if not row:raise KeyError(rid)
        return {'id':rid,**json.loads(row[0]),'state':row[1],'issues':json.loads(row[2]),'review':json.loads(row[3]) if row[3] else None}
    def review(self,rid,reviewer,statement_evidence,resolutions):
        record=self.get(rid)
        if record['state']!='review_needed':raise ValueError('Only pending records can be reviewed')
        if not reviewer.strip() or not statement_evidence.strip():raise ValueError('Named reviewer and independent statement evidence required')
        # Every issue needs an explicit evidence note; no bypass boolean.
        if any(not str(resolutions.get(i,'')).strip() for i in record['issues']):raise ValueError('Unresolved issues remain')
        structural=[i for i in validate(record['candidate'],record['provenance']) if i not in record['candidate'].get('issues',[])]
        if structural:raise ValueError('Invalid structure/provenance requires corrected candidate, not review override')
        review={'reviewer':reviewer,'statementEvidence':statement_evidence,'resolutions':resolutions,'at':now(),'payloadHash':digest({'candidate':record['candidate'],'provenance':record['provenance']})}
        with self.db:
            self.db.execute("UPDATE records SET state='reviewed',review=? WHERE id=?",(json.dumps(review),rid))
            self.db.execute('INSERT INTO events(record_id,action,evidence,created) VALUES(?,?,?,?)',(rid,'reviewed',json.dumps(review),now()))
    def render(self,rid):
        record=self.get(rid)
        if record['state']!='reviewed':raise ValueError('No card before review')
        c=record['candidate'];p=record['provenance']
        if record['review']['payloadHash']!=digest({'candidate':c,'provenance':p}):raise ValueError('Evidence changed after review')
        esc=lambda s:html.escape(str(s),quote=True)
        rows=[]
        for key,label in [('revenue','Revenue from operations'),('patOwners' if c['basis']=='Consolidated' else 'patTotal','Net profit attributable to owners' if c['basis']=='Consolidated' else 'Net profit'),('epsBasic','Basic EPS')]:
            f=c['figures'][key];current=f['current'];prior=f.get('prior');change=f.get('yoyPercent')
            fmt=lambda v:format(Decimal(str(v)),'.2f')
            comparison='Not available' if prior is None else fmt(prior)+(f' ({fmt(change)}% YoY)' if change is not None else ' (YoY not meaningful)')
            previous=f.get('previous');qoq=f.get('qoqPercent')
            sequential='Not available' if previous is None else fmt(previous)+(f' ({fmt(qoq)}% QoQ)' if qoq is not None else ' (QoQ not meaningful)')
            rows.append(f'<section><h2>{label}</h2><strong>{esc(fmt(current))} {esc(f["unit"])}</strong><p>Year ago: {esc(comparison)}</p><p>Previous quarter: {esc(sequential)}</p></section>')
        return '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reviewed numeric card preview</title><style>body{font:16px system-ui;max-width:640px;margin:24px auto;padding:0 24px;color:#251f21}h1{font-size:28px}h2{font-size:16px}section{border-top:1px solid #eae9ea;padding:16px 0}strong{font-size:22px;color:#446f63}p{line-height:1.5}footer{font-size:12px;overflow-wrap:anywhere}</style>'+f'<h1>{esc(c["company"])}</h1><p>{esc(c["start"])} to {esc(c["end"])} · {esc(c["basis"])}</p><p>OFFLINE REVIEWED PREVIEW. Not published or automatic.</p>'+''.join(rows)+f'<footer><a href="{esc(p["sourceUrl"])}">Original statement</a><p>Checked by {esc(record["review"]["reviewer"])}. Source document SHA256: {esc(p["documentSha256"])}</p></footer></html>'

# No CLI that publishes, no collector, and no production credentials.
