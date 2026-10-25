/**
 * Original articles for the Fistotex blog.
 *
 * These are Fistotex's own editorial pages, kept deliberately separate from
 * the syndicated wire at /news (which aggregates third-party headlines and
 * carries no ads). Articles here are original content published by the site.
 *
 * status:
 *  - "draft": held for the site owner's review. Never rendered, absent from
 *    the sitemap, and its URL 404s. Flip to "published" only after approval.
 *  - "published": live on /blog and /blog/<slug>.
 *
 * Editorial rules for this file: no invented authors or reviewer credentials
 * (the publisher is Fistotex itself), no promised returns or rankings, no
 * stale rates without dates - keep articles accurate as of their publication
 * date, and label every worked example as an illustration with assumed inputs.
 */

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  /** ISO date (YYYY-MM-DD), set on first publication. */
  datePublished: string;
  dateUpdated?: string;
  sections: ArticleSection[];
  /** Official or primary sources for substantive claims, shown on the page. */
  sources?: ArticleSource[];
  status: "draft" | "published";
}

export const blogPath = "/blog";
export const articlePath = (slug: string) => `${blogPath}/${slug}` as const;

export const articles: Article[] = [
  {
    slug: "rbi-repo-rate-hike-october-2026-emi",
    title: "RBI raises repo rate to 5.50%: what the October 2026 hike means for your loan EMI",
    description:
      "On 7 October 2026 the RBI raised the repo rate by 25 bps to 5.50%. How the hike reaches a home, car or personal loan EMI, with a verified worked example of what 25 bps costs.",
    category: "Borrowing basics",
    tags: ["RBI", "repo rate", "EMI", "home loan", "interest rate"],
    datePublished: "2026-10-26",
    status: "published",
    sections: [
      {
        paragraphs: [
          "On 7 October 2026, the Reserve Bank of India's Monetary Policy Committee voted unanimously to raise the policy repo rate by 25 basis points to 5.50%. The standing deposit facility rate moved to 5.25% and the marginal standing facility rate to 5.75%. The MPC also changed its stance to \"calibrated tightening\", which it described as meaning rate cuts are off the table in the near term - the next move, if any, would be a hike or a pause. Two members preferred to keep the stance neutral.",
          "The RBI pointed to the re-escalation of the West Asia conflict and sharp crude-oil volatility, with headline CPI inflation expected to average almost 5.8% over the next three quarters. The committee's next meeting is scheduled for 2-4 December 2026.",
        ],
      },
      {
        heading: "How a repo rate hike reaches your EMI",
        paragraphs: [
          "Most floating-rate retail loans in India - home, car and personal loans taken in recent years - are linked to an external benchmark, usually the repo rate, under the RBI's external benchmark lending rate (EBLR) system. When the repo rate rises, your lender's benchmark-linked rate rises at the next reset date, and your EMI or your loan tenure adjusts.",
          "If you have a fixed-rate loan, this hike changes nothing for your current contract. And even for floating-rate borrowers, lenders differ: some raise the EMI, some keep the EMI constant and extend the tenure instead. Either way, the loan gets more expensive - a longer tenure means more months of interest.",
        ],
      },
      {
        heading: "What 25 basis points actually costs: a worked example",
        paragraphs: [
          "Take a ₹50,00,000 home loan for 20 years. At an assumed 8.75% a year, the EMI is about ₹44,186. If the full 25 bps hike passes through and the rate becomes 9.00%, the EMI rises to about ₹44,986 - roughly ₹801 more every month. Over the full tenure, that is about ₹1.92 lakh of extra interest.",
          "This is an illustration with assumed rates, not your loan's figure: your lender's spread over the repo rate, your reset date and your remaining tenure decide your actual number. But it shows the scale - a quarter-point sounds small, and over 20 years it is not.",
        ],
      },
      {
        heading: "Why the interest share matters more than the EMI change",
        paragraphs: [
          "Every EMI has two parts: interest on the outstanding balance and a slice of principal. Early in a long loan, interest dominates - on a 20-year loan at 9%, about 83% of the first EMI is interest. A rate hike at that stage slows down how quickly your balance falls, which is where the extra ₹1.92 lakh in the example comes from.",
          "A part-prepayment early in the tenure works in the opposite direction: it cuts the balance on which all future interest is charged, which is why early prepayments save disproportionately more.",
        ],
      },
      {
        heading: "Check your own numbers",
        paragraphs: [
          "The Fistotex EMI calculator shows the monthly EMI, total interest and total repayment for any amount, rate and tenure - try your current rate against your post-hike rate to see your own difference, with the formula displayed next to the result.",
        ],
      },
      {
        paragraphs: [
          "This article is educational and reflects the policy decision as announced on 7 October 2026. It is not investment, tax or legal advice, and it does not recommend any lender or loan product.",
        ],
      },
    ],
    sources: [
      {
        label: "RBI press release, 7 October 2026: MPC raises policy repo rate by 25 bps to 5.50%",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63742",
      },
    ],
  },
  {
    slug: "october-2026-market-correction-sip",
    title: "Nifty falls 14% from its peak: what October 2026's correction does to a SIP",
    description:
      "Indian markets sold off sharply in late October 2026 as crude oil surged. What the numbers show, and what a correction mechanically does to a monthly SIP - explained without predictions.",
    category: "Investing basics",
    tags: ["market correction", "SIP", "Nifty", "crude oil", "mutual funds"],
    datePublished: "2026-10-26",
    status: "published",
    sections: [
      {
        paragraphs: [
          "Indian equity markets have fallen sharply in the second half of October 2026. In the week ending 23 October, the Nifty 50 fell 2.36% to close at 22,600 - about 14% below its 2026 peak. Roughly ₹16 lakh crore of market value was wiped out in that single week, and midcap stocks posted their steepest fall in two years. 748 stocks on the NSE hit fresh 52-week lows against just 102 new highs, and the volatility index (India VIX) rose to 16.86, its highest since May.",
          "The immediate driver is crude oil: Brent surged past $114 a barrel during the week as the West Asia conflict re-escalated, feeding inflation and interest-rate worries. The rupee traded near ₹94.93 per US dollar, and the 10-year government bond yield rose to 7.52%, its highest in a year.",
        ],
      },
      {
        heading: "What a correction does to a SIP, mechanically",
        paragraphs: [
          "A Systematic Investment Plan (SIP) invests a fixed amount at a fixed interval, buying mutual fund units at whatever NAV applies to each instalment. When prices fall, the same amount buys more units. That is the entire mechanism of rupee-cost averaging - and it works hardest in falling markets, not rising ones.",
          "An illustration with assumed numbers: a ₹10,000 instalment buys 100 units at a NAV of ₹100. If the NAV falls to ₹80, the next instalment buys 125 units. Your 225 units now cost ₹20,000 and are worth ₹18,000 - a notional loss on paper, but you own more units for any future recovery. None of this says prices will recover on any schedule; it only describes what the fixed instalment does at each price.",
        ],
      },
      {
        heading: "What a correction does not tell you",
        paragraphs: [
          "A falling market is not evidence that prices must rebound soon, and a 14% fall from the peak does not mark a bottom. Corrections can deepen and can last months or years. It is equally not evidence that a long-term plan has failed: a SIP is designed around the fact that nobody knows which instalment buys at the low.",
          "Decisions about starting, stopping or changing any investment depend on your own goals, horizon and cash needs. What the arithmetic above can do is separate the mechanics - which are knowable - from the forecast, which is not.",
        ],
      },
      {
        heading: "Where costs and taxes fit",
        paragraphs: [
          "Whatever the market does, the return you keep is after the fund's expense ratio and any applicable capital-gains tax. When comparing outcomes, compare them net of both.",
        ],
      },
      {
        heading: "Try the numbers yourself",
        paragraphs: [
          "The Fistotex SIP calculator lets you test your own instalment, tenure and assumed return - including lower or negative assumptions - and shows the formula it uses next to the result.",
        ],
      },
      {
        paragraphs: [
          "Market figures are as reported for the week ending 23 October 2026. This article is educational, is not investment, tax or legal advice, and does not recommend buying, selling or holding any security or fund.",
        ],
      },
    ],
    sources: [
      {
        label: "Zerodha Aftermarket Report, week ending 25 October 2026: Nifty closes at 22,600, VIX 16.86, 748 stocks at 52-week lows",
        url: "https://aftermarketreport.zerodha.com/p/surging-oil-prices-drag-nifty-to",
      },
      {
        label: "ZeeBiz, 23 October 2026: ₹16 lakh crore market cap wiped out in the week",
        url: "https://www.zeebiz.com/market-news/news-stock-market-weekly-wrap-rs-16-lakh-crore-mcap-wiped-out-as-sensex-sheds-1575-points-what-lies-ahead-404455",
      },
      {
        label: "The Hindu BusinessLine, 23 October 2026: Sensex, Nifty extend losses as crude surges to $114",
        url: "https://www.thehindubusinessline.com/markets/sensex-nifty50-today-stock-market-highlights-23rd-october-2026/article71611889.ece",
      },
    ],
  },
];

/** Published articles, newest first. Drafts never leave this file. */
export function publishedArticles(): Article[] {
  return articles
    .filter((a) => a.status === "published")
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getPublishedArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug && a.status === "published");
}

/** Rough reading time in minutes (200 words/min), minimum 1. */
export function readingMinutes(article: Article): number {
  const words = article.sections
    .flatMap((s) => [s.heading ?? "", ...(s.paragraphs ?? []), ...(s.list ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
