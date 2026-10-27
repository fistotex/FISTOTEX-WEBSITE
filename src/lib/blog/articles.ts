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
  table?: ArticleTable;
}

export interface ArticleTable {
  /** Optional caption shown above the table. */
  caption?: string;
  /** Column headings, left to right. */
  columns: string[];
  /** Each row must have the same number of cells as columns. */
  rows: string[][];
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
    slug: "us-fed-fomc-october-2026-india",
    title:
      "US Fed's FOMC meets 27-28 October 2026: what the rate decision means for India",
    description:
      "The US Federal Reserve's FOMC meets on 27-28 October 2026, with its rate decision due at about 11:30 pm India time on 28 October. What the federal funds rate is, and the four channels through which the Fed reaches Indian markets.",
    category: "Investing basics",
    tags: ["US Fed", "FOMC", "federal funds rate", "interest rates", "Indian markets"],
    datePublished: "2026-10-27",
    status: "published",
    sections: [
      {
        paragraphs: [
          "The US Federal Reserve's rate-setting body, the Federal Open Market Committee (FOMC), meets on 27 and 28 October 2026. Fed statements are released at 2 pm US Eastern Time, which for this meeting works out to about 11:30 pm in India on 28 October. The committee holds eight scheduled meetings a year; after this one, the next is on 8-9 December 2026.",
          "At its previous meeting on 16 September 2026, the FOMC voted 12-0 to raise the target range for the federal funds rate by a quarter point to 3.75-4.00%. That statement said inflation \"remains elevated\" and that the committee \"will deliver price stability\" - wording traders will compare against this week's text line by line.",
        ],
      },
      {
        heading: "What the federal funds rate actually is",
        paragraphs: [
          "The federal funds rate is the interest rate at which US banks lend reserve balances to each other overnight. It anchors borrowing costs across the US economy and, because the dollar is the world's main funding and reserve currency, it influences financial conditions far beyond the United States. The FOMC does not set your loan or deposit rate directly; it sets this overnight target, and the effect travels outward from there.",
        ],
      },
      {
        heading: "Four channels from the Fed to India",
        paragraphs: [
          "None of these channels switches on overnight, and none guarantees a particular market reaction. They are the plumbing through which US rate decisions have reached Indian markets - and each has been visible in recent weeks.",
        ],
        table: {
          caption: "How a US Fed decision reaches India, with recent dated examples",
          columns: ["Channel", "How it works", "Seen lately"],
          rows: [
            [
              "Foreign investment flows",
              "Higher US yields can make American assets relatively more attractive, so some foreign investors reduce emerging-market exposure.",
              "FPIs have withdrawn ₹48,056 crore from Indian equities so far in October 2026 (PTI, 25 October); analysts named elevated US rates as one driver.",
            ],
            [
              "The rupee",
              "A firm dollar and foreign outflows pressure the rupee; a weaker rupee raises the cost of imports such as crude oil and gold.",
              "The rupee settled at a record low of 95.22 per US dollar on 26 October 2026.",
            ],
            [
              "The RBI's room to move",
              "A wider US-India rate gap can add to rupee pressure, limiting how freely the RBI can cut or reinforcing the case to hold or hike.",
              "The RBI raised the repo rate by 25 basis points to 5.50% on 7 October 2026 and adopted a \"calibrated tightening\" stance.",
            ],
            [
              "Borrowing costs and yields",
              "Global rate expectations feed into bond yields, which sit underneath lending and borrowing costs across the economy.",
              "India's 10-year government bond yield touched 7.52% in the week ended 23 October 2026, its highest in a year.",
            ],
          ],
        },
      },
      {
        heading: "What to watch in the 28 October decision",
        paragraphs: [
          "None of this predicts what the committee will do. It tells you where the information will appear, and in what order:",
        ],
        list: [
          "The decision itself: a hike, a hold or a cut, and whether the vote stays unanimous.",
          "The inflation language: September's statement said inflation \"remains elevated\" and that the committee \"will deliver price stability\". Softening or hardening of that wording is read as a signal about the next meeting.",
          "The press conference: the Chair takes questions after the statement, and unscripted answers sometimes move markets more than the statement itself.",
          "The minutes: a fuller record of the debate arrives about three weeks later. The December meeting also brings updated economic projections.",
        ],
      },
      {
        heading: "What this does not change for you on 29 October",
        paragraphs: [
          "A Fed announcement does not change your EMI, your SIP or your deposit rate by itself. Indian loan rates respond to the RBI's repo rate and to each bank's own pricing, and domestic institutional buying can offset foreign flows - as it did on 26 October, when Indian indices closed higher even as foreign investors were net sellers. The channels above work over weeks and months, not overnight.",
        ],
      },
      {
        paragraphs: [
          "Dates and figures are as reported by the sources below, checked on 27 October 2026. This article is educational, is not investment, tax or legal advice, and does not recommend buying, selling or holding any security, fund or currency.",
        ],
      },
    ],
    sources: [
      {
        label: "Federal Reserve: 2026 FOMC meeting calendar (27-28 October meeting, 2 pm ET releases, minutes after three weeks)",
        url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
      },
      {
        label: "Federal Reserve: FOMC statement, 16 September 2026 (target range raised to 3.75-4.00%, 12-0 vote)",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
      },
      {
        label: "The Hindu (PTI), 25 October 2026: FPI October outflows and the US-rate driver",
        url: "https://www.thehindu.com/business/markets/fpis-withdraw-48056-cr-from-equities-in-october-so-far-amid-elevated-crude-oil-prices/article71622798.ece",
      },
      {
        label: "ET Now (PTI), 26 October 2026: rupee settles at record low of 95.22 per US dollar",
        url: "https://www.etnownews.com/markets/gold-prices-rise-rs-200-per-10-grams-on-global-recovery-fed-policy-in-focus-article-156409659",
      },
      {
        label: "RBI press release, 7 October 2026: repo rate raised 25 bps to 5.50%, calibrated tightening",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63742",
      },
      {
        label: "Zerodha Aftermarket Report, week ending 25 October 2026: 10-year yield at 7.52%, highest in a year",
        url: "https://aftermarketreport.zerodha.com/p/surging-oil-prices-drag-nifty-to",
      },
    ],
  },
  {
    slug: "fii-dii-flows-october-2026-explained",
    title:
      "Foreign investors pull ₹48,056 crore from Indian stocks in October 2026: what FII-DII flows mean",
    description:
      "Foreign portfolio investors have withdrawn ₹48,056 crore from Indian equities so far in October 2026, while domestic institutions kept buying. Who FIIs and DIIs are, why their flows diverge, and what the numbers can and cannot tell you.",
    category: "Investing basics",
    tags: ["FII", "DII", "FPI flows", "stock market", "mutual funds"],
    datePublished: "2026-10-26",
    status: "published",
    sections: [
      {
        paragraphs: [
          "Foreign portfolio investors (FPIs) have withdrawn ₹48,056 crore from Indian equities so far in October 2026, according to depository data reported by PTI on 25 October. That takes total FPI selling in 2026 to ₹3.08 lakh crore, already well above the ₹1.66 lakh crore withdrawn in all of 2025. The October selling follows net withdrawals of ₹35,861 crore in September; in July and August, by contrast, FPIs had invested ₹20,200 crore and ₹29,631 crore.",
          "Domestic money is moving the other way. On Monday, 26 October, foreign institutional investors (FIIs) were net sellers of ₹1,462 crore while domestic institutional investors (DIIs) were net buyers of ₹2,610 crore, provisional exchange data showed. The Sensex still closed 483 points higher at 73,607 and the Nifty gained 153 points to end at 22,753. Across the previous week's four trading sessions, FIIs net sold ₹2,697 crore while DIIs net bought ₹10,942 crore.",
        ],
      },
      {
        heading: "Who is who in this data",
        paragraphs: [
          "FIIs, also reported as FPIs, are foreign funds: overseas asset managers, pension funds and hedge funds investing in Indian markets. DIIs are Indian institutions: mutual funds, insurance companies, banks and domestic pension funds. A large share of DII buying comes through mutual funds, which collect money from retail savers, including via systematic investment plans (SIPs).",
          "Because exchanges publish this data every trading day, headlines often quote who bought or sold on a given day. The daily figure is a net number: on 26 October, FIIs bought equities worth ₹9,324.90 crore and sold ₹10,787.39 crore, and the widely quoted ₹1,462 crore is simply the difference.",
        ],
      },
      {
        heading: "Why foreign investors are selling",
        paragraphs: [
          "Analysts quoted by PTI point to several pressures at once: Brent crude surged to around $114 a barrel amid the West Asia conflict, feeding inflation and corporate-earnings worries; elevated US interest rates have kept American assets attractive; and the ₹30,213-crore Jio Platforms IPO temporarily absorbed market liquidity.",
          "There are also signs the pressure is easing. In the week ended 23 October, FPIs significantly reduced their selling and turned net buyers on two trading days. Geojit Investments' chief investment strategist V.K. Vijayakumar attributed the moderation to US 10-year bond yields easing from 5.36% to around 5%, the rupee firming to about 94.94 per dollar, and more attractive valuations, particularly in large-cap stocks.",
        ],
      },
      {
        heading: "What flow data can and cannot tell you",
        paragraphs: [
          "Flow figures are backward-looking tallies. They record who transacted, not why any single fund moved, and they say nothing about what happens next. Domestic buying cushioning foreign selling in October does not guarantee that markets must rise; it describes what has happened so far.",
          "Some analysts also caution against reading the outflows as a verdict on India. Trackk co-founder Vedant Gupte noted that foreign ownership of Indian equities was already at multi-year lows and that foreign money entering through IPOs suggests rotation between holdings rather than a broad exit. These are interpretations of the data, not forecasts.",
          "Decisions about your own investments depend on your goals, horizon and cash needs - not on a single day's or month's flow headline.",
        ],
      },
      {
        heading: "If you invest through a SIP",
        paragraphs: [
          "If you invest monthly through a SIP, your instalments form part of the domestic flow described above. The Fistotex SIP calculator shows the arithmetic of a fixed monthly instalment under different assumed returns, including lower and negative ones.",
        ],
      },
      {
        paragraphs: [
          "Market and flow figures are as reported on 25 and 26 October 2026. This article is educational, is not investment, tax or legal advice, and does not recommend buying, selling or holding any security or fund.",
        ],
      },
    ],
    sources: [
      {
        label: "The Hindu (PTI), 25 October 2026: FPIs withdraw ₹48,056 crore in October; 2026 outflows reach ₹3.08 lakh crore",
        url: "https://www.thehindu.com/business/markets/fpis-withdraw-48056-cr-from-equities-in-october-so-far-amid-elevated-crude-oil-prices/article71622798.ece",
      },
      {
        label: "CNBC-TV18, 26 October 2026: FIIs net sell ₹1,462 crore, DIIs net buy ₹2,610 crore; Sensex 73,607, Nifty 22,753",
        url: "https://www.cnbctv18.com/market/fiis-sell-rs1462-crore-diis-buy-rs2610-crore-as-market-ends-higher-20019660.htm",
      },
    ],
  },
  {
    slug: "gold-price-rise-october-2026-rupee-explained",
    title:
      "Gold costs ₹1,46,300 per 10 grams: why Indian gold prices rise even when global prices stall",
    description:
      "Gold in Delhi was priced at ₹1,46,300 per 10 grams on 26 October 2026 while international prices hovered near a three-month low. How the rupee's record low, import costs and US rate expectations combine to set the price you pay in India.",
    category: "Money basics",
    tags: ["gold price", "gold rate", "rupee", "US dollar", "inflation"],
    datePublished: "2026-10-26",
    status: "published",
    sections: [
      {
        paragraphs: [
          "Gold prices in India rose again on Monday, 26 October 2026. In Delhi, 99.9% pure gold was priced at ₹1,46,300 per 10 grams, up ₹200 from Friday's ₹1,46,100, according to local traders quoted by PTI. Silver was unchanged at ₹2,02,000 per kilogram after three consecutive sessions of losses.",
          "The international picture looks different. Spot gold traded around $4,013 an ounce on Monday, up 0.44% on the day, yet it has been hovering close to a more than three-month low. If the world price is near a three-month low, why is the Indian buyer still paying more?",
        ],
      },
      {
        heading: "How the price you pay in India is built",
        paragraphs: [
          "The gold rate quoted in India starts from the international dollar price. That price is converted into rupees at the current exchange rate, and import duty, taxes such as GST and local premiums are added on top. Quoted rates then differ slightly by city: on 26 October, one city-wise compilation showed 24-carat gold at ₹13,844 per gram in Delhi and ₹13,739 per gram in Chennai, before any jeweller's making charges.",
          "So two separate things can move your local price: the world price of gold and the rupee-dollar exchange rate. Even when the world price is flat, a weaker rupee makes every imported gram costlier.",
        ],
      },
      {
        heading: "The rupee's record low is doing the lifting right now",
        paragraphs: [
          "On 26 October the rupee settled at a record low of 95.22 against the US dollar, down 29 paise in its third consecutive session of losses. Because India imports most of its gold, a weaker rupee raises the landed cost of gold and supports domestic prices even when the international market is quiet.",
        ],
      },
      {
        heading: "What global markets are watching this week",
        paragraphs: [
          "Traders quoted by PTI and ET Now point to the US Federal Reserve's interest-rate decision later this week and US inflation data due on Thursday as the next drivers for bullion. Expectations of further US rate hikes generally pressure gold, because higher yields raise the cost of holding a metal that pays no interest. Diplomatic moves around the US-Iran conflict are also shifting sentiment from day to day.",
        ],
      },
      {
        heading: "If you are planning to buy gold",
        paragraphs: [
          "Whatever direction prices take, the quoted rate is not the full cost. Jewellery carries making charges and GST, and the gap between buying and selling rates means you rarely resell at the quoted price. Comparing the total cost of coins, bars and jewellery - not the headline rate alone - gives a clearer picture of what a purchase actually costs.",
        ],
      },
      {
        paragraphs: [
          "Prices are as reported on 26 October 2026 and vary by city, purity and seller. This article is educational, is not investment, tax or legal advice, and does not recommend buying, selling or holding gold or any other asset.",
        ],
      },
    ],
    sources: [
      {
        label: "ET Now (PTI), 26 October 2026: gold rises ₹200 to ₹1,46,300 per 10 grams in Delhi; rupee at record low of 95.22",
        url: "https://www.etnownews.com/markets/gold-prices-rise-rs-200-per-10-grams-on-global-recovery-fed-policy-in-focus-article-156409659",
      },
      {
        label: "The Hindu BusinessLine, 26 October 2026: city-wise 22 and 24 carat gold rates",
        url: "https://www.thehindubusinessline.com/gold-rate-today/gold-price-today-in-delhi-mumbai-kolkata-chennai-bengaluru-hyderabad-pune-gold-rates-metro-cities-october-26-2026/article71626053.ece",
      },
    ],
  },
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
          "Indian equity markets have fallen sharply in the second half of October 2026. In the week ending 23 October, the Nifty 50 fell 2.36% to close at 22,600 - about 14% below its 2026 peak. Roughly ₹16 lakh crore of market value was wiped out in that single week, and midcap stocks lost 5.6%, their worst week in 20 months. 748 stocks on the NSE hit fresh 52-week lows against just 102 new highs, and the volatility index (India VIX) rose to 16.86, its highest since May.",
          "The immediate driver is crude oil: Brent surged to about $114 a barrel during the week as the West Asia conflict re-escalated, feeding inflation and interest-rate worries. The rupee traded near ₹94.93 per US dollar, and the 10-year government bond yield rose to 7.52%, its highest in a year.",
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
