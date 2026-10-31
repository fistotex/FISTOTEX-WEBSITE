"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ExternalLink } from "lucide-react";

export type CalendarRow = {
  date: string;
  stockName: string;
  scId: string;
  stockUrl: string;
  resultType: string;
  time: string;
  marketCap: number;
  exchange: string;
};

// Source order is not chronological (month blocks are listed separately), so
// parse the "24 Oct"-style labels into real dates. The year is resolved to the
// nearest occurrence, which keeps the season window right across the
// December/January boundary.
const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};
const HALF_YEAR_MS = 180 * 86400000;

function parseDayLabel(label: string): number {
  const [dayStr, monStr] = label.split(" ");
  const day = parseInt(dayStr, 10);
  const month = MONTH_INDEX[monStr] ?? 0;
  const now = Date.now();
  const year = new Date().getFullYear();
  return new Date(
    now - new Date(year, month, day).getTime() > HALF_YEAR_MS ? year + 1 : year,
    month,
    day
  ).getTime();
}

// "Today" in the India market timezone, in the same "24 Oct" label shape.
function todayLabelIST(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Calcutta",
    day: "numeric",
    month: "short",
  }).formatToParts(new Date());
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = parts.find((p) => p.type === "month")?.value ?? "";
  return `${parseInt(day, 10)} ${month}`;
}

type Mode = "today" | "chrono";

function everyMinute(onTick: () => void) {
  const t = setInterval(onTick, 60000);
  return () => clearInterval(t);
}

export function ResultsCalendar({ rows }: { rows: CalendarRow[] }) {
  // "mounted" keeps the server HTML and first client render identical
  // (chronological); the priority ordering applies right after mount, so the
  // "today" anchor is always computed on the user's clock and survives
  // midnight rollovers without a redeploy.
  const [mode, setMode] = useState<Mode>("today");
  // Re-checked every minute so tabs held open across IST midnight re-anchor.
  const todayLabel = useSyncExternalStore(everyMinute, todayLabelIST, () => "");
  const mounted = todayLabel !== "";

  const groups = useMemo(() => {
    const map = new Map<string, CalendarRow[]>();
    for (const row of rows) {
      const list = map.get(row.date);
      if (list) list.push(row);
      else map.set(row.date, [row]);
    }
    const asc = [...map.entries()].sort(
      (a, b) => parseDayLabel(a[0]) - parseDayLabel(b[0])
    );
    if (!mounted || mode === "chrono" || !todayLabel) return { ordered: asc, todayLabel: "" };

    const todayMs = parseDayLabel(todayLabel);
    const today = asc.filter(([, list]) => parseDayLabel(list[0].date) === todayMs);
    const future = asc.filter(([, list]) => parseDayLabel(list[0].date) > todayMs);
    const past = asc
      .filter(([, list]) => parseDayLabel(list[0].date) < todayMs)
      .reverse();
    return { ordered: [...today, ...future, ...past], todayLabel };
  }, [rows, mounted, mode, todayLabel]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Order:
        </span>
        <button
          type="button"
          onClick={() => setMode("today")}
          aria-pressed={mode === "today"}
          className={`rounded-sm border px-3 py-1.5 font-semibold ${
            mode === "today"
              ? "border-accent bg-accent/10 text-accent"
              : "border-rule bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          Today first
        </button>
        <button
          type="button"
          onClick={() => setMode("chrono")}
          aria-pressed={mode === "chrono"}
          className={`rounded-sm border px-3 py-1.5 font-semibold ${
            mode === "chrono"
              ? "border-accent bg-accent/10 text-accent"
              : "border-rule bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          Chronological
        </button>
      </div>

      {groups.ordered.map(([date, dayRows]) => {
        const isToday = groups.todayLabel !== "" && date === groups.todayLabel;
        return (
          <div key={date} className="mt-10 first:mt-0">
            <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
              {date}
              {isToday && (
                <span className="ml-2 rounded-sm bg-accent/15 px-2 py-0.5 align-middle font-mono text-xs font-bold uppercase tracking-wide text-accent">
                  Today
                </span>
              )}
              <span className="ml-3 font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {dayRows.length} {dayRows.length === 1 ? "company" : "companies"}
              </span>
            </h2>
            <div className="mt-4 overflow-x-auto rounded-sm border border-rule bg-card">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-rule text-left font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Quarter</th>
                    <th className="px-4 py-3">Timing</th>
                    <th className="px-4 py-3">Mkt cap (&#8377; cr)</th>
                    <th className="px-4 py-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {dayRows.map((row) => (
                    <tr
                      key={`${row.scId}-${row.resultType}`}
                      className={isToday ? "bg-accent/5 hover:bg-accent/10" : "hover:bg-muted/40"}
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">{row.stockName}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {row.resultType}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {row.time === "Time Not Available" ? "Not announced" : row.time}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {row.marketCap
                          ? Math.round(row.marketCap).toLocaleString("en-IN")
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={row.stockUrl}
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
          </div>
        );
      })}
    </div>
  );
}
