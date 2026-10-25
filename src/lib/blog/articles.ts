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
 * stale rates - keep articles evergreen and educational, and label every
 * worked example as an illustration with assumed inputs.
 */

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
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
  status: "draft" | "published";
}

export const blogPath = "/blog";
export const articlePath = (slug: string) => `${blogPath}/${slug}` as const;

export const articles: Article[] = [
  {
    slug: "what-is-a-sip",
    title: "What is a SIP? How systematic investing actually works",
    description:
      "A plain-language explanation of Systematic Investment Plans in India: how a SIP buys mutual fund units, what rupee-cost averaging does, and why time matters more than timing.",
    category: "Investing basics",
    tags: ["SIP", "mutual funds", "compounding", "investing basics"],
    datePublished: "2026-10-26",
    status: "draft",
    sections: [
      {
        paragraphs: [
          "A Systematic Investment Plan (SIP) is a way of investing in a mutual fund: you commit a fixed amount at a fixed interval, usually monthly, instead of investing a large sum at once. A SIP is not a product you buy. It is a method of buying units of a mutual fund scheme you have already chosen.",
          "Because the amount and the date are fixed, a SIP removes the two hardest decisions in investing - how much, and when. The investment happens whether markets are up, down or sideways.",
        ],
      },
      {
        heading: "How a SIP buys units",
        paragraphs: [
          "Every mutual fund has a Net Asset Value (NAV), the price of one unit, published each business day. When your SIP instalment goes through, you receive units worth your amount at that day's NAV.",
          "When markets fall, the NAV is lower and the same instalment buys more units. When markets rise, it buys fewer. Over many instalments this averages out your purchase price, which is why people call it rupee-cost averaging. It smooths the price you pay; it does not guarantee a profit or protect you from a falling market.",
        ],
      },
      {
        heading: "Why compounding does the heavy lifting",
        paragraphs: [
          "Compounding means the returns your money earns start earning returns themselves. In the early years most of your corpus is money you put in. In the later years, if the investment has grown, the growth on past growth can outweigh your own contributions.",
          "That is why the length of time you stay invested usually matters more than the size of each instalment. An illustration with assumed numbers: ₹5,000 a month for 10 years adds up to ₹6 lakh invested. At an assumed 12% a year it could grow to roughly ₹11.6 lakh; over 20 years the same habit reaches roughly ₹50 lakh, of which only ₹12 lakh is your own money. These figures come from an assumed, constant return and are not a prediction - real returns vary year to year and can be negative.",
        ],
      },
      {
        heading: "SIP or lump sum?",
        paragraphs: [
          "A lump sum invests everything on day one, so its outcome depends heavily on that one entry point. A SIP spreads entries over time, which lowers the impact of any single bad date but also means cash waiting on the sidelines. Neither is universally better; they answer different situations. A SIP suits money that arrives regularly, like a salary.",
        ],
      },
      {
        heading: "Mistakes that quietly hurt SIP returns",
        list: [
          "Stopping instalments when markets fall - the downturns are exactly when a fixed amount buys the most units.",
          "Expecting a smooth line - equity funds move in both directions, sometimes for years.",
          "Ignoring costs and tax - the fund's expense ratio and capital-gains tax both come out of your return.",
          "Starting without an emergency fund, then breaking the SIP at the first cash crunch.",
        ],
      },
      {
        heading: "Try the numbers yourself",
        paragraphs: [
          "The Fistotex SIP calculator lets you test your own amount, tenure and assumed return, and shows the formula it uses alongside the result.",
        ],
      },
      {
        paragraphs: [
          "This article is educational. It is not investment, tax or legal advice, and it does not recommend any fund or product.",
        ],
      },
    ],
  },
  {
    slug: "how-loan-emi-is-calculated",
    title: "How a loan EMI is calculated, and why early EMIs are mostly interest",
    description:
      "The EMI formula explained in plain language, with a verified worked example, and the reason a longer tenure lowers your EMI but raises the total interest you pay.",
    category: "Borrowing basics",
    tags: ["EMI", "loans", "amortisation", "borrowing basics"],
    datePublished: "2026-10-26",
    status: "draft",
    sections: [
      {
        paragraphs: [
          "EMI stands for Equated Monthly Instalment: the fixed amount you pay a lender every month until a loan is fully repaid. Each EMI contains two parts - interest on the outstanding balance and a slice of the principal. The split changes every month even though the EMI stays the same.",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the loan amount, r is the monthly interest rate (the annual rate divided by 12), and n is the number of monthly instalments.",
          "The monthly rate trips people up: a 9% annual rate means r = 0.75% per month, not 9% per month.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Take a ₹5,00,000 loan at an assumed 9% a year for 5 years (60 months). The formula gives an EMI of about ₹10,379. Over the full tenure you repay roughly ₹6,22,751 in total, of which about ₹1,22,751 is interest. These numbers use an assumed rate for illustration; your lender's actual rate and fees decide your real EMI.",
        ],
      },
      {
        heading: "Why early EMIs are mostly interest",
        paragraphs: [
          "Interest each month is charged on the balance still owed. At the start, the balance is the full loan, so the interest slice is large and only a small part of the EMI reduces the principal. In the first month of the example above, interest is ₹3,750 of the ₹10,379 EMI - over a third. As the balance shrinks, the interest slice shrinks with it and more of each EMI goes to principal. In the final months almost the entire EMI is principal.",
          "This is also why a part-prepayment early in the tenure saves so much: it directly cuts the balance on which all future interest is charged.",
        ],
      },
      {
        heading: "What moves your EMI",
        list: [
          "Loan amount - a bigger loan means a proportionally bigger EMI.",
          "Interest rate - even half a percentage point changes the total cost meaningfully over a long tenure.",
          "Tenure - a longer tenure lowers the monthly EMI but raises the total interest paid, because the balance stays outstanding for longer.",
        ],
      },
      {
        heading: "Try the numbers yourself",
        paragraphs: [
          "The Fistotex EMI calculator shows the monthly EMI, the total interest and the full repayment figure for any amount, rate and tenure, with the formula displayed next to the result.",
        ],
      },
      {
        paragraphs: [
          "This article is educational. It is not investment, tax or legal advice, and it does not recommend any lender or loan product.",
        ],
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
