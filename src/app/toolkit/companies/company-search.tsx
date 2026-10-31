"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";

type Entry = { n: string; i: string; s: string; c: string };

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
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE_SIZE);
          }}
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
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {visible.map((e) => (
              <tr key={e.i} className="hover:bg-muted/40">
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
              </tr>
            ))}
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
