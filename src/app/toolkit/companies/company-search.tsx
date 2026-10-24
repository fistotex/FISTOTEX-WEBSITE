"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Search } from "lucide-react";

type Entry = { n: string; i: string; s: string; c: string };

type QItem = { value?: string; qoq?: string; yoy?: string };
type Fin = {
  pl_type?: string;
  pl_periods?: string[];
  pl_annual?: Record<string, string[]>;
  ttm?: Record<string, string>;
  q_overview?: Record<string, QItem> | string;
  earnings_dates?: {
    last_ear?: { date?: string; quater?: string };
    upcoming_ear?: { date?: string; quater?: string };
  } | string;
};
type Progress = { collected: number; total: number; complete: boolean };

const DATA_URL = "/data/companies-index.json";
const PAGE_SIZE = 100;

function prettySector(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function CompanySearch() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [open, setOpen] = useState<string | null>(null);
  const [shards, setShards] = useState<Record<string, Record<string, Fin> | "none">>({});
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    fetch("/data/financials/progress.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => setProgress(p))
      .catch(() => {});
  }, []);

  function toggle(id: string) {
    if (open === id) {
      setOpen(null);
      return;
    }
    setOpen(id);
    const letter = id.charAt(0).toUpperCase();
    if (shards[letter] === undefined) {
      fetch(`/data/financials/${letter}.json`)
        .then((r) => (r.ok ? r.json() : "none"))
        .catch(() => "none")
        .then((d) => setShards((prev) => ({ ...prev, [letter]: d as Record<string, Fin> | "none" })));
    }
  }

  useEffect(() => {
    let cancelled = false;
    fetch(DATA_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Entry[]) => {
        if (!cancelled) setEntries(data);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const matches = useMemo(() => {
    if (!entries) return [];
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => e.n.toLowerCase().includes(q));
  }, [entries, query]);

  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [query]);

  if (error) {
    return (
      <p className="rounded-sm border border-rule bg-card px-4 py-6 text-sm text-muted-foreground">
        The directory could not be loaded ({error}). Please try again in a moment.
      </p>
    );
  }

  if (!entries) {
    return (
      <p className="rounded-sm border border-rule bg-card px-4 py-6 text-sm text-muted-foreground">
        Loading the company directory&hellip;
      </p>
    );
  }

  const visible = matches.slice(0, shown);

  return (
    <div>
      <label className="flex items-center gap-2 rounded-sm border border-rule bg-card px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search companies - try 'reliance', 'bank', 'tata'&hellip;"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          aria-label="Search companies"
        />
      </label>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        {matches.length.toLocaleString("en-IN")} of {entries.length.toLocaleString("en-IN")}{" "}
        companies
        {query.trim() ? ` matching "${query.trim()}"` : ""}
        {matches.length > shown ? ` - showing first ${shown}` : ""}
      </p>

      <div className="mt-4 overflow-x-auto rounded-sm border border-rule bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-rule text-left font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Figures</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {visible.map((e) => {
              const letter = e.i.charAt(0).toUpperCase();
              const shard = shards[letter];
              const fin = shard && shard !== "none" ? shard[e.i] : undefined;
              const isOpen = open === e.i;
              return (
                <Fragment key={e.i}>
                  <tr className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-semibold text-foreground">{e.n}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {prettySector(e.s)}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`https://www.moneycontrol.com/india/stockpricequote/${e.s}/${e.c}/${e.i}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                      >
                        Moneycontrol
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggle(e.i)}
                        aria-expanded={isOpen}
                        className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                      >
                        Reported figures
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-muted/20">
                      <td colSpan={4} className="px-4 py-4">
                        <div className="sticky left-0 w-[calc(100vw-4.5rem)] max-w-[44rem]">
                          <FigureDetails loading={shard === undefined} fin={fin} progress={progress} />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {matches.length > shown && (
        <button
          type="button"
          onClick={() => setShown((s) => s + PAGE_SIZE * 5)}
          className="btn-brand mt-4 h-10 px-4 font-mono text-xs font-bold uppercase tracking-wide"
        >
          Show more
        </button>
      )}
    </div>
  );
}

