import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { PageHeader, Section } from "@/components/layout/section";
import { calculators, calculatorPath } from "@/lib/calculators/registry";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Free Finance Calculators for Your Website",
  description:
    "Add a free SIP, EMI, FD, PPF or any other Fistotex calculator to your website or blog with one line of HTML. No sign-up, no ads, formulas shown.",
  path: "/embed",
});

const snippet = (id: string, name: string) =>
  `<iframe src="${absoluteUrl(`/embed/${id}`)}" title="${name}" width="100%" height="760" style="border:0;max-width:880px" loading="lazy"></iframe>\n<p style="font-size:12px"><a href="${absoluteUrl(calculatorPath(id))}">${name}</a> by ${siteConfig.name}</p>`;

export default function EmbedIndex() {
  return (
    <>
      <PageHeader
        eyebrow="For bloggers, advisers and CA firms"
        title="Put a free calculator on your website"
        description="Copy one snippet into your page's HTML. The calculator runs inside your page, carries no ads, shows its formula, and stays up to date."
        crumbs={[{ name: "Embed a calculator" }]}
      />
      <Section className="pt-10 md:pt-12">
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Free for any website. Please keep the credit line under the calculator. Questions or a custom size?{" "}
          <Link href="/contact" className="font-semibold text-accent hover:underline">Contact us</Link>.
        </p>
        <div className="grid gap-8">
          {calculators.map((c) => (
            <div key={c.id} className="surface p-6">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-foreground">{c.name}</h2>
                <Link href={`/embed/${c.id}`} className="text-sm font-semibold text-accent hover:underline" target="_blank">
                  Preview
                </Link>
              </div>
              <p className="mb-3 text-sm text-muted-foreground">{c.tagline}</p>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-sm border border-rule bg-muted/50 p-3 text-xs">
                <code>{snippet(c.id, c.name)}</code>
              </pre>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
