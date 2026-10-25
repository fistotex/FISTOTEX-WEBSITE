import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Newspaper } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/section";
import { StructuredData } from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/seo";
import { articlePath, publishedArticles, readingMinutes } from "@/lib/blog/articles";

export const metadata: Metadata = pageMetadata({
  title: "Blog: money guides and explainers",
  description:
    "Plain-language guides on SIPs, loans, compounding and money basics in India - original articles published by Fistotex, separate from the syndicated news wire.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogIndexPage() {
  const posts = publishedArticles();

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{ items: [{ name: "Blog", url: "/blog" }] }}
      />
      <PageHeader
        eyebrow="Fistotex Blog"
        title="Money guides and explainers"
        description="Original, plain-language articles on how SIPs, loans and compounding work in India. This is our own editorial space - separate from the syndicated news wire, and never investment advice."
        crumbs={[{ name: "Blog" }]}
      />

      <Section className="pt-10 md:pt-14">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-2xl border border-dashed border-rule bg-card p-8 text-center md:p-12">
            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <h2 className="font-display mt-4 text-2xl text-foreground">
              Our first guides are being prepared
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              New articles will appear here as they are published. Until then,
              the calculators and the live market wire are ready to use.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/calculators" className="btn-brand h-10 px-4 font-mono text-xs font-bold uppercase tracking-wide">
                Browse calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/news"
                className="inline-flex h-10 items-center gap-1.5 rounded-sm border border-rule px-4 font-mono text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-muted"
              >
                Market news
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={articlePath(post.slug)}
                className="group flex flex-col border border-rule bg-card p-6 transition-shadow hover:shadow-[0_2px_12px_rgb(0_0_0/0.08)]"
              >
                <p className="eyebrow eyebrow-plain text-xs">{post.category}</p>
                <h2 className="font-display mt-2 text-2xl leading-snug text-foreground group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <p className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.datePublished}>
                    {dateFmt.format(new Date(`${post.datePublished}T00:00:00+05:30`))}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {readingMinutes(post)} min read
                  </span>
                </p>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
