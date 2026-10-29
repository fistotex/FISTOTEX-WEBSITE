import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CalendarDays, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/section";
import { pageMetadata } from "@/lib/seo";
import {
  allEvents,
  ECONOMIC_DATA_REVIEWED_ON,
  daysUntil,
  daysUntilInstant,
  istDateLabel,
  istTimeLabel,
  istWeekday,
  CALENDAR_SOURCES,
  CALENDAR_REVIEWED_ON,
  type EventKind,
  type MarketEvent,
} from "@/lib/toolkit/market-calendar";
import { NextEventCountdown, type CountdownEvent } from "@/components/toolkit/next-event-countdown";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Economic & Market Calendar - PCE, CPI, Jobs, GDP & RBI | Fistotex",
  description:
    "Selected economic and market releases: official US PCE, CPI, jobs and GDP actuals with IST release times, plus RBI, Fed, expiry and holiday dates. Checked sources, no consensus forecasts.",
  path: "/toolkit/market-calendar",
});

const KIND_LABEL: Record<EventKind, string> = {
  rbi: "RBI policy",
  "global-central-bank": "Central bank",
  expiry: "F&O expiry",
  budget: "Budget",
  "macro-data": "Macro data",
  "results-season": "Results season",
  holiday: "Holiday",
  "special-session": "Special session",
};

function eventDateLabel(e: MarketEvent): string {
  if (e.span) return e.span;
  return new Date(e.date + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

function weekday(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", {
    weekday: "short",
    timeZone: "UTC",
  });
}

