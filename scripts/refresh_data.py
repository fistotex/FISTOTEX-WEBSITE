#!/usr/bin/env python3
"""Refresh Fistotex's public data files from Moneycontrol (runs in GitHub Actions).

Modes:
  python3 scripts/refresh_data.py calendar   -> src/data/upcoming-results.json (daily)
  python3 scripts/refresh_data.py directory  -> public/data/companies-index.json (weekly)

Low-rate on purpose (about one request/second). If Moneycontrol blocks or errors,
the script exits non-zero and the workflow stops instead of writing partial data.
What this does NOT do: bypass blocks, log in, or restate figures - it copies
dates/names/labels only; figures always stay with the source.
"""
import json
import re
import sys
import time

import requests

UA = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    "Accept": "text/html,application/json",
}
API = "https://api.moneycontrol.com/mcapi/v1"
DELAY = 1.1
_last = [0.0]


def get(url, referer="https://www.moneycontrol.com/"):
    dt = time.time() - _last[0]
    if dt < DELAY:
        time.sleep(DELAY - dt)
    headers = dict(UA, Referer=referer)
    r = requests.get(url, headers=headers, timeout=25)
    _last[0] = time.time()
    if r.status_code != 200:
        raise SystemExit(f"aborting: HTTP {r.status_code} for {url}")
    return r


def calendar():
    """Upcoming results for roughly the next two and a half weeks."""
    from datetime import date, timedelta

    today = date.today()
    strip = []
    for span in range(0, 18, 9):
        a = today + timedelta(days=span)
        b = today + timedelta(days=span + 8)
        d = get(
            f"{API}/earnings/result-calendar?indexId=All&fromDate={a}&toDate={b}&sector=",
            referer="https://www.moneycontrol.com/markets/earnings/results-calendar/",
        ).json()
        strip += d["data"]["list"]

    rows, seen = [], set()
    for _disp, count, day in strip:
        if not str(count).isdigit() or int(count) == 0:
            continue
        page = 1
        while True:
            url = (
                f"{API}/earnings/get-earnings-data?indexId=All&page={page}"
                f"&startDate={day}&endDate={day}&sector=&limit=50"
            )
            lst = (get(url, referer="https://www.moneycontrol.com/markets/earnings/results-calendar/")
                   .json().get("data") or {}).get("list") or []
            if not lst and page == 1:  # one retry for transient empties
                lst = (get(url, referer="https://www.moneycontrol.com/markets/earnings/results-calendar/")
                       .json().get("data") or {}).get("list") or []
            for x in lst:
                key = (x.get("scId"), x.get("date"), x.get("resultType"))
                if key not in seen:
                    seen.add(key)
                    rows.append(x)
            if len(lst) < 50 or page >= 30:
                break
            page += 1
    if not rows:
        raise SystemExit("aborting: calendar came back empty, keeping old file")
    with open("src/data/upcoming-results.json", "w") as f:
        json.dump(rows, f, indent=1)
    print(f"calendar: {len(rows)} rows written")


def directory():
    """Full A-Z company directory with display names."""
    pat = re.compile(
        r'href="https://www\.moneycontrol\.com/india/stockpricequote/'
        r'([a-z0-9-]+)/([a-z0-9]+)/([A-Z0-9]+)"[^>]*>([^<]+)<'
    )
    rows, seen = [], set()
    for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        r = get(f"https://www.moneycontrol.com/india/stockpricequote/{letter}")
        for sec, slug, scid, name in pat.findall(r.text):
            if scid not in seen:
                seen.add(scid)
                rows.append({"n": name.strip(), "i": scid, "s": sec, "c": slug})
    if len(rows) < 5000:
        raise SystemExit(f"aborting: only {len(rows)} companies found, keeping old file")
    with open("public/data/companies-index.json", "w") as f:
        json.dump(rows, f, separators=(",", ":"))
    print(f"directory: {len(rows)} companies written")


if __name__ == "__main__":
    {"calendar": calendar, "directory": directory}[sys.argv[1]]()
