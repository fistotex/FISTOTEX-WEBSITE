# Experimental results discovery

Status: preparation only. No live ingestion or page integration.

## Version baseline
Production baseline: 5a1f7d4e500aa93da5552d787f4edf7847c7f441.
Existing results-data change: 15122357ba9e7a206c5d4b9fd39077d31f7ee9b1.
Existing results source wording: 3e14ba86a435cc8048ec8a662dd6a80868f4ecce.
Feature branch: feat/results-feed-experimental.

## Publication gates
- Appropriate public-use and collection rights.
- Verified production transport without access-control evasion.
- Explicit experimental label, with source date, first-seen time and verification status separate.
- No unverified extracted figures in the public discovery layer.

## Contract
The metadata contract validates source host, identity and dates. It refuses normalized source times when timezone has not been verified. Exact source IDs can be deduplicated; cross-exchange records require separate identity validation. It is not an ingestion adapter and makes no completeness or latency claim.

Run synthetic checks with:

    node --experimental-strip-types scripts/test-results-discovery.mjs

The test company and IDs are synthetic. They are not live results.

## Rollback
Keep adapter, presentation and verified-data changes in separate commits. Revert only feature commits in reverse dependency order. Do not reset main or restore whole historical files, which could undo unrelated blog or results work. This branch does not change public pages, existing figures or production configuration.
