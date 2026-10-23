import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/section";
import { pageMetadata } from "@/lib/seo";
import {
  RESULTS_DIRECTORY,
  RESULTS_DIRECTORY_REVIEWED_ON,
} from "@/lib/toolkit/results-directory";

export const metadata: Metadata = pageMetadata({
  title: "Company Results - Verified Dates, Official Sources",
  description:
    "Recent quarterly results from Indian companies with verified declaration dates and direct links to each company's official announcement. Hand-checked, growing list.",
  path: "/toolkit/results",
});

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toolkit / Results"
        title="Company results, straight from official sources"
        description="Recent quarterly results with verified declaration dates. Each entry links to the company's own announcement or investor-relations page - figures and reports live on their websites, not ours. Companies are added one at a time, after we check the official source."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
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
          List verified {RESULTS_DIRECTORY_REVIEWED_ON}. We check each company&rsquo;s terms
          before linking; some companies stay out until their terms allow it.
        </p>

        <div className="mt-8 rounded-sm border border-rule bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
          <p className="mb-1 font-semibold text-foreground">How this list works</p>
          <p>
            Every entry is verified by hand against the company&rsquo;s official investor-relations
            page or press release before it is listed. We link out to those pages instead of
            copying figures or reports, so the numbers always live with their source. See also
            the{" "}
            <Link href="/toolkit/market-calendar" className="text-accent hover:underline">
              market calendar
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