const TTM_LABELS: [string, string][] = [
  ["marketCap", "Market cap (Rs. crore)"],
  ["ttmPe", "P/E (TTM)"],
  ["pb", "P/B"],
  ["divYeild", "Dividend yield (%)"],
  ["industryPE", "Industry P/E"],
];
const Q_LABELS: Record<string, string> = {
  revenue: "Revenue",
  gross_profit: "Gross profit (as labelled by Moneycontrol)",
  net_profit: "Net profit",
};

function FigureDetails({
  loading,
  fin,
  progress,
}: {
  loading: boolean;
  fin: Fin | undefined;
  progress: Progress | null;
}) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading reported figures&hellip;</p>;
  if (!fin) {
    return (
      <p className="text-sm text-muted-foreground">
        No reported figures for this company yet. Either they have not been collected yet
        {progress ? ` (${progress.collected.toLocaleString("en-IN")} of ${progress.total.toLocaleString("en-IN")} companies collected so far)` : ""}
        , or Moneycontrol does not publish any for it. Use the Moneycontrol link for the live page.
      </p>
    );
  }
  const annual = fin.pl_annual && Object.keys(fin.pl_annual).length > 0 ? fin.pl_annual : null;
  const q = fin.q_overview && typeof fin.q_overview === "object" ? fin.q_overview : null;
  const ed = fin.earnings_dates && typeof fin.earnings_dates === "object" ? fin.earnings_dates : null;
  const ttm = fin.ttm ? TTM_LABELS.filter(([k]) => fin.ttm?.[k] && fin.ttm[k] !== "--") : [];
  return (
    <div className="space-y-5 text-sm">
      {annual && (
        <p className="rounded-sm border border-rule bg-card px-3 py-2 text-xs text-muted-foreground">
          Annual and quarterly amounts (sales, profit and similar) are collected but not shown yet:
          Moneycontrol&apos;s data feed does not state their unit, so they are withheld until the
          unit is confirmed. Use the Moneycontrol link for the amounts.
        </p>
      )}
      {q && Object.keys(q).length > 0 && (
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Latest quarter - change vs earlier periods
            {ed?.last_ear?.quater ? ` - ${ed.last_ear.quater}` : ""}
            {ed?.last_ear?.date ? ` (reported ${ed.last_ear.date})` : ""}
          </p>
          <ul className="mt-2 space-y-1 text-xs">
            {Object.entries(q).map(([k, v]) => (
              <li key={k}>
                <span className="font-semibold">{Q_LABELS[k] ?? k}:</span>{" "}
                {v.qoq || v.yoy ? (
                  <span className="font-mono">
                    {v.qoq ? `QoQ ${v.qoq}%` : ""}
                    {v.qoq && v.yoy ? " | " : ""}
                    {v.yoy ? `YoY ${v.yoy}%` : ""}
                  </span>
                ) : (
                  <span className="font-mono">Not reported</span>
                )}
                <span className="text-muted-foreground"> (change figures as published by Moneycontrol)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {ed?.upcoming_ear?.date && (
        <p className="text-xs">
          <span className="font-semibold">Next results:</span> {ed.upcoming_ear.quater} on{" "}
          {ed.upcoming_ear.date} (per Moneycontrol)
        </p>
      )}
      {ttm.length > 0 && (
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Key statistics (as shown by Moneycontrol)
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
            {ttm.map(([k, label]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-mono">{fin.ttm?.[k]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Figures are copied as published by Moneycontrol and are not calculated or adjusted by
        Fistotex. Statement basis (standalone or consolidated) is not shown here; check the
        Moneycontrol page. Not investment advice.
        {progress && !progress.complete
          ? ` Collection is in progress: ${progress.collected.toLocaleString("en-IN")} of ${progress.total.toLocaleString("en-IN")} companies so far.`
          : ""}
      </p>
    </div>
  );
}
