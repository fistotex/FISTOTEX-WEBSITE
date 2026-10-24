"""Reported statements from Moneycontrol, copied as labelled (no calculations stored).

collect(scid, slug) -> one record per company:
  annual   {Consolidated|Standalone: {periods, rows{label: [values]}}}  (statement API, source labels)
  quarterly {basis, periods, rows{label: [values]}}                      (quarterly results feed)
  unit     per-company evidence that the figures are in Rs. crore
Units are marked verified only from same-company evidence:
  quarterly: an earnings article by Moneycontrol for this company whose table is headed
             "<basis> Quarterly Results ... in Rs. Cr." and whose Net Sales figures equal this
             feed's figures for the same periods.
  annual:    for a basis whose quarterly figures are verified, the four quarters of the latest
             financial year add up to that year's reported revenue line (a check only; the sum is not shown).
Anything not verified stays withheld on the site.
"""
import re, json
import mc_scrape as m

ANN_KEEP = ["Total Operating Revenues", "Revenue From Operations [Net]", "Revenue From Operations [Gross]", "Other Income",
            "Total Revenue", "Total Expenses", "Profit/Loss Before Tax", "Total Tax Expenses",
            "Profit/Loss For The Period", "Consolidated Profit/Loss After MI And Associates", "Basic EPS (Rs.)", "Diluted EPS (Rs.)",
            "Interest Earned", "Interest Expended", "Net Profit/Loss For The Year"]
Q_KEEP = ["Net Sales/Income from operations", "Total Income From Operations", "Other Income", "Interest", "P/L Before Tax", "Tax",
          "Net Profit/(Loss) For the Period", "Net P/L After M.I & Associates", "Basic EPS", "Diluted EPS",
          "Interest Earned", "Total Income", "Net Profit/(Loss)"]
HL = re.compile(r"^(.*?) (Standalone|Consolidated) (\w+) (\d{4}) Net Sales at Rs ([\d,\.]+) crore")


def num(x):
    try: return float(str(x).replace(",", ""))
    except Exception: return None


def jget(url):
    r = m.get(url, referer="https://www.moneycontrol.com/")
    if r.status_code != 200: raise ValueError(f"status {r.status_code}")
    try: return r.json()
    except Exception: raise ValueError("unreadable json")


def annual_block(data, res_key, hdr_key):
    res = data.get(res_key) or []
    hdr = data.get(hdr_key) or {}
    if not res: return None
    rows = {}
    for label, v in hdr.items():
        key = v[0] if isinstance(v, list) and v else None
        if not key or label.strip() not in ANN_KEEP: continue
        vals = [e.get(key) for e in res[:5]]
        if any(x not in (None, "") for x in vals): rows[label.strip()] = vals
    return {"periods": [e.get("yrc0") for e in res[:5]], "months": [e.get("noofmonths") for e in res[:5]], "rows": rows}


def quarterly_block(feed, basis):
    if not feed: return None
    rows = {}
    for label in Q_KEEP:
        vals = [e.get(label) for e in feed[:8]]
        if any(v not in (None, "", "--") for v in vals): rows[label] = vals
    return {"basis": basis, "periods": [e.get("yrc0") for e in feed[:8]], "rows": rows}


def parse_article(a):
    h = a.get("headline", "")
    mm = HL.match(h)
    if not mm: return None
    body = (a.get("body") or "").replace("\r", "")
    lab = re.search(r"(Standalone|Consolidated) Quarterly Results\s*\n\s*(in [^\n]+)", body)
    per = re.search(r"in Rs\. Cr\.\s*\n+((?:[A-Z][a-z]{2}'\d\d\s*\n+){1,3})", body)
    ns = re.search(r"Net Sales/Income from operations\s*\n((?:[-\d,\.]+\s*\n+){1,3})", body)
    if not (lab and per and ns): return None
    periods = per.group(1).split()
    lines = [x.strip() for x in body[body.index(per.group(0)) + len(per.group(0)):].split("\n") if x.strip()]
    rows, i = {}, 0
    while i < len(lines):
        if re.fullmatch(r"-?[\d,\.]+|--", lines[i]): i += 1; continue
        label = lines[i].replace("&amp;amp;", "&").replace("&amp;", "&"); vals = []; j = i + 1
        while j < len(lines) and len(vals) < len(periods) and re.fullmatch(r"-?[\d,\.]+|--", lines[j]): vals.append(lines[j]); j += 1
        if len(vals) == len(periods): rows[label] = vals
        i = j if vals else i + 1
    return {"basis": mm.group(2), "unit_label": lab.group(2).strip() if lab.group(1) == mm.group(2) else None,
            "periods": periods, "netsales": ns.group(1).split(), "rows": rows, "headline": h}


