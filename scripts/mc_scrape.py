#!/usr/bin/env python3
"""Moneycontrol low-rate extraction for Fistotex (test/POC per user instruction 2026-10-24).
Usage: python3 mc_scrape.py [companies|calendar|financials] [args]
Low-rate: 1.1s between requests. Stops on 403/429/5xx streak. No bypass of blocks.
NOTE: extraction != republication rights (Moneycontrol ToU 4.3/4.4). Private artifact only.
"""
import requests, re, json, sys, time, csv, os

UA = {"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      "Accept":"text/html,application/json"}
API = "https://api.moneycontrol.com/mcapi/v1"
DELAY = 1.1
OUT = "/tmp/mc/out"
os.makedirs(OUT, exist_ok=True)
_last = [0.0]

def get(url, referer="https://www.moneycontrol.com/"):
    dt = time.time() - _last[0]
    if dt < DELAY: time.sleep(DELAY - dt)
    h = dict(UA); h["Referer"] = referer
    r = requests.get(url, headers=h, timeout=20)
    _last[0] = time.time()
    if r.status_code in (403, 429):
        print(f"BLOCKED {r.status_code} at {url} - stopping, no bypass", file=sys.stderr); sys.exit(2)
    return r

def next_data(html):
    m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S)
    return json.loads(m.group(1)) if m else None

def companies():
    pat = re.compile(r'href="https://www\.moneycontrol\.com/india/stockpricequote/([a-z0-9-]+)/([a-z0-9-]+)/([A-Z0-9]+)"')
    rows, seen = [], set()
    for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        r = get(f"https://www.moneycontrol.com/india/stockpricequote/{letter}")
        n0 = len(seen)
        for sec, slug, scid in pat.findall(r.text):
            if scid not in seen:
                seen.add(scid); rows.append({"scId": scid, "sector_slug": sec, "company_slug": slug,
                    "url": f"https://www.moneycontrol.com/india/stockpricequote/{sec}/{slug}/{scid}"})
        print(f"{letter}: +{len(seen)-n0} (total {len(seen)})")
    with open(f"{OUT}/companies.json","w") as f: json.dump(rows, f, indent=1)
    with open(f"{OUT}/companies.csv","w",newline="") as f:
        w = csv.DictWriter(f, fieldnames=["scId","sector_slug","company_slug","url"]); w.writeheader(); w.writerows(rows)
    print(f"TOTAL {len(rows)} companies -> {OUT}/companies.json/.csv")

def calendar(start="2026-10-24", end="2026-11-07"):
    r = get(f"{API}/earnings/result-calendar?indexId=All&fromDate={start}&toDate={end}&sector=",
            referer="https://www.moneycontrol.com/markets/earnings/results-calendar/")
    strip = r.json()["data"]["list"]  # [[display, count, date], ...]
    all_rows = []
    for disp, count, date in strip:
        if not str(count).isdigit() or int(count) == 0: continue
        page = 1
        while True:
            u = f"{API}/earnings/get-earnings-data?indexId=All&page={page}&startDate={date}&endDate={date}&sector=&limit=50"
            d = get(u, referer="https://www.moneycontrol.com/markets/earnings/results-calendar/").json()
            lst = (d.get("data") or {}).get("list") or []
            all_rows.extend(lst)
            if len(lst) < 50 or page >= 20: break
            page += 1
        print(f"{date}: {len([x for x in all_rows if x.get('date')==disp])} rows (strip said {count})")
    with open(f"{OUT}/upcoming_results.json","w") as f: json.dump(all_rows, f, indent=1)
    print(f"TOTAL {len(all_rows)} upcoming-result rows -> {OUT}/upcoming_results.json")

def financials(scid, slug):
    """Annual consolidated summary P&L + quarterly headline for one company."""
    out = {"scId": scid, "company_slug": slug}
    r = get(f"https://www.moneycontrol.com/financials/{slug}/profit-lossVI/{scid}")
    nd = next_data(r.text)
    if not nd: out["error"] = f"pl status {r.status_code}"; return out
    data = nd["props"]["pageProps"]["data"]
    perf = data.get("performance") or {}
    out["pl_type"] = perf.get("type"); out["pl_periods"] = perf.get("header")
    items = (perf.get("list") or [{}])[0].get("l1_list") or []
    out["pl_annual"] = {it["l2_heading"]: [v.get("value") for v in it.get("l2_list",[])] for it in items}
    stats = (data.get("stockOtherInfo") or {}).get("statistics") or {}
    out["ttm"] = {k: stats.get(k) for k in ("ttmEps","ttmPe","bvps","pb","divYeild","marketCap","faceValue","industryPE","52WeekHigh","52WeekLow")}
    r2 = get(f"https://www.moneycontrol.com/markets/financials/quarterly-results/{slug}-{scid}/")
    nd2 = next_data(r2.text)
    if nd2:
        p2 = (nd2["props"]["pageProps"].get("data") or {}).get("performance") or {}
        out["q_overview"] = p2.get("overview"); out["earnings_dates"] = p2.get("earningsDates")
    return out

if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "companies": companies()
    elif cmd == "calendar": calendar(*(sys.argv[2:4] or []))
    elif cmd == "financials":
        pairs = json.load(open(sys.argv[2]))  # [[scId, slug], ...]
        res = []
        for scid, slug in pairs:
            d = financials(scid, slug); res.append(d)
            print(f"{scid}: periods={d.get('pl_periods')} q={'q_overview' in d}")
        with open(f"{OUT}/financials_sample.json","w") as f: json.dump(res, f, indent=1)
        print(f"-> {OUT}/financials_sample.json ({len(res)} companies)")
