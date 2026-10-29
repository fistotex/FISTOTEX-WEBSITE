"""Private metadata-only RSS review intake. No network, attachments or publication."""
import argparse,hashlib,json,pathlib,re,sqlite3

def intake(root,db_path):
    db=sqlite3.connect(db_path)
    db.executescript('CREATE TABLE IF NOT EXISTS samples (id TEXT PRIMARY KEY, source TEXT, captured_at TEXT, status INTEGER, parse_error INTEGER, item_count INTEGER, health TEXT); CREATE TABLE IF NOT EXISTS candidates (id TEXT PRIMARY KEY, source TEXT, raw_item TEXT, first_seen TEXT, last_seen TEXT, classification TEXT, state TEXT, baseline INTEGER);')
    inserted=0
    files=sorted(pathlib.Path(root).glob('baseline-*.json'))+sorted(pathlib.Path(root).glob('sample-*.json'))
    parsed=[]
    for path in files:
        raw=json.loads(path.read_text());feeds=json.loads(raw['content']) if isinstance(raw,dict) and 'content' in raw else raw
        for feed in feeds:parsed.append((feed['capturedAt'],path,feed))
    with db:
        for _,path,feed in sorted(parsed,key=lambda t:t[0]):
            source=feed['url'];at=feed['capturedAt'];status=feed['status'];items=feed.get('items',[])
            health='error' if status!=200 or feed.get('parseError') else ('empty_coverage_gap' if not items else 'metadata_available')
            sid=hashlib.sha256((source+'|'+at).encode()).hexdigest()
            db.execute('INSERT OR IGNORE INTO samples VALUES(?,?,?,?,?,?,?)',(sid,source,at,status,bool(feed.get('parseError')),len(items),health))
            if health!='metadata_available':continue
            for item in items:
                text=json.dumps(item,sort_keys=True,ensure_ascii=False)
                if not re.search(r'financial results|financial statements|quarterly results',text,re.I):continue
                # A metadata keyword is not proof a statement has been released.
                classification='meeting_or_future_notice' if re.search(r'board meeting|consider and approve|to consider|intimation of',text,re.I) else 'results_keyword_unverified'
                rid=hashlib.sha256((source+'|'+text).encode()).hexdigest()
                cur=db.execute('INSERT OR IGNORE INTO candidates VALUES(?,?,?,?,?,?,?,?)',(rid,source,text,at,at,classification,'metadata_review_needed',path.name.startswith('baseline-')))
                inserted+=cur.rowcount
                db.execute('UPDATE candidates SET first_seen=MIN(first_seen,?),last_seen=MAX(last_seen,?) WHERE id=?',(at,at,rid))
    result={'new_candidates':inserted,'total_candidates':db.execute('SELECT count(*) FROM candidates').fetchone()[0],'classifications':dict(db.execute('SELECT classification,count(*) FROM candidates GROUP BY classification')),'samples':db.execute('SELECT count(*) FROM samples').fetchone()[0],'empty_samples':db.execute("SELECT count(*) FROM samples WHERE health='empty_coverage_gap'").fetchone()[0],'public_publishing_enabled':False,'attachments_fetched':False}
    db.close();return result
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--root',required=True);p.add_argument('--db',required=True);a=p.parse_args();print(json.dumps(intake(a.root,a.db),indent=2))
