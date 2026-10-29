import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/section";
import { pageMetadata } from "@/lib/seo";
import {
  RESULTS_DIRECTORY,
  RESULTS_DIRECTORY_REVIEWED_ON,
  RESULTS_ARCHIVE,
  RESULTS_ARCHIVE_REVIEWED_ON,
} from "@/lib/toolkit/results-directory";
import {
  RESULTS_FIGURES,
  RESULTS_FIGURES_REVIEWED_ON,
} from "@/lib/toolkit/results-figures";

export const metadata: Metadata = pageMetadata({
  title: "Company Results - Verified Figures, Dates, Official Sources",
  description:
    "Recent quarterly results from Indian companies: figures read from the official exchange filings, verified declaration dates and direct links to each source. Hand-checked, growing list.",
  path: "/toolkit/results",
});

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toolkit / Results"
        title="Company results, straight from official sources"
        description="Recent quarterly results with figures we read in the official exchange filings and verified declaration dates. Every entry links to the filing it came from, with the exchange's publication time and the date we checked it. Companies are added one at a time, after we read the source."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div>
          <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
            Figures we read in the filings
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Short, original summaries with the key lines from each company&rsquo;s official
            exchange filing. We download and read the linked filing ourselves; computed measures
            show their definition in the notes, and anything that does not fit a clean basis is
            flagged rather than guessed. Banks, insurers and companies with unusual items may be
            summarised on a different basis or left out. This list grows one filing at a time -
            it is not a complete market universe.
          </p>

          <div className="mt-6 space-y-6">
            {RESULTS_FIGURES.map((entry) => (
              <article
                key={entry.company}
                className="rounded-sm border border-rule bg-card p-4 sm:p-6"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl text-foreground">{entry.company}</h3>
                  <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {entry.quarterLabel} - ended {entry.periodEnded}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wide text-accent">
                    {entry.basis}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{entry.summary}</p>
                <div className="mt-4 overflow-x-auto rounded-sm border border-rule">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b border-rule text-left font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        <th className="px-4 py-2.5">Metric ({entry.currencyUnit})</th>
                        <th className="px-4 py-2.5">{entry.quarterLabel}</th>
                        <th className="px-4 py-2.5">Year ago</th>
                        <th className="px-4 py-2.5">Previous quarter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {entry.rows.map((row) => (
                        <tr key={row.label} className="hover:bg-muted/40">
                          <td className="px-4 py-2.5 font-semibold text-foreground">
                            {row.label}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                            {row.current}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                            {row.yoy ?? "-"}
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                            {row.qoq ?? "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-muted-foreground md:hidden" aria-hidden="true">
                  Swipe sideways to see all columns
                </p>
                {entry.caveats.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
                    {entry.caveats.map((caveat) => (
                      <li key={caveat}>{caveat}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 font-mono text-xs text-muted-foreground">
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                  >
                    Read the filing
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <span className="ml-2">
                    {entry.sourceName}, published {entry.sourceDisseminatedAt}.
                    Figures verified {entry.verifiedAt}.
                  </span>
                </p>
              </article>
            ))}
          </div>

          <p className="mt-4 font-mono text-xs text-muted-foreground">
            {RESULTS_FIGURES.length} companies with verified figures, checked{" "}
            {RESULTS_FIGURES_REVIEWED_ON}.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
            Declaration dates we verified
          </h2>
          <p className="mt-3 mb-6 max-w-2xl text-sm text-muted-foreground">
            Dated results confirmed against each company&rsquo;s own announcement. These entries
            link out to the source; figures for them may be added above as we read each filing.
          </p>
        </div>

        <div className="overflow-x-auto rounded-sm border border-rule bg-card">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-rule text-left font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Quarter</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Official source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {RESULTS_DIRECTORY.map((entry) => (
                <tr key={entry.company} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-semibold text-foreground">{entry.company}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {entry.quarterLabel}
                    <span className="block">ended {entry.quarterEnded}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {entry.status === "published" ? (
                      <span className="inline-flex items-center gap-1.5 text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        Published {entry.dateLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          aria-hidden="true"
                        />
                        Scheduled {entry.dateLabel}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={entry.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      View official results
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                    <span className="block font-mono text-xs text-muted-foreground">
                      {entry.sourceName}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {RESULTS_DIRECTORY.length} dated results verified {RESULTS_DIRECTORY_REVIEWED_ON}. We
          check each company&rsquo;s terms before linking; some companies stay out until their
          terms allow it.
        </p>

        <div className="mt-14">
          <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
            Official results pages
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Direct links to each company&rsquo;s own results or investor-relations page. We have
            verified that every page exists and is official, and we reviewed the company&rsquo;s
            published terms and found no restriction on linking - but we have not separately
            confirmed the latest quarter on each one, so check the linked page for the newest
            results.
          </p>

          <div className="mt-6 overflow-x-auto rounded-sm border border-rule bg-card">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-rule text-left font-mono text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Official page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {RESULTS_ARCHIVE.map((entry) => (
                  <tr key={entry.company} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-semibold text-foreground">{entry.company}</td>
                    <td className="px-4 py-3">
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                      >
                        Results &amp; reports
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <span className="block font-mono text-xs text-muted-foreground">
                        {entry.sourceName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-mono text-xs text-muted-foreground">
            {RESULTS_ARCHIVE.length} official pages checked {RESULTS_ARCHIVE_REVIEWED_ON}. More
            companies are added in batches as each one is verified.
          </p>
        </div>

        <div className="mt-8 rounded-sm border border-rule bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
          <p className="mb-1 font-semibold text-foreground">How this page works</p>
          <p>
            The figures section above publishes key numbers we read directly in the exchange
            filing linked with each entry, with computed measures and their definitions shown and
            basis caveats flagged. The dated table is verified by hand against each company&rsquo;s
            official announcement. The directory below links to official results pages that we
            have fetched and reviewed against the companies&rsquo; published terms, without
            copying figures or reports. Companies whose terms restrict linking are excluded. See
            also the{" "}
            <Link href="/toolkit/market-calendar" className="text-accent hover:underline">
              market calendar
            </Link>
            , the{" "}
            <Link href="/toolkit/results-calendar" className="text-accent hover:underline">
              upcoming results calendar
            </Link>{" "}
            and the{" "}
            <Link href="/toolkit/companies" className="text-accent hover:underline">
              all-company directory
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
