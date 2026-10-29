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
  "slug": "trent-q2-fy27-results-standalone-consolidated-pat-explained",
  "title": "Trent Q2 FY27 results: why PAT can be ₹490 crore, ₹468 crore or ₹464 crore",
  "description": "Trent's 29 October 2026 results show three different profit figures. A source-based guide to standalone PAT, consolidated group profit, owners' profit and bonus-adjusted EPS.",
  "category": "Results explained",
  "tags": [
    "Trent",
    "Q2 FY27 results",
    "consolidated results",
    "PAT",
    "earnings per share"
  ],
  "datePublished": "2026-10-29",
  "status": "published",
  "sections": [
    {
      "paragraphs": [
        "Trent released its results for the quarter ended 30 September 2026 on 29 October. Its standalone net profit was ₹489.65 crore, consolidated profit for the period was ₹468.09 crore, and consolidated profit attributable to equity holders was ₹463.77 crore. Rounded to the nearest crore, those are ₹490 crore, ₹468 crore and ₹464 crore. They are different lines in the same filing, not interchangeable answers to one question.",
        "The useful first step is to read the reporting basis beside a profit number. Then keep that basis unchanged when comparing it with a year earlier. This explainer uses the company's unaudited financial statements and its separate results press release, not estimates or a forecast of the share price."
      ]
    },
    {
      "heading": "Three profit figures, three reporting labels",
      "paragraphs": [
        "On the standalone statement, PAT increased from ₹450.77 crore to ₹489.65 crore, or 8.63% year on year. On the consolidated statement, total group PAT increased from ₹373.42 crore to ₹468.09 crore, or 25.35%. The profit attributable to the company's equity holders increased from ₹376.86 crore to ₹463.77 crore, or 23.06%.",
        "These percentages use (current quarter ÷ year-ago quarter − 1) × 100, rounded to two decimal places. The company's press release rounds standalone PAT growth to 9% and consolidated total-PAT growth to 25%. Those rounded percentages can both be consistent with the financial statements."
      ],
      "table": {
        "caption": "Quarter ended 30 September: ₹ crore, except growth",
        "columns": [
          "Profit line",
          "2026",
          "2025",
          "YoY change"
        ],
        "rows": [
          [
            "Standalone PAT",
            "489.65",
            "450.77",
            "+8.63%"
          ],
          [
            "Consolidated total PAT",
            "468.09",
            "373.42",
            "+25.35%"
          ],
          [
            "Consolidated equity-holders' PAT",
            "463.77",
            "376.86",
            "+23.06%"
          ],
          [
            "Non-controlling interests' profit/(loss)",
            "4.32",
            "(3.44)",
            "No growth % shown"
          ]
        ]
      }
    },
    {
      "heading": "Why group profit is not all attributable to the parent's shareholders",
      "paragraphs": [
        "The consolidated statement explicitly splits profit between equity holders of the company and non-controlling interests. For this quarter, ₹463.77 crore plus ₹4.32 crore equals ₹468.09 crore. A year earlier, ₹376.86 crore plus a ₹3.44 crore non-controlling loss equals ₹373.42 crore.",
        "That sign change matters. Comparing current total group profit with last year's equity-holders' profit would mix two bases. Our results card uses the equity-holders' line consistently; the press release's consolidated PAT summary uses total group profit."
      ]
    },
    {
      "heading": "Consolidated revenue does not mean every business's sales are added",
      "paragraphs": [
        "Trent reported standalone revenue from operations of ₹5,787.64 crore versus ₹4,724.06 crore, up 22.51%. Consolidated revenue was ₹5,873.14 crore versus ₹4,817.60 crore, up 21.91%. The press release rounds those growth rates to 23% and 22%, respectively.",
        "The company also explains a boundary in its consolidated numbers: revenue of the Trent Hypermarket business is not included in consolidated revenue. Its proportionate profitability is accounted for using the equity method. A reference to the wider retail portfolio therefore does not mean every business's sales appear line by line in reported revenue.",
        "The consolidated statement records an aggregate ₹21.06 crore share of associate/joint-venture losses for the quarter, compared with ₹1.10 crore a year earlier. That aggregate line should not be assigned entirely to one venture without a supporting breakdown."
      ]
    },
    {
      "heading": "The bonus issue changes the EPS comparison basis",
      "paragraphs": [
        "Consolidated basic EPS was ₹8.70, compared with ₹7.07 a year earlier and ₹9.73 in the June 2026 quarter. Note 5 to the consolidated results says Trent issued one bonus share for every two shares held during the half year and adjusted EPS for all reporting periods presented.",
        "Use those adjusted comparison figures rather than an older, unadjusted EPS value. The quarter's EPS is marked not annualised. Multiplying it by four would be a reader's extrapolation, not a company forecast of full-year earnings. Standalone basic EPS is a different series: ₹9.18 for this quarter versus ₹8.45 a year earlier."
      ]
    },
    {
      "heading": "Read the comparison notes before calling growth recurring",
      "paragraphs": [
        "The press release says prior-year standalone other income included ₹96 crore of pre-tax profit on asset sales in Q2 FY26, while the corresponding profit in Q2 FY27 was not material. That is relevant context for the 8.63% reported standalone PAT increase, but subtracting a pre-tax gain directly from after-tax profit would not produce a reliable adjusted PAT.",
        "The consolidated statement also shows different tax effects across quarters. Total tax expense was ₹150.97 crore this quarter versus ₹103.56 crore a year earlier; deferred-tax credits were ₹11.10 crore and ₹32.66 crore, respectively. This article does not estimate a tax-normalised or recurring profit.",
        "The takeaway is a reading method: identify standalone or consolidated, distinguish total profit from the equity-holders' share, use the same period and basis, and check the EPS and other-income notes. None of these figures alone establishes cash generation, valuation or a reason to buy or sell Trent shares."
      ]
    },
    {
      "paragraphs": [
        "Amounts and notes were checked against the 29 October 2026 filings. Statement references: standalone pages 3-4, consolidated pages 10-11 and consolidated notes page 14. The press release's rounded tables are on pages 2-3. This is an educational explanation, not investment, tax or legal advice."
      ]
    }
  ],
  "sources": [
    {
      "label": "Trent, 29 October 2026: unaudited standalone and consolidated results with limited-review reports",
      "url": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/b962e91a-b409-4f5f-a22f-3275c992153a.pdf"
    },
    {
      "label": "Trent, 29 October 2026: Q2 and H1 FY27 results press release",
      "url": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/984d68e3-738c-43cf-afd1-756b33f60610.pdf"
    }
  ]
},
  {
    slug: "fed-holds-rates-october-2026-fomc-india",
    title:
      "US Fed holds rates at 3.75-4%: the October 2026 FOMC decision explained for India",
    description:
      "On 28 October 2026 the US Federal Reserve kept the federal funds rate at 3.75% to 4.00%, a month after raising it. Two committee members dissented in favour of another hike. What the decision, the split vote and the statement's language mean for Indian markets.",
    category: "Investing basics",
    tags: ["US Fed", "FOMC", "federal funds rate", "interest rates", "Indian markets"],
    datePublished: "2026-10-29",
    status: "published",
    sections: [
      {
        paragraphs: [
          "The US Federal Reserve's rate-setting committee, the Federal Open Market Committee (FOMC), kept its benchmark interest rate unchanged at its meeting on 27-28 October 2026. The target range for the federal funds rate stays at 3.75% to 4.00%, where the committee placed it with a 25 basis point increase on 16 September 2026. The decision was released at 2:00 pm US Eastern time on 28 October, which is 11:30 pm in India.",
          "The vote was 10 in favour and 2 against. The two dissenters, Fed Governor Lisa Cook and Cleveland Fed President Beth Hammack, wanted to raise the target range by a further quarter percentage point at this meeting instead of waiting.",
        ],
      },
      {
        heading: "A 10-2 vote: two members wanted another hike now",
        paragraphs: [
          "Twelve officials vote on each FOMC decision when the committee is fully staffed: the seven members of the Board of Governors, the president of the Federal Reserve Bank of New York, and four of the other eleven regional reserve bank presidents, who vote in rotation.",
          "A dissent in favour of tighter policy is called hawkish. Two hawkish dissents against a decision to hold tell readers that the live debate inside the committee is not whether to cut rates, but whether one more increase is needed to bring inflation back to the 2 percent goal. The majority chose to wait: the statement says the accumulation of more information will help the committee judge the stance needed for a timely return of inflation to target, and it commits to no specific next move.",
        ],
      },
      {
        heading: "What the Fed sees in the US economy",
        paragraphs: [
          "The October statement describes economic activity as expanding at a strong pace; September's statement had said a solid pace. It notes resilient domestic spending, strong productivity growth and robust capital investment, with job gains keeping pace with the workforce and the unemployment rate little changed. On prices, the committee repeats that inflation remains elevated, and it closes with a promise: the committee will deliver price stability.",
          "The accompanying implementation note sets the rates that sit around the target range, summarised in the table below.",
        ],
        table: {
          caption: "The 28 October 2026 FOMC decision at a glance",
          columns: ["Item", "Decision", "Detail"],
          rows: [
            ["Federal funds target range", "3.75% to 4.00%, unchanged", "Set on 16 September 2026 with a 25 bps increase, approved 12-0"],
            ["Vote this meeting", "10 in favour, 2 against", "Lisa Cook and Beth Hammack preferred a 25 bps hike at this meeting"],
            ["Interest on reserve balances", "3.90%", "Effective 29 October 2026"],
            ["Overnight reverse repo rate", "3.75%", "Per-counterparty limit of $160 billion per day"],
            ["Standing repo operations", "4.00%", "Standing overnight facility"],
            ["Primary credit (discount window) rate", "4.00%", "Unchanged, approved unanimously"],
            ["Balance sheet", "Treasury bill purchases continue", "To keep reserves ample; maturing Treasuries rolled over and agency MBS principal reinvested into T-bills"],
          ],
        },
      },
      {
        heading: "What the decision means for India",
        paragraphs: [
          "Nothing in the Fed's statement changes an Indian bank account, loan EMI or mutual fund NAV by itself. The Fed reaches India through four broad channels, set out in our preview of this meeting: foreign investor flows, the rupee, the RBI's own policy room, and exporters' earnings.",
          "The rate gap between the two central banks is now easy to state in numbers. The RBI's repo rate is 5.50% after its 7 October 2026 increase, while the top of the Fed's range is 4.00%: a difference of 1.5 percentage points. That gap is one of the inputs global investors weigh when they compare rupee assets with dollar assets.",
          "On flows: while US rates stay high, dollar deposits and bonds remain competitive, which can temper foreign portfolio flows into Indian equities and debt. If and when the Fed eventually eases, that pressure typically relaxes. The October statement gives no date for any such move, and two of its members publicly wanted to move in the opposite direction at this meeting.",
          "On the rupee: a firm US rate backdrop generally supports the dollar, and a stronger dollar tends to weigh on the rupee. A weaker rupee makes dollar-priced imports such as crude oil costlier, while exporters' dollar revenues convert into more rupees.",
          "For the RBI, a Fed that is holding rather than cutting keeps the external argument for caution in place, but Indian rate decisions are driven mainly by domestic inflation and growth data. It is worth noting that both central banks tightened at their previous meetings: the Fed raised in mid-September and the RBI raised on 7 October.",
          "These are transmission channels, not forecasts. What actually happens to flows, the rupee or Indian interest rates depends on data and decisions that are still to come.",
        ],
      },
      {
        paragraphs: [
          "This article is based on the Federal Reserve's statement and implementation note of 28 October 2026 and the sources listed below. It is educational, is not investment, tax or legal advice, and does not recommend buying, selling or holding any security or currency position.",
        ],
      },
    ],
    sources: [
      {
        label: "Federal Reserve: FOMC statement, 28 October 2026 (decision to hold at 3.75% to 4.00%, 10-2 vote, statement language on the economy and inflation)",
        url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm",
      },
      {
        label: "Federal Reserve: FOMC statement and implementation note, 28 October 2026, PDF (reserve balance rate 3.90%, reverse repo 3.75% with $160 billion per-counterparty limit, standing repo 4.00%, primary credit rate 4.00%, balance sheet directives)",
        url: "https://www.federalreserve.gov/monetarypolicy/files/monetary20261028a1.pdf",
      },
      {
        label: "Federal Reserve: FOMC statement, 16 September 2026, PDF (25 bps increase to 3.75% to 4.00%, approved 12-0, economic activity described as a solid pace)",
        url: "https://www.federalreserve.gov/monetarypolicy/files/monetary20260916a1.pdf",
      },
      {
        label: "RBI press release, 7 October 2026: Monetary Policy Committee raises policy repo rate by 25 bps to 5.50%",
        url: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=63742",
      },
    ],
  },
  {
    slug: "vedanta-q2-fy27-results-profit-loss-explained",
    title:
      "Vedanta Q2 FY27: record profit or a ₹170 crore loss? Reading one filing three ways",
    description:
      "Vedanta's 28 October 2026 results produced three headline numbers: ₹6,202 crore of record profit, ₹3,650 crore attributable to shareholders, and a ₹170 crore standalone loss. All three come from the same filing, on different bases, after the group's May 2026 demerger. Here is how to read them.",
    category: "Investing basics",
    tags: ["Q2 results", "Vedanta", "earnings", "demerger", "metals"],
    datePublished: "2026-10-28",
    status: "published",
    sections: [
      {
        paragraphs: [
          "Vedanta Limited declared its results for the second quarter of FY27 (the three months ended 30 September 2026) on Wednesday, 28 October 2026. The board meeting ran from 1:00 pm to 2:00 pm IST, and the unaudited consolidated and standalone results were filed with the exchanges the same afternoon.",
          "Coverage of the numbers looked contradictory: some outlets reported a record quarterly profit, others a sharp sequential fall, and at least one headline reported a loss of ₹170 crore. Every one of those figures is in the same exchange filing. They differ because each describes a different measure: group profit from the businesses Vedanta still owns, the share of group profit that belongs to Vedanta's own shareholders, and the parent company on its own.",
        ],
        table: {
          caption: "Vedanta Q2 FY27: the headline numbers, each on its stated basis",
          columns: ["Number", "What it actually is", "Where it appears in the filing"],
          rows: [
            ["₹25,812 crore", "Consolidated revenue for Q2 FY27, up 57% from ₹16,445 crore a year earlier", "Consolidated results, line 1a"],
            ["₹9,938 crore", "Consolidated EBITDA, up 106% YoY; the filing itself labels EBITDA a non-GAAP measure", "Consolidated segment note"],
            ["₹6,202 crore", "Consolidated net profit from continuing operations, up 151% YoY and 17% QoQ; Vedanta calls it a record quarter", "Consolidated results, line 10"],
            ["₹3,650 crore", "Profit attributable to Vedanta's own shareholders, after ₹2,552 crore went to non-controlling interests; up 103% YoY, down about a third from Q1", "Consolidated results, line 19"],
            ["-₹170 crore", "Standalone net loss of the parent company, Vedanta Limited on its own", "Standalone results, line 13"],
            ["₹5 per share", "First interim dividend for FY27, approved by the board on 8 October 2026", "Standalone results, note 2"],
          ],
        },
      },
      {
        heading: "Why one company has so many profit numbers this quarter",
        paragraphs: [
          "Vedanta completed a major demerger with effect from 1 May 2026. The oil and gas business moved into Vedanta Oil & Gas Limited, and the aluminium, iron ore and power undertakings were separated under the NCLT-approved scheme. In the filing, those businesses appear as discontinued operations for the periods they were still inside the group. Q2 FY27 is the first quarter in which the consolidated numbers cover only the continuing businesses: zinc, lead and silver (largely Hindustan Zinc), Zinc International, copper, and a few smaller operations.",
          "That change of perimeter breaks simple quarter-on-quarter comparisons. Q1 FY27 still included the demerged businesses as discontinued operations, so its attributable profit of ₹5,473 crore is not like-for-like against Q2's ₹3,650 crore: part of the Q1 figure came from businesses Vedanta no longer owns. On a like-for-like basis, continuing-operations profit actually rose 17% quarter on quarter, and compared with a year ago attributable profit is up 103% from ₹1,798 crore.",
          "One more basis worth knowing: the 60% EBITDA margin in Vedanta's press release excludes the copper business, as the company's own footnote states.",
        ],
      },
      {
        heading: "So where does a ₹170 crore loss come from?",
        paragraphs: [
          "The standalone statement covers the parent company alone. After the demerger, its continuing business is mainly copper. This quarter the parent's revenue from operations was ₹8,750 crore while the cost of materials consumed was ₹8,273 crore; after other expenses, finance costs and a small tax credit, the standalone books closed at a net loss of ₹170 crore.",
          "Copper's thin economics are visible at group level too: the consolidated copper segment earned ₹80 crore of EBITDA on ₹9,280 crore of revenue this quarter. The group's profit engine is zinc and silver: the zinc, lead and silver segment contributed ₹9,243 crore of the ₹9,938 crore total segment EBITDA from continuing operations.",
          "Standalone results also swing with dividends received from subsidiaries. Note 5 to the standalone results shows dividend income from subsidiaries of nil in Q2 FY27, against ₹2,822 crore in Q1 FY27 - a large reason the parent showed a standalone profit of ₹2,538 crore last quarter and a loss this quarter. A standalone loss does not mean the group lost money.",
        ],
      },
      {
        heading: "Which number should a reader use?",
        paragraphs: [
          "For the performance of the group as a whole, the cleanest measure is the consolidated profit from continuing operations: ₹6,202 crore. For what actually belongs to Vedanta's shareholders, use the attributable figure of ₹3,650 crore, because subsidiaries such as Hindustan Zinc have large outside shareholdings - non-controlling interests absorbed ₹2,552 crore of this quarter's profit. On a per-share basis, the filing reports basic earnings of ₹9.35 from continuing operations.",
          "The standalone loss matters mainly for the parent company's own accounts, not as a read on the group. One balance-sheet line also stood out this quarter: net debt fell by ₹4,624 crore to ₹3,675 crore, and the company states its net debt to EBITDA ratio improved to 0.1 times, its own basis of calculation.",
        ],
      },
      {
        paragraphs: [
          "All figures above are from Vedanta's exchange filings dated 28 October 2026, listed in the sources below. This article is educational, is not investment, tax or legal advice, and does not recommend buying, selling or holding any security.",
        ],
      },
    ],
    sources: [
      {
        label: "Vedanta Limited: unaudited consolidated and standalone financial results for the quarter and half year ended 30 September 2026, with limited review report, filed with the exchanges on 28 October 2026",
        url: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/afd6cd7a-6049-4bce-9471-d3c394fcfeb7.pdf",
      },
      {
        label: "Vedanta Limited: press release and investor presentation on Q2 FY27 results, filed with the exchanges on 28 October 2026 (record-quarter claims, net debt reduction, EBITDA margin basis footnotes)",
        url: "https://nsearchives.nseindia.com/corporate/VEDL_28102026141343_2VEDLSEIntimationOutcomeOfBMPressReleaseAndIRPPTfinalsigned.pdf",
      },
    ],
  },
  {
    slug: "jio-platforms-ipo-listing-day-october-2026",
    title:
      "Jio Platforms lists on the stock market today: how an IPO listing day actually works",
    description:
      "Jio Platforms debuts on the NSE and BSE on 28 October 2026 after an IPO of about ₹30,188 crore subscribed 22 times. What happens between the 9 am pre-open session and the 10 am listing, and how to read listing-day numbers like subscription multiples and grey market premium.",
    category: "Investing basics",
    tags: ["IPO", "Jio Platforms", "listing day", "NSE", "BSE"],
    datePublished: "2026-10-28",
    status: "published",
    sections: [
      {
        paragraphs: [
          "Jio Platforms, the digital and telecom arm of Reliance Industries, is scheduled to make its stock market debut on the NSE and BSE on Wednesday, 28 October 2026. The company's initial public offering, about ₹30,188 crore per the final prospectus, was priced at ₹1,119 per share, the top of its ₹1,065-1,119 band, and was subscribed 22.19 times overall, according to NSE data reported by NDTV Profit.",
          "The issue ran on a tight timetable: bidding was open from 21 to 23 October, allotments were finalised on 26 October, and listing follows two days later. The offer consisted entirely of a fresh issue of 27 crore shares, with no offer-for-sale component; the company plans to use up to ₹27,500 crore of the proceeds to prepay, in full or in part, borrowings of its subsidiary Reliance Jio Infocomm, as the prospectus sets out.",
          "A note on the headline size: many reports call this a ₹30,213-crore IPO, which is simply 27 crore shares multiplied by the ₹1,119 headline price. The prospectus's own aggregate is lower - ₹301,876 million, about ₹30,188 crore - because 46,94,835 shares in the employee reservation were priced at a ₹54-per-share discount (₹1,065 each). Both figures describe the same issue on different bases.",
        ],
        table: {
          caption: "Jio Platforms IPO in numbers, as reported ahead of the 28 October 2026 listing",
          columns: ["Item", "Figure"],
          rows: [
            ["Issue size", "₹301,876 million (about ₹30,188 crore), per the final prospectus"],
            ["Price band and final price", "₹1,065-1,119 per share; final price ₹1,119"],
            ["Lot size", "12 shares (about ₹13,428 per lot at the top of the band)"],
            ["Shares offered", "27 crore fresh shares; no offer-for-sale"],
            ["Employee reservation", "46,94,835 shares at ₹1,065 each, a ₹54-per-share discount"],
            ["Overall subscription", "22.19 times (bids for 438.26 crore shares against about 19.75 crore offered to non-anchor bidders, NSE data)"],
            ["QIB / NII / retail subscription", "70.55 times / 14 times / 2.72 times"],
            ["Bidding window", "21-23 October 2026"],
            ["Allotment finalised", "26 October 2026"],
            ["Listing", "28 October 2026, NSE and BSE, regular trading from 10 am"],
          ],
        },
      },
      {
        heading: "What actually happens on listing morning",
        paragraphs: [
          "A new stock does not simply appear at a price at 9:15 am. According to the IPO timetable reported by Mint, listing day for Jio Platforms runs through a special pre-open session from 9:00 to 9:45 am, during which investors can enter, modify or cancel orders. Between 9:45 and 9:55 am the exchange matches those orders and determines a single opening price - the listing price - at which the maximum number of shares changes hands. Regular trading then begins at 10:00 am.",
          "That opening print is the first price set by public buyers and sellers rather than by the company and its bankers. Everything said about the stock's value before 9:45 am is expectation; the listing price is the first traded reality.",
        ],
      },
      {
        heading: "The numbers you will hear today, decoded",
        paragraphs: [
          "Listing gain or loss: simply the difference between the listing price and the issue price of ₹1,119, expressed as a percentage. A listing at ₹1,300 would be a 16.2% gain; a listing at ₹1,000 would be a 10.6% loss. Neither says anything about where the price goes next.",
          "Subscription multiples: the 22.19-times figure means total bids were about 22 times the shares on offer. Note the base: about 19.75 crore shares were on offer to ordinary bidders, not the full 27 crore issued, because 7.25 crore shares were allotted to anchor investors before the public issue opened, as the final prospectus sets out. The multiple measures demand during the IPO, not quality, and it does not survive listing day as a meaningful signal. For retail applicants the practical consequence was allotment scarcity: with the retail portion subscribed 2.72 times, many applicants received no shares at all.",
          "Grey market premium (GMP): in the days before a big listing, unofficial markets quote a premium over the issue price - for Jio Platforms, about ₹244 per share on 27 October, according to IPO tracking websites cited by Mint. GMP is informal, unregulated and frequently wrong in both directions; Mint's own report cautions that the actual listing price can differ significantly from GMP-derived estimates. Treat it as gossip with a number attached, not as data.",
        ],
      },
      {
        heading: "If you applied - and if you did not",
        paragraphs: [
          "Allotted shares must be in your demat account before you can sell them; credit typically happens the day before listing. From the time regular trading begins, an allottee can sell at the market price, hold, or buy more - and a non-allottee can buy at the same market price. There is no structural advantage either way once the stock is listed; everyone faces the same live price.",
          "What listing day does not answer is whether the stock is worth its price. That depends on the company's earnings, valuation and your own goals, none of which the opening print can settle.",
        ],
      },
      {
        paragraphs: [
          "Figures are as reported on 27-28 October 2026 by the sources below. This article is educational, is not investment, tax or legal advice, and does not recommend applying for, buying, selling or holding any security.",
        ],
      },
    ],
    sources: [
      {
        label: "NDTV Profit, 28 October 2026: Jio Platforms debuts on NSE and BSE today; ₹1,119 final price; issue subscribed 22.19 times (NSE data)",
        url: "https://www.ndtvprofit.com/markets/jio-platforms-ipo-listing-live-updates-jio-share-price-debut-on-nse-bse-today-gmp-listing-gains-12245930",
      },
      {
        label: "Mint, 27 October 2026: listing timetable (pre-open 9:00-9:45 am, trading from 10 am), GMP ₹244 with unofficial-status caveat, issue structure and proceeds use",
        url: "https://www.livemint.com/market/ipo/jio-platforms-ipo-listing-date-and-time-share-price-prediction-expected-gains-latest-gmp-all-eyes-on-nse-bse-debut-11793071293037.html",
      },
      {
        label: "Jio Platforms final prospectus, dated 24 October 2026: 27 crore equity shares at ₹1,119 aggregating ₹301,876 million; anchor investor portion 7.25 crore shares; employee reservation 46,94,835 shares at ₹54 discount; up to ₹27,500 crore of net proceeds to prepay RJIL borrowings",
        url: "https://myjiostatic.cdn.jio.com/cms/assets/iv3/Prospectus.pdf",
      },
    ],
  },
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
          "The US Federal Reserve's rate-setting body, the Federal Open Market Committee (FOMC), meets on 27 and 28 October 2026. The Fed's own calendar lists the statement at 2 pm US Eastern Time on 28 October - about 11:30 pm in India - followed by the Chair's press conference at 2:30 pm. The committee holds eight scheduled meetings a year; after this one, the next is on 8-9 December 2026.",
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
          "The press conference at 2:30 pm ET: the Chair takes questions after the statement, and unscripted answers sometimes move markets more than the statement itself.",
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
        label: "Federal Reserve: October 2026 calendar (statement 2:00 pm ET and press conference 2:30 pm ET on 28 October)",
        url: "https://www.federalreserve.gov/newsevents/2026-october.htm",
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
