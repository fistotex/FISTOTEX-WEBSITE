export type ResultFigureRow = {
  label: string;
  /** Current quarter value, as printed in the filing or computed per the entry notes. */
  current: string;
  /** Same quarter last year, with the computed change where verified. */
  yoy?: string;
  /** Previous quarter, with the computed change where verified. */
  qoq?: string;
  note?: string;
};

export type ResultsFiguresEntry = {
  company: string;
  quarterLabel: string;
  periodEnded: string;
  basis: string;
  currencyUnit: string;
  rows: ResultFigureRow[];
  /** Short original summary written by Fistotex from the filing, not copied from any coverage. */
  summary: string;
  /** Basis and definition notes. Anything that does not fit a clean template is flagged here, never guessed. */
  caveats: string[];
  /** The exact exchange filing the figures were read from. */
  sourceUrl: string;
  sourceName: string;
  /** When the exchange disseminated the filing, from the exchange's own announcements page. */
  sourceDisseminatedAt: string;
  /** When Fistotex read the filing and checked the figures on this page against it. */
  verifiedAt: string;
};

export const RESULTS_FIGURES_REVIEWED_ON = "29 Oct 2026";

// Figures are added one company at a time, only after we download and read the
// official exchange filing linked in the entry. Computed measures (EBITDA,
// margins, percentage changes) show their definition in the caveats. Banks,
// insurers and companies whose results include exceptional or discontinued
// items are summarised on their stated basis, or left out until they can be.
export const RESULTS_FIGURES: ResultsFiguresEntry[] = [
{
  "company": "APAR Industries",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited Ind AS",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "6931.19",
      "yoy": "5715.42 (+21.27%)",
      "qoq": "6591.06 (+5.16%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "720.79",
      "yoy": "465.09 (+54.98%)",
      "qoq": "757.57 (-4.85%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "10.40%",
      "yoy": "8.14%",
      "qoq": "11.49%"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "447.32",
      "yoy": "251.70 (+77.72%)",
      "qoq": "467.45 (-4.31%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "110.10",
      "yoy": "62.66 (+75.71%)",
      "qoq": "116.37 (-5.39%)"
    }
  ],
  "summary": "APAR Industries's September-quarter revenue rose 21.27% year on year to ₹6931.19 crore. Net profit was ₹447.32 crore, up 77.72% from a year earlier. The defined operating EBITDA margin was 10.40%, compared with 8.14% a year earlier.",
  "caveats": [
    "Source: consolidated statement, PDF page 3. Statement monetary values are ₹ crore; EPS remains ₹ per share and is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use original source values before display rounding; EPS changes use reported rounded EPS.",
    "EBITDA is computed as profit before tax plus finance cost plus depreciation and amortisation minus other income. Margin is that measure divided by revenue from operations. This is our defined operating measure, not a copied channel figure.",
    "Detected through RSS, then separately read and checked against the official filing. This selected summary is not unattended automatic publication or complete market coverage. Raw RSS publication time has no supplied timezone suffix.",
    "The company's press release uses a different EBITDA measure: post open-period forex, about ₹787 crore and 11.4%. Our ₹720.79 crore/10.40% excludes other income under the definition above; these measures must not be mixed."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/f99ee437-60bb-453d-a742-5900973eee21.pdf",
  "sourceName": "BSE consolidated statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 13:52:13 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Shadowfax Technologies",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited Ind AS",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "1537.70",
      "yoy": "982.11 (+56.57%)",
      "qoq": "1358.12 (+13.22%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "103.79",
      "yoy": "39.15 (+165.11%)",
      "qoq": "91.77 (+13.10%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "6.75%",
      "yoy": "3.99%",
      "qoq": "6.76%"
    },
    {
      "label": "Net profit",
      "current": "67.95",
      "yoy": "13.02 (+421.89%)",
      "qoq": "65.40 (+3.90%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "1.16",
      "yoy": "0.26 (+346.15%)",
      "qoq": "1.11 (+4.50%)"
    }
  ],
  "summary": "Shadowfax Technologies's September-quarter revenue rose 56.57% year on year to ₹1537.70 crore. Net profit was ₹67.95 crore, up 421.89% from a year earlier. The defined operating EBITDA margin was 6.75%, compared with 3.99% a year earlier.",
  "caveats": [
    "Source: consolidated statement, PDF page 4. Statement monetary values are ₹ crore; EPS remains ₹ per share and is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use original source values before display rounding; EPS changes use reported rounded EPS.",
    "EBITDA is computed as profit before tax plus finance cost plus depreciation and amortisation minus other income. Margin is that measure divided by revenue from operations. This is our defined operating measure, not a copied channel figure.",
    "Detected through RSS, then separately read and checked against the official filing. This selected summary is not unattended automatic publication or complete market coverage. Raw RSS publication time has no supplied timezone suffix.",
    "September 2025 quarter figures were approved by the board but were not reviewed by the statutory auditors, per note 4. Criticalog became wholly owned during the June 2026 quarter, per note 5; PAT here is the statement profit for the period, not a separately disclosed owners-attribution row."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/8a5f89ba-20c9-41f2-8550-664d5d302e61.pdf",
  "sourceName": "BSE consolidated statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 13:47:05 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Sambhv Steel Tubes",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited Ind AS",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "835.99",
      "yoy": "580.17 (+44.09%)",
      "qoq": "732.17 (+14.18%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "100.99",
      "yoy": "60.24 (+67.66%)",
      "qoq": "95.14 (+6.15%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "12.08%",
      "yoy": "10.38%",
      "qoq": "12.99%"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "60.95",
      "yoy": "30.60 (+99.17%)",
      "qoq": "56.52 (+7.83%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "2.07",
      "yoy": "1.04 (+99.04%)",
      "qoq": "1.92 (+7.81%)"
    }
  ],
  "summary": "Sambhv Steel Tubes's September-quarter revenue rose 44.09% year on year to ₹835.99 crore. Net profit was ₹60.95 crore, up 99.17% from a year earlier. The defined operating EBITDA margin was 12.08%, compared with 10.38% a year earlier.",
  "caveats": [
    "Source: consolidated statement, PDF page 8. Original ₹ million values converted to ₹ crore by dividing by 10; EPS remains ₹ per share and is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use original source values before display rounding; EPS changes use reported rounded EPS.",
    "EBITDA is computed as profit before tax plus finance cost plus depreciation and amortisation minus other income. Margin is that measure divided by revenue from operations. This is our defined operating measure, not a copied channel figure.",
    "Detected through RSS, then separately read and checked against the official filing. This selected summary is not unattended automatic publication or complete market coverage. Raw RSS publication time has no supplied timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/e3c4bbd4-a39a-4a9c-9bff-2b9cb3cc34cc.pdf",
  "sourceName": "BSE consolidated statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 13:39:43 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
  {
    company: "Vaibhav Global",
    quarterLabel: "Q2 FY2027",
    periodEnded: "30 Sep 2026",
    basis: "Consolidated, unaudited Ind AS",
    currencyUnit: "₹ crore, except EPS in ₹/share",
    rows: [
      { label: "Revenue from operations", current: "938.37", yoy: "877.32 (+6.96%)", qoq: "917.07 (+2.32%)" },
      { label: "Net profit attributable to owners", current: "41.71", yoy: "47.55 (-12.28%)", qoq: "56.38 (-26.02%)" },
      { label: "Basic EPS (₹ per share)", current: "2.49", yoy: "2.85 (-12.63%)", qoq: "3.37 (-26.11%)" },
    ],
    summary: "Vaibhav Global's September-quarter revenue rose 6.96% year on year to ₹938.37 crore, while net profit attributable to owners fell 12.28% to ₹41.71 crore. Basic EPS was ₹2.49, compared with ₹2.85 a year earlier. Against the June quarter, revenue rose 2.32% and profit fell 26.02%.",
    caveats: [
      "Source: consolidated statement, PDF page 3. Monetary figures converted from ₹ lakh to ₹ crore by dividing by 100; EPS remains ₹ per share and is not annualised.",
      "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use the original statement values before display rounding; EPS changes use the reported rounded EPS.",
      "The filing notice was detected through RSS; the figures were separately read and checked. This selected summary is not an automatic live feed or complete market coverage.",
      "Publication time below is the raw RSS timestamp, with no timezone suffix supplied by the feed; it is not a measured detection delay.",
    ],
    sourceUrl: "https://www.bseindia.com/xml-data/corpfiling/AttachLive/e99d4794-1360-4e70-8508-f6bc8f669322.pdf",
    sourceName: "BSE statement; RSS notice timestamp",
    sourceDisseminatedAt: "29-Oct-2026 00:34:31 (raw source time)",
    verifiedAt: "29 Oct 2026",
  },
  {
    company: "AGI Greenpac",
    quarterLabel: "Q2 FY2027",
    periodEnded: "30 Sep 2026",
    basis: "Consolidated",
    currencyUnit: "₹ crore",
    rows: [
      {
        label: "Revenue from operations",
        current: "655.46",
        yoy: "601.58 (+8.96%)",
        qoq: "785.27 (-16.53%)",
      },
      {
        label: "EBITDA (computed, see note)",
        current: "142.16",
        yoy: "149.52 (-4.92%)",
        qoq: "174.83 (-18.69%)",
      },
      {
        label: "EBITDA margin (computed)",
        current: "21.69%",
        yoy: "24.85%",
        qoq: "22.26%",
      },
      {
        label: "Profit before tax",
        current: "86.49",
        yoy: "100.85 (-14.24%)",
        qoq: "129.27 (-33.09%)",
      },
      {
        label: "Net profit",
        current: "66.50",
        yoy: "75.98 (-12.48%)",
        qoq: "99.35 (-33.06%)",
      },
      {
        label: "Other income",
        current: "1.25",
        yoy: "4.71",
        qoq: "8.96",
      },
    ],
    summary:
      "AGI Greenpac's September-quarter revenue rose 9% from a year earlier to ₹655 crore, but profit declined: net profit fell 12% year on year to ₹66.50 crore and the computed EBITDA margin narrowed to 21.7% from 24.9%. Sequentially, revenue, EBITDA and profit were all below the June quarter.",
    caveats: [
      "EBITDA is computed by Fistotex as profit before tax and exceptional items, plus finance cost, plus depreciation and amortisation, minus other income. The company's own statement discloses EBITDA of ₹143.41 crore, which includes other income.",
    ],
    sourceUrl:
      "https://www.bseindia.com/xml-data/corpfiling/AttachLive/9e097964-e8c4-47aa-b233-075f9ee63cfc.pdf",
    sourceName: "BSE filing (PDF)",
    sourceDisseminatedAt: "28 Oct 2026, 18:03 IST",
    verifiedAt: "28 Oct 2026",
  },
  {
    company: "Vedanta",
    quarterLabel: "Q2 FY2027",
    periodEnded: "30 Sep 2026",
    basis: "Consolidated, continuing operations",
    currencyUnit: "₹ crore",
    rows: [
      {
        label: "Revenue from operations",
        current: "25,812",
        yoy: "16,445 (+57%)",
        qoq: "23,456 (+10%)",
      },
      {
        label: "EBITDA (company measure, see note)",
        current: "9,938",
        yoy: "+106% (company-stated)",
      },
      {
        label: "Profit before tax",
        current: "8,390",
        yoy: "3,207 (+162%)",
        qoq: "7,189 (+17%)",
      },
      {
        label: "Net profit, continuing operations",
        current: "6,202",
        yoy: "2,471 (+151%)",
        qoq: "5,294 (+17%)",
      },
      {
        label: "Attributable to Vedanta shareholders",
        current: "3,650",
        yoy: "1,798 (+103%)",
        qoq: "5,473 (-33%)",
      },
      {
        label: "Standalone net profit/(loss)",
        current: "(170)",
        yoy: "(40)",
        qoq: "2,538",
      },
    ],
    summary:
      "Vedanta's consolidated net profit from continuing operations rose 151% year on year to ₹6,202 crore for the September quarter, on revenue up 57% at ₹25,812 crore. After ₹2,552 crore went to non-controlling interests, ₹3,650 crore was attributable to the company's own shareholders. The standalone parent company reported a ₹170 crore loss.",
    caveats: [
      "Figures are for continuing operations following the demerger of Vedanta Oil & Gas (appointed date 1 May 2026); year-ago figures are presented on the same restated basis in the filing.",
      "EBITDA of ₹9,938 crore is the company's own measure, labelled non-GAAP in the filing; the company's stated 60% margin excludes the copper business.",
      "The standalone net loss of ₹170 crore is a different basis from consolidated profit; the standalone company recorded no dividend income from subsidiaries this quarter.",
    ],
    sourceUrl:
      "https://www.bseindia.com/xml-data/corpfiling/AttachLive/afd6cd7a-6049-4bce-9471-d3c394fcfeb7.pdf",
    sourceName: "BSE filing (PDF)",
    sourceDisseminatedAt: "28 Oct 2026, 14:14 IST",
    verifiedAt: "28 Oct 2026",
  },
  {
    company: "Tata Consultancy Services",
    quarterLabel: "Q2 FY2027",
    periodEnded: "30 Sep 2026",
    basis: "Consolidated (Ind AS)",
    currencyUnit: "₹ crore",
    rows: [
      {
        label: "Revenue from operations",
        current: "73,188",
        yoy: "65,799 (+11.23%)",
        qoq: "72,275 (+1.26%)",
      },
      {
        label: "EBITDA (computed, see note)",
        current: "18,815",
        yoy: "17,978 (+4.66%)",
        qoq: "18,556 (+1.40%)",
      },
      {
        label: "EBITDA margin (computed)",
        current: "25.71%",
        yoy: "27.32%",
        qoq: "25.67%",
      },
      {
        label: "Profit before tax and exceptional items",
        current: "18,638",
        yoy: "17,203 (+8.34%)",
        qoq: "18,612 (+0.14%)",
      },
      {
        label: "Net profit",
        current: "13,934",
        yoy: "12,131 (+14.86%)",
        qoq: "13,420 (+3.83%)",
      },
      {
        label: "Other income",
        current: "1,337",
        yoy: "867",
        qoq: "1,568",
      },
    ],
    summary:
      "TCS's September-quarter revenue rose 11% from a year earlier to ₹73,188 crore and net profit grew 15% to ₹13,934 crore. The computed EBITDA margin narrowed to 25.7% from 27.3% a year ago; the year-ago quarter also carried a ₹1,135 crore restructuring expense below the operating line.",
    caveats: [
      "EBITDA is computed by Fistotex as profit before tax and exceptional items, plus finance costs, plus depreciation and amortisation, minus other income.",
      "June-quarter figures are derived as the reported half-year totals minus the September quarter; the half-year includes a ₹668 crore legal claim settlement booked in the June quarter.",
      "The year-ago quarter included ₹1,135 crore of restructuring expenses shown as an exceptional item, so the profit-before-tax comparison above uses the before-exceptional line.",
    ],
    sourceUrl:
      "https://www.tcs.com/content/dam/tcs/investor-relations/financial-statements/2026-27/q2/IND%20AS/Consolidated.pdf",
    sourceName: "TCS investor relations filing (PDF)",
    sourceDisseminatedAt: "8 Oct 2026 (date on the filing)",
    verifiedAt: "29 Oct 2026",
  },
  {
    company: "Wipro",
    quarterLabel: "Q2 FY2027",
    periodEnded: "30 Sep 2026",
    basis: "Consolidated (Ind AS), audited",
    currencyUnit: "₹ crore",
    rows: [
      {
        label: "Revenue from operations",
        current: "24,752.7",
        yoy: "22,697.3 (+9.06%)",
        qoq: "24,478.6 (+1.12%)",
      },
      {
        label: "EBITDA (computed, see note)",
        current: "4,871.3",
        yoy: "4,387.6 (+11.02%)",
        qoq: "4,632.7 (+5.15%)",
      },
      {
        label: "EBITDA margin (computed)",
        current: "19.68%",
        yoy: "19.33%",
        qoq: "18.93%",
      },
      {
        label: "Profit before tax",
        current: "4,204.7",
        yoy: "4,282.4 (-1.81%)",
        qoq: "4,334.5 (-2.99%)",
      },
      {
        label: "Net profit",
        current: "3,199.7",
        yoy: "3,262.4 (-1.92%)",
        qoq: "3,356.3 (-4.67%)",
      },
      {
        label: "Other income",
        current: "755.5",
        yoy: "947.7",
        qoq: "979.0",
      },
    ],
    summary:
      "Wipro's September-quarter revenue rose 9% year on year to ₹24,753 crore, but profit declined: net profit fell about 2% to ₹3,200 crore, also below the June quarter. The computed EBITDA margin improved to 19.7% from 19.3% a year earlier as other income shrank.",
    caveats: [
      "The filing presents figures in ₹ million; values here are converted at 1 crore = 10 million.",
      "EBITDA is computed by Fistotex as profit before tax, plus finance costs, plus depreciation, amortisation and impairment, minus other income. The filing reports no exceptional items in these quarters.",
    ],
    sourceUrl:
      "https://www.wipro.com/content/dam/nexus/en/investor/quarterly-results/2026-2027/q2fy27/regulation-33-financial-results-q2fy27.pdf",
    sourceName: "Wipro investor relations filing (PDF)",
    sourceDisseminatedAt: "15 Oct 2026 (board approval date in the filing)",
    verifiedAt: "29 Oct 2026",
  },
  {
    company: "Infosys",
    quarterLabel: "Q2 FY2027",
    periodEnded: "30 Sep 2026",
    basis: "Consolidated (Ind AS), audited",
    currencyUnit: "₹ crore",
    rows: [
      {
        label: "Revenue from operations",
        current: "49,244",
        yoy: "44,490 (+10.69%)",
        qoq: "48,211 (+2.14%)",
      },
      {
        label: "EBITDA (computed, see note)",
        current: "11,689",
        yoy: "10,535 (+10.95%)",
        qoq: "11,409 (+2.45%)",
      },
      {
        label: "EBITDA margin (computed)",
        current: "23.74%",
        yoy: "23.68%",
        qoq: "23.66%",
      },
      {
        label: "Profit before tax",
        current: "11,063",
        yoy: "10,229 (+8.15%)",
        qoq: "11,028 (+0.32%)",
      },
      {
        label: "Net profit",
        current: "7,838",
        yoy: "7,375 (+6.28%)",
        qoq: "7,775 (+0.81%)",
      },
      {
        label: "Other income, net",
        current: "848",
        yoy: "982",
        qoq: "984",
      },
    ],
    summary:
      "Infosys's September-quarter revenue grew 11% year on year to ₹49,244 crore and net profit rose 6% to ₹7,838 crore, with the computed EBITDA margin steady at 23.7%. Growth over the June quarter was modest: revenue up 2% and profit up 1%.",
    caveats: [
      "EBITDA is computed by Fistotex as profit before tax, plus finance cost, plus depreciation and amortisation, minus other income (net). The filing reports no exceptional items in these quarters; the FY2026 full-year column includes a ₹1,289 crore Labour Codes impact not present in these quarters.",
    ],
    sourceUrl:
      "https://www.infosys.com/investors/reports-filings/quarterly-results/2026-2027/q2/documents/q2-and-h1-fy27-financial-results-auditorsreports.pdf",
    sourceName: "Infosys investor relations filing (PDF)",
    sourceDisseminatedAt: "23 Oct 2026 (board approval date in the filing)",
    verifiedAt: "29 Oct 2026",
  },
];
