// SYNTHETIC TEST INPUT ONLY. No source content and no real company result.
import assert from 'node:assert/strict';
import { canPublishDiscovery, normalizeDiscovery, dedupeDiscovery } from '../src/lib/toolkit/results-discovery-contract.ts';
const item={id:'synthetic-test-1',source:'BSE',sourceUrl:'https://www.bseindia.com/',company:'Synthetic test company',sourceTimestampRaw:'ambiguous',timezoneVerified:false,firstSeenAt:'2026-10-29T04:13:00Z',state:'detected'};
assert.equal(canPublishDiscovery({publicUseSupported:false,productionTransportVerified:true,experimentalLabelPresent:true}),false);
assert.equal(canPublishDiscovery({publicUseSupported:true,productionTransportVerified:false,experimentalLabelPresent:true}),false);
assert.equal(canPublishDiscovery({publicUseSupported:true,productionTransportVerified:true,experimentalLabelPresent:true}),true);
assert.throws(()=>normalizeDiscovery({...item,sourceTimestampIso:'2026-10-29T04:00:00Z'}));
assert.throws(()=>normalizeDiscovery({...item,sourceUrl:'https://untrusted.invalid/'}));
assert.throws(()=>normalizeDiscovery({...item,firstSeenAt:'bad'}));
assert.equal(dedupeDiscovery([item,item]).length,1);
assert.equal(dedupeDiscovery([item,{...item,source:'NSE',sourceUrl:'https://www.nseindia.com/'}]).length,2);
console.log('8 synthetic discovery-contract checks passed. No live ingestion/publication.');
