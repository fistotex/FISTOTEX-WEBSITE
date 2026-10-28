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
];
