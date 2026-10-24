#!/usr/bin/env python3
"""Resumable low-rate batch of Moneycontrol reported figures (runs in GitHub Actions).

Reads public/data/companies-index.json, appends one JSON line per company to
fin-state/financials.jsonl (restored from the Actions cache between runs), and stops
after a time budget. Same rate as the other site scripts (about 1 request/second).
Stops at once on HTTP 403/429 (no bypass). Copies figures exactly as reported; it does not calculate anything.
Usage: financials_batch.py BUDGET_SECONDS   |   financials_batch.py publish
"""
import json, os, sys, time
sys.path.insert(0, os.path.dirname(__file__))
import mc_scrape as m

STATE = "fin-state/financials.jsonl"
INDEX = "public/data/companies-index.json"


def load_done():
    done = {}
    if os.path.exists(STATE):
        for line in open(STATE):
            try:
                d = json.loads(line); done[d["scId"]] = d
            except Exception:
                pass
    return done


def batch(budget):
    comps = json.load(open(INDEX))
    os.makedirs("fin-state", exist_ok=True)
    done = load_done(); t0 = time.time(); n = 0
    with open(STATE, "a") as f:
        for c in comps:
            if c["i"] in done: continue
            if time.time() - t0 > budget: break
            try:
                d = m.financials(c["i"], c["c"])
            except SystemExit:
                print("BLOCKED (403/429) - stopping, no bypass"); sys.exit(2)
            except Exception as e:
                d = {"scId": c["i"], "company_slug": c["c"], "error": str(e)[:100]}
            f.write(json.dumps(d) + "\n"); f.flush(); n += 1
    total = len(done) + n
    print(f"batch {n}, total {total} of {len(comps)}")
    open("fin-state/progress.txt", "w").write(f"{total} {len(comps)}\n")


def publish():
    comps = json.load(open(INDEX)); done = load_done()
    if len(done) < len(comps):
        print("not complete"); return
    shards = {}
    for d in done.values():
        if d.get("error") or not d.get("pl_annual"): continue
        rec = {k: d.get(k) for k in ("pl_type", "pl_periods", "pl_annual", "ttm", "q_overview", "earnings_dates")}
        shards.setdefault(d["scId"][0].upper(), {})[d["scId"]] = rec
    os.makedirs("public/data/financials", exist_ok=True)
    for k, v in shards.items():
        json.dump(v, open(f"public/data/financials/{k}.json", "w"), separators=(",", ":"))
    print("published shards", len(shards), "companies with figures", sum(len(v) for v in shards.values()))


if __name__ == "__main__":
    publish() if sys.argv[1] == "publish" else batch(float(sys.argv[1]))