def quarterly_unit_check(q, arts):
    """Return evidence dict if an article for the same basis matches feed figures for the same periods."""
    if not q: return None
    feed_ns = q["rows"].get("Net Sales/Income from operations")
    if not feed_ns: return None
    fmap = {p.replace(" ", "").replace("'", "'"): v for p, v in zip(q["periods"], feed_ns)}
    for a in arts:
        if a["basis"] != q["basis"] or a["unit_label"] != "in Rs. Cr.": continue
        pairs = [(p, v) for p, v in zip(a["periods"], a["netsales"]) if p in fmap and num(v) is not None and num(fmap[p]) is not None]
        if not (pairs and all(abs(num(v) - num(fmap[p])) < 0.005 for p, v in pairs)): continue
        # other rows of the same table must agree too (same company, basis, periods)
        other_ok = other_n = 0
        for label, avals in (a.get("rows") or {}).items():
            if label == "Net Sales/Income from operations" or label not in q["rows"]: continue
            fv = {p.replace(" ", ""): v for p, v in zip(q["periods"], q["rows"][label])}
            for p, v in zip(a["periods"], avals):
                if p in fv and num(v) is not None and num(fv[p]) is not None:
                    other_n += 1; other_ok += abs(num(v) - num(fv[p])) < 0.005
        if other_n >= 2 and other_ok == other_n:
            return {"article": a["headline"], "label": "in Rs. Cr.", "periods_matched": [p for p, _ in pairs], "rows_matched": other_n + len(pairs)}
    return None


def annual_sum_check(q, ann):
    """Four quarters of the latest annual year equal the annual revenue line (verification only)."""
    if not (q and ann and ann.get("periods")): return False
    last = ann["periods"][0]
    if not last or " " not in last: return False
    mon, yy = last.split()
    key = f"{mon} '{yy}"
    qp = q["periods"]
    if key not in qp: return False
    i = qp.index(key)
    if i + 4 > len(qp): return False
    for qrow in ("Total Income From Operations", "Net Sales/Income from operations"):
        vals = [num(x) for x in (q["rows"].get(qrow) or [])[i:i + 4]]
        if len(vals) < 4 or any(v is None for v in vals): continue
        s = sum(vals)
        for arow in ("Total Operating Revenues", "Revenue From Operations [Net]", "Revenue From Operations [Gross]"):
            av = num((ann["rows"].get(arow) or [None])[0])
            if av is not None and abs(av - s) < 0.06: return True
    return False


def collect(scid, slug):
    out = {"v": 2, "scId": scid, "company_slug": slug}
    r = m.get(f"https://www.moneycontrol.com/financials/{slug}/profit-lossVI/{scid}")
    nd = m.next_data(r.text)
    if not nd: out["error"] = f"page status {r.status_code}"; return out
    data = nd["props"]["pageProps"]["data"]
    mm = re.search(r"-([A-Za-z0-9]+)/?$", data.get("slug") or "")
    if not mm: out["error"] = "no canonical id"; return out
    cid = mm.group(1); out["cid"] = cid
    stats = (data.get("stockOtherInfo") or {}).get("statistics") or {}
    out["ttm"] = {k: stats.get(k) for k in ("ttmEps", "ttmPe", "bvps", "pb", "divYeild", "marketCap", "faceValue", "industryPE", "52WeekHigh", "52WeekLow")}
    api = jget(f"https://api.moneycontrol.com/mcapi/v1/quarterly-earning/profit-loss?sc_id={cid}&deviceType=W").get("data") or {}
    st = api.get("stockType"); out["stockType"] = st
    qbasis = "Consolidated" if st == "C" else "Standalone"
    out["annual"] = {}
    # Only the basis Moneycontrol shows by default for this company (its stockType) is kept.
    rk, hk = ("consolidatedResult", "headersC") if st == "C" else ("standardResult", "headers")
    b = annual_block(api, rk, hk)
    if b: out["annual"][qbasis] = b
    qf = jget(f"https://appfeeds.moneycontrol.com/jsonapi/stocks/quarterly_results_responsive?sc_id={cid}&type_format={'cons_quarterly' if st == 'C' else 'quarterly'}&start=0&limit=40")
    q = quarterly_block(qf.get("data") if isinstance(qf, dict) else None, qbasis)
    out["quarterly"] = q
    nj = jget(f"https://www.moneycontrol.com/newsapi/mc_news.php?query=categories_slug:%22business%22+AND+sub_category_slug:%22earnings%22+AND+related_scid:%22{cid}%22&start=0&limit=6")
    arts = [parse_article(nj[k]) for k in nj if isinstance(nj, dict) and k.isdigit() and isinstance(nj[k], dict)]
    arts = [a for a in arts if a]
    ev = quarterly_unit_check(q, arts)
    unit = {"quarterly": ev, "annual": {}}
    if ev:
        ab = out["annual"].get(qbasis)
        if ab and annual_sum_check(q, ab): unit["annual"][qbasis] = True
    out["unit"] = unit
    return out