function monthKey(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function groupByMonth(events: MarketEvent[]): [string, MarketEvent[]][] {
  const byMonth = new Map<string, MarketEvent[]>();
  for (const e of events) {
    const k = monthKey(e.date);
    byMonth.set(k, [...(byMonth.get(k) ?? []), e]);
  }
  return [...byMonth.entries()];
}

function MonthGroup({
  month,
  list,
  now,
  past = false,
}: {
  month: string;
  list: MarketEvent[];
  now: Date;
  past?: boolean;
}) {
  return (
    <div>
      <h2 className="eyebrow mb-5">{month}</h2>
      <ul className="divide-y divide-rule overflow-hidden rounded-sm border border-rule bg-card">
        {list.map((e) => {
          const du = e.instantUTC ? daysUntilInstant(e.instantUTC, now) : daysUntil(e.date, now);
          return (
            <li
              key={`${e.date}-${e.title}`}
              className={cn(
                "flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:gap-6",
                e.volatile && "bg-accent-soft/40"
              )}
            >
              <div className="w-28 shrink-0">
                <div className="font-mono text-sm font-bold text-foreground">
                  {e.instantUTC ? istDateLabel(e.instantUTC) : eventDateLabel(e)}
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  {e.instantUTC
                    ? `${istTimeLabel(e.instantUTC)} IST${e.timeApprox ? "*" : ""} · ${istWeekday(e.instantUTC)}`
                    : e.span
                      ? `decides ${weekday(e.date)}`
                      : weekday(e.date)}
                  {du >= 0 && du <= 7 && (
                    <span className="text-accent"> &middot; {du === 0 ? "today" : `in ${du}d`}</span>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-foreground">{e.title}</span>
                  {e.currency && (
                    <span className="rounded-sm border border-rule px-1.5 py-px font-mono text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      {e.currency}
                    </span>
                  )}
                  <span className="rounded-sm border border-rule px-1.5 py-px font-mono text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {KIND_LABEL[e.kind]}
                  </span>
                  {e.actual && (
                    <span className="rounded-sm bg-accent px-1.5 py-px font-mono text-[11px] font-bold uppercase text-accent-foreground">Released</span>
                  )}
                  {past && !e.actual && (
                    <span className="rounded-sm border border-rule px-1.5 py-px font-mono text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      Past
                    </span>
                  )}
                  {e.volatile && (
                    <span className="inline-flex items-center gap-1 rounded-sm bg-accent px-1.5 py-px font-mono text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
                      <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                      Volatile
                    </span>
                  )}
                </div>
                {e.note && <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>}
                {e.actual && (
                  <p className="mt-2 rounded-sm border border-rule bg-background px-3 py-2 text-sm text-foreground">
                    <span className="font-semibold">Official actual:</span> {e.actual}
                  </p>
                )}
                {e.previous && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-ink-2">Previous:</span> {e.previous}
                  </p>
                )}
                {e.source && (
                  <a
                    href={e.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    Source: {e.source.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function MarketCalendarPage() {
  const now = new Date();
  const events = allEvents(now);
  const isPast = (e: MarketEvent): boolean => {
    if (daysUntil(e.date, now) >= 0) return false;
    if (e.spanEnd && daysUntil(e.spanEnd, now) >= 0) return false; // still underway
    return true;
  };
  const released = events.filter((e) => Boolean(e.actual)).sort((a, b) => b.date.localeCompare(a.date));
  const past = events.filter((e) => isPast(e) && !e.actual);
  const upcoming = events.filter((e) => !isPast(e) && !e.actual);
  const timedEvents: CountdownEvent[] = events
    .filter((e): e is MarketEvent & { instantUTC: string } => Boolean(e.instantUTC))
    .map((e) => ({
      title: e.title,
      instantUTC: e.instantUTC,
      timeApprox: e.timeApprox,
      timeLabelIST: istTimeLabel(e.instantUTC),
      dateLabelIST: istDateLabel(e.instantUTC),
    }));

  return (
    <>
      <PageHeader
        eyebrow="Toolkit / Market Calendar"
        title="The dates that move the market"
        description="Official US PCE, CPI, jobs and GDP releases with checked actual figures and IST times, alongside RBI policy decisions, F&O expiry days, the Union Budget, inflation and GDP prints, Fed meetings, results seasons and trading holidays - what's next, plus the last three months for context. Days marked volatile are when indices historically swing the most - size your positions accordingly."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 flex flex-wrap items-center gap-3 rounded-sm border border-rule bg-card px-4 py-3 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>
            Dates verified against official sources on {CALENDAR_REVIEWED_ON} and re-checked monthly.
            Past dates are the actual officially published release dates. F&O expiry dates are
            computed from the exchange&rsquo;s Tuesday convention and rolled back over holidays.
            Timed entries show the organiser&rsquo;s official release time converted to IST; an
            asterisk marks a time the source itself lists as approximate. Previous figures are the
            last officially published values - forecasts are not shown.
          </span>
        </div>

        <div className="mb-8 rounded-sm border border-rule bg-card p-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Economic data checked {ECONOMIC_DATA_REVIEWED_ON}</p>
          <p className="mt-1">Selected US PCE, CPI, jobs and GDP releases are shown below with official actuals, period and measurement basis. Upcoming dates currently cover November and December 2026. Sources are BEA and BLS, not a consensus-forecast feed. This is checked coverage, not a complete live calendar: figures do not update automatically at release time and may later be revised. Future actuals are left blank until verified.</p>
        </div>

        <section className="mb-12" aria-label="Released economic data">
          <h2 className="mb-6 font-display text-2xl font-normal text-foreground sm:text-3xl">Released economic data</h2>
          <div className="space-y-8">
            {groupByMonth(released).map(([month, list]) => (
              <MonthGroup key={month} month={month} list={list} now={now} />
            ))}
          </div>
        </section>

        <NextEventCountdown events={timedEvents} serverNow={now.getTime()} />

        {past.length > 0 && (
          <div className="mb-14">
            <h2 className="mb-6 font-display text-2xl font-normal text-foreground sm:text-3xl">
              The last 3 months
            </h2>
            <div className="space-y-12">
              {groupByMonth(past).map(([month, list]) => (
                <MonthGroup key={month} month={month} list={list} now={now} past />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-6 font-display text-2xl font-normal text-foreground sm:text-3xl">
            Coming up
          </h2>
          <div className="space-y-12">
            {groupByMonth(upcoming).map(([month, list]) => (
              <MonthGroup key={month} month={month} list={list} now={now} />
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-sm border border-rule bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">Official sources</p>
          <ul className="space-y-1">
            {CALENDAR_SOURCES.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline"
                >
                  {s.label}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            See verified results dates and official sources on the{" "}
            <Link href="/toolkit/results" className="text-accent hover:underline">
              results page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
