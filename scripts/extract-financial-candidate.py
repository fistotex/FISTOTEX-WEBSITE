"""Offline, fail-closed IndAS candidate extractor. No network or publication side effects."""
import argparse, datetime as dt, decimal, io, json, re, xml.etree.ElementTree as ET
D = decimal.Decimal
X = '{http://www.xbrl.org/2003/instance}'
T = '{http://www.sebi.gov.in/xbrl/2026-01-31/in-capmkt}'

def extract(xml, entity, start, end):
    issues=[]
    if '<!DOCTYPE' in xml.upper() or '<!ENTITY' in xml.upper():
        return {'status':'review_needed','issues':['DTD/entities not accepted'],'publishable':False}
    try:
        # Resolve QName values in the namespace scope of each actual element.
        scopes={};stack=[];pending={};root=None
        for event,node in ET.iterparse(io.StringIO(xml),events=('start-ns','start','end')):
            if event=='start-ns':pending[node[0]]=node[1]
            elif event=='start':
                scope=dict(stack[-1]) if stack else {};scope.update(pending);pending={};stack.append(scope);scopes[id(node)]=scope
                if len(stack)==1:root=node
            else:stack.pop()
        def qname(el):
            text=(el.text or '').strip() if el is not None else ''
            if ':' not in text:raise ValueError('Unqualified unit QName')
            prefix,name=text.split(':',1);uri=scopes[id(el)].get(prefix)
            if not uri:raise ValueError('Undeclared unit QName prefix')
            return '{'+uri+'}'+name
        fact_refs=[]
        context_refs=[]
        if root is None or root.tag != X+'xbrl': raise ValueError('Not XBRL')
        start_d,end_d=dt.date.fromisoformat(start),dt.date.fromisoformat(end)
        if not 80 <= (end_d-start_d).days <= 100: raise ValueError('Quarter duration required')
        if start_d.day!=1 or start_d.month not in (1,4,7,10):raise ValueError('Only calendar-aligned quarters supported')
        next_month=start_d.month+3;next_year=start_d.year
        if next_month>12:next_month-=12;next_year+=1
        if end_d!=dt.date(next_year,next_month,1)-dt.timedelta(days=1):raise ValueError('Invalid calendar quarter end')
        prior_start=start_d.replace(year=start_d.year-1).isoformat()
        prior_end=end_d.replace(year=end_d.year-1).isoformat()
        ids=[n.get('id') for n in root.iter() if n.get('id')]
        if len(ids)!=len(set(ids)):raise ValueError('Duplicate XML IDs')
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
        previous_end=start_d-dt.timedelta(days=1)
        # Previous quarter starts two months before its final month.
        month=previous_end.month-2;year=previous_end.year
        if month<=0:month+=12;year-=1
        previous_start=dt.date(year,month,1)
        try:previous=context(previous_start.isoformat(),previous_end.isoformat())
        except ValueError:previous=None;issues.append('Previous quarter absent or ambiguous; QoQ unavailable')
        context_refs.append({'id':current,'start':start,'end':end})
        if previous:context_refs.append({'id':previous,'start':previous_start.isoformat(),'end':previous_end.isoformat()})
        try: prior=context(prior_start,prior_end)
        except ValueError: prior=None;issues.append('Prior-year quarter absent or ambiguous; YoY unavailable')
        if prior:context_refs.append({'id':prior,'start':prior_start,'end':prior_end})
        def fact(name,cid,numeric=False,eps=False):
            found=[f for f in root.findall(T+name) if f.get('contextRef')==cid]
            if len(found)!=1 or found[0].get('{http://www.w3.org/2001/XMLSchema-instance}nil') in ('true','1'):
                raise ValueError('Missing/duplicate/nil '+name)
            f=found[0]; value=f.text or ''
            if not numeric:return value.strip()
            unit_name=f.get('unitRef')
            u=units.get(f.get('unitRef'))
            if u is None:raise ValueError('Missing unit '+name)
            if not eps:
                if qname(u.find(X+'measure'))!='{http://www.xbrl.org/2003/iso4217}INR':raise ValueError('Unsupported currency/unit')
            else:
                if qname(u.find(X+'divide/'+X+'unitNumerator/'+X+'measure'))!='{http://www.xbrl.org/2003/iso4217}INR' or qname(u.find(X+'divide/'+X+'unitDenominator/'+X+'measure'))!='{http://www.xbrl.org/2003/instance}shares':raise ValueError('Unsupported EPS unit')
            n=D(value)
            if not n.is_finite():raise ValueError('Nonfinite number')
            # XBRL unitRef defines values. LevelOfRounding is display metadata, NOT a multiplier.
            fact_refs.append({'tag':T+name,'contextId':cid,'unitId':unit_name,'rawValue':value,'decimals':f.get('decimals'),'factId':f.get('id')})
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
        cur=period(current);old=period(prior) if prior else None;prev=period(previous) if previous else None
        figures={}
        for k,v in cur.items():
            ov=old.get(k) if old else None
            yoy=None
            if ov is not None and ov>0:yoy=(v/ov-1)*100
            elif ov is not None:issues.append('YoY not meaningful with non-positive prior '+k)
            pv=prev.get(k) if prev else None
            qoq=None
            if pv is not None and pv>0:qoq=(v/pv-1)*100
            elif pv is not None:issues.append('QoQ not meaningful with non-positive previous '+k)
            divisor=D(1) if k=='epsBasic' else D(10000000)
            figures[k]={'current':str(v/divisor),'prior':str(ov/divisor) if ov is not None else None,'unit':'INR/share' if k=='epsBasic' else 'INR crore','yoyPercent':str(yoy) if yoy is not None else None,'previous':str(pv/divisor) if pv is not None else None,'qoqPercent':str(qoq) if qoq is not None else None}
        return {'status':'review_needed' if issues else 'candidate_extracted','company':company,'entity':entity,'basis':basis,'start':start,'end':end,'figures':figures,'issues':issues,'publishable':False,'provenance':{'contexts':context_refs,'facts':fact_refs,'taxonomyNamespace':T[1:-1]},'review':'Independent statement/schema/revision validation and source/transport/publication gates remain required'}
    except (ET.ParseError, ValueError, KeyError, decimal.InvalidOperation) as e:
        return {'status':'review_needed','issues':issues+[str(e)],'publishable':False}

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('xml');p.add_argument('--entity',required=True);p.add_argument('--start',required=True);p.add_argument('--end',required=True);a=p.parse_args()
    with open(a.xml) as f:print(json.dumps(extract(f.read(),a.entity,a.start,a.end),indent=2))
