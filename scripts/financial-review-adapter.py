"""Offline local-file adapter: original bytes -> extraction -> durable review queue."""
import argparse,hashlib,importlib.util,json,pathlib

def load(name,filename):
    spec=importlib.util.spec_from_file_location(name,pathlib.Path(__file__).with_name(filename));module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);return module
extractor=load('extractor','extract-financial-candidate.py');queue=load('reviewqueue','results-review-queue.py')
def ingest_file(path,db,source_url,filing_id,entity,start,end):
    raw=pathlib.Path(path).read_bytes()
    if len(raw)>10_000_000:raise ValueError('Local XML exceeds10MB limit')
    # Decode declared XML using ElementTree semantics by supplying bytes.
    # Extractor expects unicode; reject unsupported encodings instead of guessing.
    text=raw.decode('utf-8-sig')
    candidate=extractor.extract(text,entity,start,end)
    provenance={'sourceUrl':source_url,'filingId':filing_id,'documentSha256':hashlib.sha256(raw).hexdigest(),'contextIds':[x['id'] for x in candidate.get('provenance',{}).get('contexts',[])],'factReferences':candidate.get('provenance',{}).get('facts',[]),'extractionVersion':'indas-offline-v2','sourceUseConfirmed':False,'transportValidated':False}
    q=queue.Queue(db)
    try:
        rid=q.ingest(candidate,provenance)
        return q.get(rid)
    finally:q.db.close()
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('xml');p.add_argument('--db',required=True);p.add_argument('--source-url',required=True);p.add_argument('--filing-id',required=True);p.add_argument('--entity',required=True);p.add_argument('--start',required=True);p.add_argument('--end',required=True);a=p.parse_args();print(json.dumps(ingest_file(a.xml,a.db,a.source_url,a.filing_id,a.entity,a.start,a.end),indent=2))
