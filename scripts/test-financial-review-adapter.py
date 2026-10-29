"""Synthetic adapter, quarter and provenance regression checks. No network."""
import importlib.util,pathlib,tempfile,unittest
s=importlib.util.spec_from_file_location('a',pathlib.Path(__file__).with_name('financial-review-adapter.py'));a=importlib.util.module_from_spec(s);s.loader.exec_module(a)
s=importlib.util.spec_from_file_location('fixtures',pathlib.Path(__file__).with_name('test-financial-candidate.py'));f=importlib.util.module_from_spec(s);s.loader.exec_module(f)
class Tests(unittest.TestCase):
    def test_file_hash_and_repeat(self):
        with tempfile.TemporaryDirectory() as d:
            p=pathlib.Path(d)/'source.xml';p.write_text(f.fixture());args=(p,d+'/queue.sqlite','https://nsearchives.nseindia.com/','synthetic-1','TEST','2026-07-01','2026-09-30');r=a.ingest_file(*args);again=a.ingest_file(*args);self.assertEqual(r['id'],again['id']);self.assertEqual(r['provenance']['documentSha256'],a.hashlib.sha256(p.read_bytes()).hexdigest());self.assertEqual(len(r['provenance']['contextIds']),3);self.assertEqual(len(r['provenance']['factReferences']),15);self.assertEqual(r['state'],'review_needed');self.assertFalse(r['provenance']['sourceUseConfirmed'])
    def test_duplicate_context_id(self):
        x=f.fixture().replace('</x:xbrl>','<x:context id="q"/></x:xbrl>');self.assertIn('Duplicate XML IDs',a.extractor.extract(x,'TEST','2026-07-01','2026-09-30')['issues'])
    def test_calendar_quarter_required(self):
        r=a.extractor.extract(f.fixture(),'TEST','2026-07-02','2026-09-30');self.assertIn('Only calendar-aligned quarters supported',r['issues'])
    def test_missing_sequential_not_inferred(self):
        x=f.fixture().replace('2026-04-01','2026-01-01').replace('2026-06-30','2026-03-31');r=a.extractor.extract(x,'TEST','2026-07-01','2026-09-30');self.assertIsNone(r['figures']['revenue']['previous']);self.assertIn('Previous quarter absent or ambiguous; QoQ unavailable',r['issues'])
    def test_sequential_render(self):
        with tempfile.TemporaryDirectory() as d:
            q=a.queue.Queue(d+'/q.sqlite');c=a.extractor.extract(f.fixture(),'TEST','2026-07-01','2026-09-30');p={'sourceUrl':'https://www.bseindia.com/','filingId':'synthetic','documentSha256':'a'*64,'contextIds':['q','p','s'],'factReferences':['synthetic']};r=q.ingest(c,p);q.review(r,'Synthetic reviewer','Synthetic statement',{});self.assertIn('Previous quarter: 10.00 (0.00% QoQ)',q.render(r));q.db.close()
if __name__=='__main__':unittest.main()
