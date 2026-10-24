import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/section";
import { pageMetadata } from "@/lib/seo";
import rawRows from "@/data/upcoming-results.json";
import refreshMeta from "@/data/refresh-meta.json";
import { ResultsCalendar, type CalendarRow } from "./calendar-client";

export const metadata: Metadata = pageMetadata({
  title: "Upcoming Results Calendar - Who Declares When",
  description:
    "Every company with a notified quarterly results date, grouped by day: name, quarter and timing, with a link to each company's stock page for the official announcement when it lands.",
  path: "/toolkit/results-calendar",
});

const rows = rawRows as CalendarRow[];
const REFRESHED_ON = (refreshMeta as { resultsCalendar?: string }).resultsCalendar ?? "recently";

export default function ResultsCalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toolkit / Results Calendar"
        title="Who declares results, day by day"
        description={`Every company with a notified results date for the coming days, grouped by declaration day, with the quarter being reported and a link out to each company's page for the announcement itself. Today (India time) is shown first, then future days, then past - or switch to plain chronological order. Refreshed ${REFRESHED_ON}. Dates are as notified to the exchanges and can move - the exchange notice is always final.`}
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

        <ResultsCalendar rows={rows} />

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
