"""SYNTHETIC only. Test offline durability, dedup, revision invalidation and rendering."""
import copy,importlib.util,pathlib,tempfile,unittest
s=importlib.util.spec_from_file_location('queue',pathlib.Path(__file__).with_name('results-review-queue.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def data():
    f=lambda v,u:{'current':v,'prior':v,'yoyPercent':'0','unit':u}
    c={'company':'Synthetic <company>','entity':'TEST','basis':'Consolidated','start':'2026-07-01','end':'2026-09-30','issues':[],'figures':{'revenue':f('10','INR crore'),'patTotal':f('1','INR crore'),'patOwners':f('1','INR crore'),'epsBasic':f('2','INR/share')}}
    p={'sourceUrl':'https://www.bseindia.com/','documentSha256':'a'*64,'contextIds':['synthetic-current','synthetic-prior'],'factReferences':['synthetic:RevenueFromOperations'],'filingId':'synthetic-1'}
    return c,p
class Tests(unittest.TestCase):
    def setUp(self):self.tmp=tempfile.TemporaryDirectory();self.path=self.tmp.name+'/queue.sqlite';self.q=m.Queue(self.path)
    def tearDown(self):self.q.db.close();self.tmp.cleanup()
    def test_idempotent_and_durable(self):
        c,p=data();a=self.q.ingest(c,p);b=self.q.ingest(c,p);self.assertEqual(a,b);self.assertEqual(self.q.db.execute('select count(*) from records').fetchone()[0],1);other=m.Queue(self.path);self.assertEqual(other.get(a)['state'],'review_needed');other.db.close()
    def test_no_unreviewed_render(self):
        c,p=data();rid=self.q.ingest(c,p)
        with self.assertRaises(ValueError):self.q.render(rid)
    def test_review_and_escape(self):
        c,p=data();rid=self.q.ingest(c,p);self.q.review(rid,'Synthetic reviewer','Synthetic statement visual check',{});s=self.q.render(rid);self.assertIn('&lt;company&gt;',s);self.assertIn('10.00 INR crore',s);self.assertIn('Not published or automatic',s)
    def test_unresolved_rejected(self):
        c,p=data();c['issues']=['missing prior'];rid=self.q.ingest(c,p)
        with self.assertRaises(ValueError):self.q.review(rid,'Reviewer','Evidence',{})
    def test_revision_invalidates(self):
        c,p=data();rid=self.q.ingest(c,p);self.q.review(rid,'Reviewer','Evidence',{});p['documentSha256']='b'*64;new=self.q.ingest(c,p);self.assertNotEqual(rid,new);self.assertEqual(self.q.get(rid)['state'],'review_invalidated')
        with self.assertRaises(ValueError):self.q.render(rid)
    def test_bad_source_flagged(self):
        c,p=data();p['sourceUrl']='https://bad.invalid/';rid=self.q.ingest(c,p);self.assertIn('Unsupported source URL',self.q.get(rid)['issues'])
    def test_missing_provenance_flagged(self):
        c,p=data();p['contextIds']=[];rid=self.q.ingest(c,p);self.assertIn('Missing context/fact provenance',self.q.get(rid)['issues'])
    def test_payload_copy(self):
        c,p=data();rid=self.q.ingest(c,p);c['company']='Changed';self.assertNotEqual(self.q.get(rid)['candidate']['company'],'Changed')
    def test_bad_unit(self):
        c,p=data();c['figures']['revenue']['unit']='USD';rid=self.q.ingest(c,p);self.assertIn('Wrong unit revenue',self.q.get(rid)['issues'])
    def test_review_evidence_required(self):
        c,p=data();rid=self.q.ingest(c,p)
        with self.assertRaises(ValueError):self.q.review(rid,'','',{})
    def test_structural_override_denied(self):
        c,p=data();p['sourceUrl']='https://bad.invalid/';rid=self.q.ingest(c,p)
        with self.assertRaises(ValueError):self.q.review(rid,'Reviewer','Evidence',{i:'Checked' for i in self.q.get(rid)['issues']})
    def test_provenance_change_not_duplicate(self):
        c,p=data();a=self.q.ingest(c,p);p['contextIds']=['changed'];b=self.q.ingest(c,p);self.assertNotEqual(a,b)
if __name__=='__main__':unittest.main()
