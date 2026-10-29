"""SYNTHETIC fixtures only. No company data, network, collector, or publication."""
import importlib.util, pathlib, unittest
s=importlib.util.spec_from_file_location('extractor',pathlib.Path(__file__).with_name('extract-financial-candidate.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m)

def fixture(prior=True,owner='9000000',basis='Consolidated'):
    periods=[('q','2026-07-01','2026-09-30')]+([('p','2025-07-01','2025-09-30')] if prior else [])
    contexts=''.join(f'<x:context id="{k}"><x:entity><x:identifier scheme="synthetic">TEST</x:identifier></x:entity><x:period><x:startDate>{a}</x:startDate><x:endDate>{b}</x:endDate></x:period></x:context>' for k,a,b in periods)
    facts=''
    for k,_,_ in periods:
        for n,v in {'NameOfTheCompany':'Synthetic test company','NatureOfReportStandaloneConsolidated':basis,'LevelOfRounding':'Lakhs'}.items():facts+=f'<t:{n} contextRef="{k}">{v}</t:{n}>'
        for n,v in {'RevenueFromOperations':'100000000','ProfitLossForPeriod':'10000000','ProfitOrLossAttributableToOwnersOfParent':owner,'ProfitOrLossAttributableToNonControllingInterests':'1000000','BasicEarningsLossPerShareFromContinuingAndDiscontinuedOperations':'2'}.items():facts+=f'<t:{n} contextRef="{k}" unitRef="{("EPS" if n.startswith("Basic") else "INR")}">{v}</t:{n}>'
    return f'<x:xbrl xmlns:x="http://www.xbrl.org/2003/instance" xmlns:t="http://www.sebi.gov.in/xbrl/2026-01-31/in-capmkt">{contexts}<x:unit id="INR"><x:measure>iso4217:INR</x:measure></x:unit><x:unit id="EPS"><x:divide><x:unitNumerator><x:measure>iso4217:INR</x:measure></x:unitNumerator><x:unitDenominator><x:measure>xbrli:shares</x:measure></x:unitDenominator></x:divide></x:unit>{facts}</x:xbrl>'
class Tests(unittest.TestCase):
    def run_extract(self,x):return m.extract(x,'TEST','2026-07-01','2026-09-30')
    def test_candidate_not_publication(self):
        r=self.run_extract(fixture());self.assertEqual(r['status'],'candidate_extracted');self.assertFalse(r['publishable']);self.assertEqual(r['figures']['revenue']['current'],'10')
    def test_missing_prior(self):self.assertEqual(self.run_extract(fixture(False))['status'],'review_needed')
    def test_attribution_zero(self):self.assertEqual(self.run_extract(fixture(owner='0'))['status'],'review_needed')
    def test_unsupported_basis(self):self.assertEqual(self.run_extract(fixture(basis='unknown'))['status'],'review_needed')
    def test_foreign_currency(self):self.assertEqual(self.run_extract(fixture().replace('iso4217:INR','iso4217:USD'))['status'],'review_needed')
    def test_wrong_entity(self):self.assertEqual(self.run_extract(fixture().replace('>TEST<','>OTHER<'))['status'],'review_needed')
    def test_dtd(self):self.assertEqual(self.run_extract('<!DOCTYPE x>'+fixture())['status'],'review_needed')
    def test_h1_not_quarter(self):self.assertEqual(m.extract(fixture(),'TEST','2026-04-01','2026-09-30')['status'],'review_needed')
    def test_duplicate_fact(self):self.assertEqual(self.run_extract(fixture().replace('</x:xbrl>','<t:RevenueFromOperations contextRef="q" unitRef="INR">1</t:RevenueFromOperations></x:xbrl>'))['status'],'review_needed')
if __name__=='__main__':unittest.main()
