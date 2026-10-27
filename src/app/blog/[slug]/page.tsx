import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/seo";
import {
  articlePath,
  articles,
  getPublishedArticle,
  readingMinutes,
} from "@/lib/blog/articles";

/** Articles are small and static; revalidate hourly to pick up status flips on redeploy. */
export const revalidate = 3600;

export function generateStaticParams() {
  return articles
    .filter((a) => a.status === "published")
    .map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: articlePath(article.slug),
  });
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) notFound();

  const published = new Date(`${article.datePublished}T00:00:00+05:30`);
  const updated = article.dateUpdated
    ? new Date(`${article.dateUpdated}T00:00:00+05:30`)
    : undefined;

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          title: article.title,
          description: article.description,
          url: articlePath(article.slug),
          datePublished: article.datePublished,
          dateModified: article.dateUpdated,
          category: article.category,
          tags: article.tags,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Blog", url: "/blog" },
            { name: article.title },
          ],
        }}
      />

      <article className="container mx-auto max-w-3xl px-4 pt-10 md:pt-14">
        <Breadcrumbs
          items={[{ name: "Blog", href: "/blog" }, { name: article.title }]}
          className="mb-8"
        />
        <p className="eyebrow">{article.category}</p>
        <h1 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <time dateTime={article.datePublished}>{dateFmt.format(published)}</time>
          {updated && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={article.dateUpdated}>{dateFmt.format(updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {readingMinutes(article)} min read
          </span>
        </p>
        <p className="mt-6 border-l-2 border-accent pl-4 text-lg leading-relaxed text-ink-2">
          {article.description}
        </p>
      </article>

      <Section className="pt-10 md:pt-12" contentClassName="max-w-3xl">
        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display mb-4 text-2xl text-foreground md:text-3xl">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="mb-4 leading-relaxed text-foreground/90 last:mb-0">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 leading-relaxed text-foreground/90">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
              {section.table && (
                <figure className="mt-2 overflow-x-auto">
                  {section.table.caption && (
                    <figcaption className="eyebrow eyebrow-plain mb-2 text-xs">
                      {section.table.caption}
                    </figcaption>
                  )}
                  <table className="w-full min-w-[28rem] border-collapse text-sm leading-relaxed">
                    <thead>
                      <tr>
                        {section.table.columns.map((column, j) => (
                          <th
                            key={j}
                            scope="col"
                            className="border-b-2 border-rule px-3 py-2 text-left font-semibold text-foreground"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, j) => (
                        <tr key={j} className="border-b border-rule last:border-b-0">
                          {row.map((cell, k) => (
                            <td key={k} className="px-3 py-2 align-top text-foreground/90">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-xs text-muted-foreground md:hidden" aria-hidden="true">
                    Swipe sideways to see all columns
                  </p>
                </figure>
              )}
            </section>
          ))}
        </div>

        {article.sources && article.sources.length > 0 && (
          <section className="mt-12 border-t border-rule pt-6">
            <h2 className="eyebrow eyebrow-plain text-xs">Sources</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav
          aria-label="Article"
          className="mt-14 flex items-center justify-between border-t border-rule pt-6"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All articles
          </Link>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Try a calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </Section>
    </>
  );
}
