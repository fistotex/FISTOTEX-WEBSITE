import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/section";
import { pageMetadata } from "@/lib/seo";
import { CompanySearch } from "./company-search";

export const metadata: Metadata = pageMetadata({
  title: "Every Listed Company - Searchable Directory",
  description:
    "Search 11,000+ Indian listed companies by name and jump to each company's stock page. The full directory, searchable in your browser - nothing is tracked or sent anywhere.",
  path: "/toolkit/companies",
});

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Toolkit / Companies"
        title="Every listed company, one search box"
        description="The complete directory of Indian listed companies, searchable instantly in your browser. Type a name to filter; each entry links to the company's stock page for prices, results and filings. The search runs entirely on your device."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 flex flex-wrap gap-3 text-sm">
          <Link
            href="/toolkit/results-calendar"
            className="rounded-sm border border-rule bg-card px-3 py-1.5 font-semibold text-accent hover:underline"
          >
            Upcoming results calendar
          </Link>
          <Link
            href="/toolkit/results"
            className="rounded-sm border border-rule bg-card px-3 py-1.5 font-semibold text-accent hover:underline"
          >
            Verified dated results
          </Link>
        </div>

        <CompanySearch />

        <div className="mt-10 rounded-sm border border-rule bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
          <p className="mb-1 font-semibold text-foreground">How this directory works</p>
          <p>
            The list is Moneycontrol&rsquo;s index of companies, refreshed weekly by our own
            script and loaded once into your browser - searching never leaves your device. It
            covers the source&rsquo;s full universe, which is wider than the actively trading
            NSE/BSE list, so some entries may be thinly traded, suspended or delisted; the linked
            page shows the current status. Sector labels are the source&rsquo;s own. We add no
            figures or ratings here - this is a map, not a recommendation.
          </p>
        </div>
      </section>
    </>
  );
}
