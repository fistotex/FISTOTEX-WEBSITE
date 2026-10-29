"""Offline, fail-closed IndAS candidate extractor. No network or publication side effects."""
import argparse, datetime as dt, decimal, json, re, xml.etree.ElementTree as ET
D = decimal.Decimal
X = '{http://www.xbrl.org/2003/instance}'
T = '{http://www.sebi.gov.in/xbrl/2026-01-31/in-capmkt}'

def extract(xml, entity, start, end):
    issues=[]
    if '<!DOCTYPE' in xml.upper() or '<!ENTITY' in xml.upper():
        return {'status':'review_needed','issues':['DTD/entities not accepted'],'publishable':False}
    try:
        root=ET.fromstring(xml)
        if root.tag != X+'xbrl': raise ValueError('Not XBRL')
        start_d,end_d=dt.date.fromisoformat(start),dt.date.fromisoformat(end)
        if not 80 <= (end_d-start_d).days <= 100: raise ValueError('Quarter duration required')
        prior_start=start_d.replace(year=start_d.year-1).isoformat()
        prior_end=end_d.replace(year=end_d.year-1).isoformat()
        contexts={}
        for c in root.findall(X+'context'):
            ident=c.find('.//'+X+'identifier')
            if ident is None or ident.text!=entity: continue
            # Segment/scenario dimensions can change the meaning of the same tag.
            if c.find('.//'+X+'segment') is not None or c.find(X+'scenario') is not None: continue
            a=c.findtext(X+'period/'+X+'startDate');b=c.findtext(X+'period/'+X+'endDate')
            if a and b: contexts[c.attrib['id']]=(a,b)
        units={u.attrib['id']:u for u in root.findall(X+'unit')}
        def context(a,b):
            found=[k for k,v in contexts.items() if v==(a,b)]
            if len(found)!=1: raise ValueError('Missing or ambiguous context '+a+' / '+b)
            return found[0]
        current=context(start,end)
        try: prior=context(prior_start,prior_end)
        except ValueError: prior=None;issues.append('Prior-year quarter absent or ambiguous; YoY unavailable')
        def fact(name,cid,numeric=False,eps=False):
            found=[f for f in root.findall(T+name) if f.get('contextRef')==cid]
            if len(found)!=1 or found[0].get('{http://www.w3.org/2001/XMLSchema-instance}nil') in ('true','1'):
                raise ValueError('Missing/duplicate/nil '+name)
            f=found[0]; value=f.text or ''
            if not numeric:return value.strip()
            u=units.get(f.get('unitRef'))
            if u is None:raise ValueError('Missing unit '+name)
            if not eps:
                if u.findtext(X+'measure')!='iso4217:INR':raise ValueError('Unsupported currency/unit')
            else:
                if u.findtext(X+'divide/'+X+'unitNumerator/'+X+'measure')!='iso4217:INR' or u.findtext(X+'divide/'+X+'unitDenominator/'+X+'measure')!='xbrli:shares':raise ValueError('Unsupported EPS unit')
            n=D(value)
            if not n.is_finite():raise ValueError('Nonfinite number')
            # XBRL unitRef defines values. LevelOfRounding is display metadata, NOT a multiplier.
            return n
        company=fact('NameOfTheCompany',current)
        basis=fact('NatureOfReportStandaloneConsolidated',current)
        if basis not in ('Standalone','Consolidated'):raise ValueError('Unknown reporting basis')
        names={'revenue':'RevenueFromOperations','patTotal':'ProfitLossForPeriod','epsBasic':'BasicEarningsLossPerShareFromContinuingAndDiscontinuedOperations'}
        def period(cid):
            if fact('NatureOfReportStandaloneConsolidated',cid)!=basis:raise ValueError('Comparative basis mismatch')
            vals={k:fact(v,cid,True,k=='epsBasic') for k,v in names.items()}
            if basis=='Consolidated':
                owner=fact('ProfitOrLossAttributableToOwnersOfParent',cid,True)
                minority=fact('ProfitOrLossAttributableToNonControllingInterests',cid,True)
                if abs(owner+minority-vals['patTotal'])>D('1'):issues.append('Profit attribution does not reconcile in '+cid)
                vals['patOwners']=owner
            return vals
        cur=period(current);old=period(prior) if prior else None
        figures={}
        for k,v in cur.items():
            ov=old.get(k) if old else None
            yoy=None
            if ov is not None and ov>0:yoy=(v/ov-1)*100
            elif ov is not None:issues.append('YoY not meaningful with non-positive prior '+k)
            divisor=D(1) if k=='epsBasic' else D(10000000)
            figures[k]={'current':str(v/divisor),'prior':str(ov/divisor) if ov is not None else None,'unit':'INR/share' if k=='epsBasic' else 'INR crore','yoyPercent':str(yoy) if yoy is not None else None}
        return {'status':'review_needed' if issues else 'candidate_extracted','company':company,'entity':entity,'basis':basis,'start':start,'end':end,'figures':figures,'issues':issues,'publishable':False,'review':'Independent statement/schema/revision validation and source/transport/publication gates remain required'}
    except (ET.ParseError, ValueError, KeyError, decimal.InvalidOperation) as e:
        return {'status':'review_needed','issues':issues+[str(e)],'publishable':False}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('xml');p.add_argument('--entity',required=True);p.add_argument('--start',required=True);p.add_argument('--end',required=True);a=p.parse_args()
    with open(a.xml) as f:print(json.dumps(extract(f.read(),a.entity,a.start,a.end),indent=2))
