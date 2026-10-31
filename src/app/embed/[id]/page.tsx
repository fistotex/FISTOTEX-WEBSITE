import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorRunner } from "@/components/calculators/calculator-runner";
import { calculatorIds, getCalculator, calculatorPath } from "@/lib/calculators/registry";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";

/*
  Embeddable calculator: framed on other sites from the /embed page's snippet.
  The data-embed marker makes globals.css hide the site chrome (header, footer,
  feedback button), and next.config.ts lets only /embed/* be framed. Not indexed:
  the canonical points at the full calculator page so the two never compete.
*/

export function generateStaticParams() {
  return calculatorIds.map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const def = getCalculator(id);
  if (!def) return {};
  return {
    title: `${def.name} (embed)`,
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(calculatorPath(def.id)) },
  };
}

export default async function EmbedRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const def = getCalculator(id);
  if (!def) notFound();
  return (
    <div data-embed className="p-3 sm:p-4">
      <CalculatorRunner id={def.id} />
      <p className="mt-3 text-right text-xs text-muted-foreground">
        <a href={absoluteUrl(calculatorPath(def.id))} target="_blank" rel="noopener" className="font-semibold text-accent hover:underline">
          {def.name} by {siteConfig.name}
        </a>
      </p>
    </div>
  );
}
