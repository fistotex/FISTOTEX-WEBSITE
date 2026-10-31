import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { baseUrl } from "@/lib/seo";
import { articlePath, blogPath, publishedArticles } from "@/lib/blog/articles";
import {
  calculatorIds,
  categoryIds,
  calculatorPath,
  categoryPath,
  calculatorsPath,
} from "@/lib/calculators/registry";
import { RESULTS_FIGURES_REVIEWED_ON } from "@/lib/toolkit/results-figures";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  // lastmod must reflect real content changes, not build time, or search
  // engines learn to ignore it. News is the only page that changes daily.
  const reviewed = new Date(siteConfig.contentReviewed);
  const articles = publishedArticles();
  const legalUpdated = new Date("2026-09-26");

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: reviewed, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}${calculatorsPath}`, lastModified: reviewed, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}${blogPath}`, lastModified: new Date(articles[0]?.datePublished ?? siteConfig.contentReviewed), changeFrequency: "weekly", priority: 0.7 },
    // The calendar is computed relative to today, so it genuinely changes daily.
    { url: `${baseUrl}/toolkit/market-calendar`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/toolkit/results`, lastModified: new Date(RESULTS_FIGURES_REVIEWED_ON), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: reviewed, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: reviewed, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryUrls: MetadataRoute.Sitemap = categoryIds.map((id) => ({
    url: `${baseUrl}${categoryPath(id)}`,
    lastModified: reviewed,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const calculatorUrls: MetadataRoute.Sitemap = calculatorIds.map((id) => ({
    url: `${baseUrl}${calculatorPath(id)}`,
    lastModified: reviewed,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}${articlePath(a.slug)}`,
    lastModified: new Date(a.dateUpdated ?? a.datePublished),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryUrls, ...calculatorUrls, ...articleUrls];
}
