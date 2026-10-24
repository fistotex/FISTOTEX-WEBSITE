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


MAX_ATTEMPTS = 3


def load_done():
    """A company counts as done only when the source returned a page we could read.
    Errors are retried (up to MAX_ATTEMPTS) and never silently marked done; after
    that they are kept as status 'unavailable' so the run can finish honestly."""
    done, attempts = {}, {}
    if os.path.exists(STATE):
        for line in open(STATE):
            try:
                d = json.loads(line)
            except Exception:
                continue
            sid = d["scId"]
            if d.get("error"):
                attempts[sid] = attempts.get(sid, 0) + 1
                if attempts[sid] >= MAX_ATTEMPTS:
                    done[sid] = d
            else:
                done[sid] = d
    return done


def batch(budget):
    comps = json.load(open(INDEX))
    os.makedirs("fin-state", exist_ok=True)
    if os.path.exists("fin-state/BLOCKED"):
        print("Previously blocked by the source (403/429). Not retrying until fin-state/BLOCKED is removed by a person.")
        sys.exit(0)
    done = load_done(); t0 = time.time(); n = 0
    pending, streak = [], 0
    with open(STATE, "a") as f:
        for c in comps:
            if c["i"] in done: continue
            if time.time() - t0 > budget: break
            try:
                d = m.financials(c["i"], c["c"])
            except SystemExit:
                open("fin-state/BLOCKED", "w").write(time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()) + " HTTP 403/429\n")
                print("BLOCKED (403/429) - stopping, no bypass"); sys.exit(0)
            except Exception as e:
                d = {"scId": c["i"], "company_slug": c["c"], "error": str(e)[:100]}
            if d.get("error"):
                streak += 1; pending.append(d)
                print("error:", c["i"], d["error"])
                if streak >= 8:
                    open("fin-state/BLOCKED", "w").write(time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()) + " 8 consecutive unreadable responses\n")
                    print("8 consecutive unreadable responses - treating as a block, stopping, not saving them as done")
                    break
                continue
            streak = 0
            for e_ in pending: f.write(json.dumps(e_) + "\n")
            pending = []
            f.write(json.dumps(d) + "\n"); f.flush(); n += 1
    done = load_done()
    total = len(done)
    print(f"batch {n}, total {total} of {len(comps)}")
    open("fin-state/progress.txt", "w").write(f"{total} {len(comps)}\n")


def publish():
    comps = json.load(open(INDEX)); done = load_done()
    shards = {}
    for d in done.values():
        if d.get("error") or not (d.get("pl_annual") or d.get("q_overview")): continue
        rec = {k: d.get(k) for k in ("pl_type", "pl_periods", "pl_annual", "ttm", "q_overview", "earnings_dates")}
        shards.setdefault(d["scId"][0].upper(), {})[d["scId"]] = rec
    os.makedirs("public/data/financials", exist_ok=True)
    for k, v in shards.items():
        json.dump(v, open(f"public/data/financials/{k}.json", "w"), separators=(",", ":"))
    json.dump({"collected": len(done), "total": len(comps), "complete": len(done) >= len(comps)},
              open("public/data/financials/progress.json", "w"))
    print("published shards", len(shards), "companies with figures", sum(len(v) for v in shards.values()))


if __name__ == "__main__":
    publish() if sys.argv[1] == "publish" else batch(float(sys.argv[1]))
