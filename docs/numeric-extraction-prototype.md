# Numeric extraction prototype

Offline prototype only. No collector, background attachment fetch, production integration or publication.

Input: a locally supplied NSE Integrated Finance IndAS 2026-01-31 XBRL instance and explicit entity, start and end dates. Output: candidate revenue, total PAT, owners' PAT and basic EPS, with same-quarter prior-year comparisons only when present.

The extractor selects non-dimensional duration contexts and checks entity, period, reporting basis, currency and profit-attribution arithmetic. XBRL monetary values use their actual currency unit; display rounding labels are not multipliers. Unsupported/missing/duplicate/nil facts and inconsistent attribution route to review_needed. Revisions and replacement-file identity remain external review requirements.

Every output is publishable=false. A candidate is not a checked result: independent statement/schema verification, public-use support, production transport and publication gates remain required. Banks, insurers, non-IndAS and extension taxonomies are unsupported. This prototype is not a complete schema validator and must not be connected to public pages as an automatic publisher.

Run synthetic checks:

    python3 scripts/test-financial-candidate.py

Run privately on an authorized local document:

    python3 scripts/extract-financial-candidate.py input.xml --entity SECURITY_CODE --start YYYY-MM-DD --end YYYY-MM-DD

No real company fixtures or feed contents are included. No zero-latency, completeness or historical-backfill claim.
