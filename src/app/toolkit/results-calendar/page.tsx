import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/section";
import { pageMetadata } from "@/lib/seo";
import rawRows from "@/data/upcoming-results.json";

export const metadata: Metadata = pageMetadata({
  title: "Upcoming Results Calendar - Who Declares When",
  description:
    "Every company with a notified quarterly results date, grouped by day: name, quarter and timing, with a link to each company's stock page for the official announcement when it lands.",
  path: "/toolkit/results-calendar",
});

type Row = {
  date: string;
  stockName: string;
  scId: string;
  stockUrl: string;
  resultType: string;
  time: string;
  marketCap: number;
  exchange: string;
};

const rows = rawRows as Row[];
const REFRESHED_ON = "October 24, 2026";

// Preserve first-seen order of dates (source lists latest first).
const byDate: [string, Row[]][] = [];
for (const row of rows) {
  const last = byDate[byDate.length - 1];
  if (last && last[0] === row.date) last[1].push(row);
  else byDate.push([row.date, [row]]);
}

export default function ResultsCalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toolkit / Results Calendar"
        title="Who declares results, day by day"
        description={`Every company with a notified results date for the coming days, grouped by declaration day, with the quarter being reported and a link out to each company's page for the announcement itself. Refreshed ${REFRESHED_ON}. Dates are as notified to the exchanges and can move - the exchange notice is always final.`}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 flex flex-wrap gap-3 text-sm">
          <Link
            href="/toolkit/results"
            className="rounded-sm border border-rule bg-card px-3 py-1.5 font-semibold text-accent hover:underline"
          >
            Verified dated results
          </Link>
          <Link
            href="/toolkit/companies"
            className="rounded-sm border border-rule bg-card px-3 py-1.5 font-semibold text-accent hover:underline"
          >
            All-company directory
          </Link>
          <Link
            href="/toolkit/market-calendar"
            className="rounded-sm border border-rule bg-card px-3 py-1.5 font-semibold text-accent hover:underline"
          >
            Market calendar
          </Link>
        </div>

        {byDate.map(([date, dayRows]) => (
          <div key={date} className="mt-10 first:mt-0">
            <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
              {date}
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
                    <tr key={`${row.scId}-${row.resultType}`} className="hover:bg-muted/40">
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
                          Company page
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="mt-10 rounded-sm border border-rule bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
          <p className="mb-1 font-semibold text-foreground">How this calendar works</p>
          <p>
            The dates above are companies&rsquo; exchange-notified results dates as aggregated by
            Moneycontrol&rsquo;s results calendar, refreshed daily by our own script. We do not
            compute or estimate anything here: if a date moves, it moves because the source moved
            it. When a company declares, its figures appear on the linked page and on the exchange
            filing - we never restate them. Market caps are the source&rsquo;s latest figure in
            &#8377; crore, shown for context. Companies missing a date either have not notified one
            yet or sit outside the source&rsquo;s coverage.
          </p>
        </div>
      </section>
    </>
  );
                      }
