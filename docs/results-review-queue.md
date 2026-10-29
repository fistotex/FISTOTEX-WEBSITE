# Offline numeric review queue checkpoint

This prototype has no collector, scheduler, production import or publication command. Main-site code is unchanged. Use synthetic fixtures only in the public repository. Private SQLite databases, source statements and review notes must stay outside the repository.

## Contract

`scripts/results-review-queue.py` exposes `Queue(path).ingest(candidate, provenance)`, `get(id)`, `review(id, reviewer, statement_evidence, resolutions)`, and `render(id)`.

Candidate input matches `extract-financial-candidate.py`: company/entity, reporting basis, explicit quarter start/end, revenue, total PAT, owners PAT for consolidated accounts, basic EPS, current/prior numbers, units and extraction issues. Provenance requires an official HTTPS source, source document SHA256, filing ID, context IDs and fact references. These identifiers must come from actually inspected source evidence, not invented placeholders. Tests use explicit synthetic placeholders.

SQLite stores immutable JSON candidate/provenance payloads, content hashes, company-period-basis series keys, review status, flags, reviewer evidence and append-only application audit events. Identical payloads deduplicate across reopen. Different source evidence for the same series creates a separate record and invalidates any previous reviewed preview. Conflicting versions remain visible and require reconciliation evidence; nothing is silently overwritten.

Every new candidate is `review_needed`, including clean parses. Review requires a named reviewer and independent statement evidence. Each extraction/revision flag needs an explicit resolution note. Invalid structural fields or source provenance cannot be bypassed with review notes: correct and reingest instead. This is a local trusted-review prototype, not an authenticated multiuser approval service or tamper-proof audit system.

The renderer emits escaped, source-linked revenue/owners-PAT/EPS HTML only for reviewed, unchanged payloads. Missing comparisons say unavailable. A revised source disables rendering the older approved record. Output is labelled OFFLINE REVIEWED PREVIEW and is never written into the production results dataset. The renderer includes previous-quarter values and QoQ when explicitly present. Stronger semantic fact reconciliation and a production publisher are not part of this checkpoint.

## Checks

`python3 scripts/test-results-review-queue.py` runs 12 synthetic tests: durable/idempotent ingest, review gating, escaping/numeric output, unresolved flags, revision invalidation, bad source, missing provenance, payload copy, units, missing reviewer evidence, structural override rejection and changed provenance dedup. Existing extractor tests are separate.

## Remaining gates

- Supported production source access/transport and permitted source use, including attachment processing and public factual summaries.
- Full schema-aware extraction, attribution/comparison arithmetic verification, representative quarter/restatement/taxonomy tests, financial-sector exclusions and source version reconciliation against actual statements.
- A reviewed candidate adapter with real context/fact provenance, authenticated review UI, secure storage/retention/backup policy and source change tracking.
- Review-approved publication integration and visual verification; production stays disabled until separately grounded readiness. No unattended-publication claim follows from passing synthetic tests.


## Provenance adapter and metadata intake continuation

`financial-review-adapter.py` reads an explicitly supplied local UTF-8 XML file, hashes exact bytes and puts extracted values plus actual fact/context/unit IDs and raw values into the private queue. No download is performed. Namespace-scoped unit QName resolution, duplicate XML-ID rejection and calendar-quarter bounds are enforced. Previous-quarter and prior-year values are used only from exact matching nondimensional contexts. Missing comparisons remain unavailable. This is still a narrow IndAS taxonomy parser, not full XSD/schema validation.

`results-discovery-intake.py` is a separate metadata-only intake for the existing private RSS pilot's saved files. It stores source sample health, raw full-item content/version hashes and first/last seen times. Exact repeats deduplicate; changed content remains a separate version, not a proven new filing. Keyword candidates are always unverified, and meeting/future notices are flagged separately. Empty-but-valid RSS is a coverage gap and never deletes prior records. No attachments are fetched, no numbers are inferred, and this intake cannot produce public cards. Its local private database is outside the repository. This private queue is not fulfillment of the requested public numeric automation.

Tests: extractor13, queue12, adapter5. A real locally retained statement was checked privately through the adapter and remained review-needed due to missing comparisons and conflicting profit attribution. Private statement/database/output are not included here. Production source-use and transport flags remain false in the adapter regardless of extraction success.
