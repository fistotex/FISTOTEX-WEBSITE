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
  "company": "AMJ Land Holdings",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "17.32",
      "yoy": "11.09 (+56.17%)",
      "qoq": "14.30 (+21.09%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "4.98",
      "yoy": "4.83 (+3.24%)",
      "qoq": "3.26 (+52.93%)"
    },
    {
      "label": "Basic / diluted EPS (₹ per share)",
      "current": "1.21",
      "yoy": "1.18 (+2.54%)",
      "qoq": "0.79 (+53.16%)"
    }
  ],
  "summary": "AMJ Land Holdings reported consolidated operating revenue of ₹17.32 crore, up 56.17% year on year and 21.09% from June. Profit attributable to owners was ₹4.98 crore, up 3.24% year on year and 52.93% quarter on quarter. Basic/diluted EPS was ₹1.21. Associate-results coverage is incomplete, as disclosed in note 5.",
  "caveats": [
    "Source: consolidated statement on PDF page 5, segments on page 6, notes on page 8 and limited review on pages 10-11. Original ₹ lakh figures are divided by 100 for crore. Changes use original figures before crore rounding; EPS changes use reported per-share figures.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT is ₹498.13 lakh versus ₹482.51 lakh and ₹325.72 lakh. Total group PAT is ₹513.76 lakh versus ₹493.18 lakh and ₹337.27 lakh; the difference is non-controlling profit, not additional owners' earnings.",
    "Current total group PAT ₹513.76 lakh equals owners' ₹498.13 lakh plus non-controlling ₹15.63 lakh. OCI of ₹1,233.72 lakh is separate: total comprehensive income ₹1,747.48 lakh is not PAT. Much of OCI reflects FVOCI investment movements, including associate OCI.",
    "Other income was ₹247.43 lakh versus ₹389.26 lakh a year ago and ₹219.85 lakh in June. Current deferred-tax credit was ₹36.23 lakh versus expenses of ₹36.36 lakh and ₹16.84 lakh. No adjusted PAT is estimated.",
    "Note 5 says Prime Mall Developers, an associate firm of Biodegradable Products India, had no available results at signing, so its results are omitted from the associate consolidation. Management estimates no material impact; that is management's estimate, not an independently quantified adjustment.",
    "Real estate revenue ₹1,599.78 lakh plus wind-power revenue ₹132.28 lakh reconciles to ₹1,732.06 lakh. Segment results are before interest, tax and depreciation and are not net profit; no sales-volume or organic-growth claim is inferred.",
    "Share capital is ₹820 lakh at ₹2 face value in all quarter columns. EPS is reported, not annualised. Absolute PAT and EPS percentage changes differ because reported EPS is rounded.",
    "The limited-review conclusion is unmodified and relies on another auditor for one subsidiary entity. Limited review is not an audit opinion. Note 6 records Ind AS 109 amendments adopted from 1 Apr 2026 without restating comparatives.",
    "The later 17:10:52 BSE results attachment is byte-identical to the 17:02:40 board-outcome filing and counts once. Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/ad554bcf-10f6-4450-b60b-6710ead8d661.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 17:02:40 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Restaurant Brands Asia",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "844.85",
      "yoy": "703.43 (+20.10%)",
      "qoq": "822.61 (+2.70%)"
    },
    {
      "label": "Net profit / (loss) attributable to owners",
      "current": "-19.58",
      "yoy": "-58.60 (loss narrowed)",
      "qoq": "-28.35 (loss narrowed)"
    },
    {
      "label": "Basic / diluted EPS (₹ per share)",
      "current": "-0.29",
      "yoy": "-1.01 (loss per share narrowed)",
      "qoq": "-0.45 (loss per share narrowed)"
    }
  ],
  "summary": "Restaurant Brands Asia reported consolidated operating revenue of ₹844.85 crore, up 20.10% year on year and 2.70% from June. Loss attributable to owners narrowed to ₹19.58 crore from ₹58.60 crore a year ago and ₹28.35 crore in June. Basic/diluted loss per share was ₹0.29; it is not a profit or a percentage gain.",
  "caveats": [
    "Source: consolidated statement on PDF page 13, notes on pages 16-17, segments on page 18 and limited review on pages 11-12. Original ₹ million amounts are divided by 10 for crore; revenue changes use original line values before rounding. Reported EPS is not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' loss is ₹19.575 crore, ₹58.595 crore and ₹28.348 crore respectively. Negative-base comparisons are described as losses narrowing rather than ordinary percentage growth.",
    "Total group loss was ₹23.791 crore versus ₹63.329 crore a year ago and ₹33.003 crore in June. Current owners' loss plus ₹4.216 crore non-controlling loss equals group loss. Total comprehensive loss includes OCI and is not substituted for owners' PAT.",
    "Other income was ₹21.993 crore versus ₹8.246 crore a year ago and ₹19.802 crore in June. Current and deferred-tax rows show no expense in these quarter columns. The annual ₹2.252 crore labour-code exceptional expense belongs to FY26, not the current September quarter; no adjusted PAT is estimated.",
    "India revenue was ₹705.570 crore versus Indonesia ₹139.277 crore. Segment results are reconciled separately to finance cost, depreciation and other income; they are not net profit. No sales-volume, same-store-growth or organic-growth claim is inferred from statutory revenue.",
    "Note 5 records a June 2026 preferential equity/warrant issue and a July change in control. Closing share capital rose from ₹582.252 crore a year ago to ₹712.218 crore. Reported EPS uses its weighted-average basis, so per-share and absolute-loss comparisons are not interchangeable.",
    "The group includes PT Sari Burger Indonesia and step-down PT Sari Chicken Indonesia. The review relies on another auditor's report for one subsidiary and its conclusion is unmodified. Unaudited means limited review, not an audit opinion.",
    "The ₹980.761 crore balance of net preferential proceeds is shown as held in mutual funds and other investments/securities. It is not treated as proceeds already spent on operations or as earnings.",
    "Selected original-source coverage, not a complete market list. Duplicate notices count once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://nsearchives.nseindia.com/corporate/RBA_29102026170235_FinalUpload.pdf",
  "sourceName": "NSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 17:05:10 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "DCW",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Standalone, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "662.86",
      "yoy": "539.21 (+22.93%)",
      "qoq": "541.91 (+22.32%)"
    },
    {
      "label": "Net profit after tax",
      "current": "10.36",
      "yoy": "13.81 (-24.97%)",
      "qoq": "34.55 (-70.01%)"
    },
    {
      "label": "Basic / diluted EPS (₹ per share)",
      "current": "0.35",
      "yoy": "0.47 (-25.53%)",
      "qoq": "1.17 (-70.09%)"
    }
  ],
  "summary": "DCW reported standalone operating revenue of ₹662.86 crore, up 22.93% year on year and 22.32% from June. Reported PAT was ₹10.36 crore, down 24.97% and 70.01% respectively; basic/diluted EPS was ₹0.35. The June comparison includes a ₹34.28 crore deferred-tax remeasurement gain, so the sequential PAT fall is not a clean operating-performance comparison.",
  "caveats": [
    "Source: statement on PDF page 8, segments on page 9, notes on page 12 and limited review on pages 6-7. Original monetary figures are ₹ lakh, consistent with the accompanying balance sheet and cash-flow units; divide by 100 for crore. Changes use original line values before rounding. EPS is reported, not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. This is standalone, not consolidated. Note 3 says the 28.96% Kaze Renewables holding does not give significant influence under Ind AS 28 and consolidated results are not required.",
    "June PAT of ₹34.5463 crore includes a ₹34.2792 crore deferred-tax adjustment gain. September has no such adjustment line. Note 5 attributes the gain to remeasurement/reassessment after the company elected its new tax regime. This is the company's accounting explanation, not independent tax-law advice; no adjusted PAT is invented.",
    "September total tax expense was ₹3.6625 crore versus ₹7.2442 crore a year ago and a ₹34.1894 crore credit in June. Current tax was ₹2.7244 crore, and deferred-tax expense ₹0.9381 crore. The reported PAT comparison retains all tax effects.",
    "Profit before tax was ₹14.0222 crore versus ₹21.0510 crore a year ago and ₹0.3569 crore in June. The exceptional-item row is blank in all three quarter columns. Other income was ₹7.1183 crore versus ₹4.6204 crore and ₹5.6502 crore respectively.",
    "The review conclusion is unmodified but contains Emphasis of Matters about electricity-tax and customs demands, Sahupuram land proceedings and income-tax/MAT-credit disputes, with no provisions for the cited demands. The review and note 4D print different MAT-credit reduction amounts, ₹16.9442 crore and ₹28.9315 crore; that unresolved source discrepancy is not used to calculate profit.",
    "Basic-chemicals revenue was ₹472.9950 crore and speciality-chemicals revenue ₹184.3871 crore. Segment results are before interest, tax and exceptional items, not segment PAT. No volume or organic-growth claim is inferred.",
    "The filing separately announces a board-approved buyback. It is not treated as completed, and no future EPS benefit or investment recommendation is assumed.",
    "Selected original-source coverage, not a complete market list. Duplicate notices count once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/be5f818f-e4de-4a02-9901-f34eabafaa97.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 17:01:40 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "KRN Heat Exchanger and Refrigeration",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "319.14",
      "yoy": "152.07 (+109.86%)",
      "qoq": "252.32 (+26.48%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "36.11",
      "yoy": "18.02 (+100.38%)",
      "qoq": "32.90 (+9.78%)"
    },
    {
      "label": "Basic / diluted EPS (₹ per share)",
      "current": "5.52",
      "yoy": "2.90 (+90.34%)",
      "qoq": "5.20 (+6.15%)"
    }
  ],
  "summary": "KRN Heat Exchanger and Refrigeration reported consolidated operating revenue of ₹319.14 crore, up 109.86% year on year and 26.48% from June. Profit attributable to owners was ₹36.11 crore, up 100.38% and 9.78% respectively; reported basic/diluted EPS was ₹5.52. The June-quarter QIP changed the share base, so EPS and PAT growth are not interchangeable.",
  "caveats": [
    "Source: consolidated statement on PDF page 2, notes on page 3, geographical information on page 4 and limited review on pages 9-10. Original ₹ lakh amounts are divided by 100 for crore; changes use original line values before rounding. EPS is reported, not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT equals group PAT in these quarter columns, with no non-controlling profit shown. Standalone figures and total comprehensive income are not substituted.",
    "Note 5 says September-quarter figures are balancing figures between the half-year results and June-quarter figures, with the corresponding 2025 quarter prepared the same way. The comparative quarter information was subject to limited review.",
    "Other income was ₹7.4863 crore versus ₹2.3927 crore a year ago and ₹2.7776 crore in June. Quarter exceptional/prior-period item columns are blank; the ₹0.3971 crore prior-year annual item is not treated as a September-quarter item. No recurring PAT is estimated.",
    "Total tax expense was ₹9.7462 crore versus ₹8.9226 crore a year ago and ₹9.4352 crore in June. Deferred-tax expense was ₹0.1526 crore versus ₹0.6357 crore and ₹1.7978 crore respectively. Reported PAT includes these tax effects without normalisation.",
    "The June-quarter QIP allotted 33,01,886 shares, as note 8 states. Closing equity capital rose to ₹65.4585 crore from ₹62.1566 crore a year ago. Reported EPS uses its own weighted-average basis and is not recomputed from closing shares.",
    "The consolidated group includes KRN HVAC Products and Thermotech Research Laboratory. The auditors rely on independent subsidiary auditors' review reports for both, and their consolidated review conclusion is unmodified. Geographical revenue is not equated to manufacturing volume or organic growth.",
    "The filing presents comprehensive income using a subtractive OCI convention and has a small discrepancy between the current OCI total and owners' OCI line. Those figures are not used here to infer PAT; the separate printed owners' net-profit line is used consistently.",
    "Selected original-source coverage, not a complete market list. Duplicate notices count once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/2b761024-8cc6-4b35-a835-a083b20093be.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:58:07 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Horizon Industrial Parks",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited; year-ago figures not reviewed",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "214.99",
      "yoy": "165.53 (+29.88%)",
      "qoq": "200.55 (+7.20%)"
    },
    {
      "label": "Net profit / (loss) attributable to owners",
      "current": "15.34",
      "yoy": "-73.99 (loss to profit)",
      "qoq": "-10.32 (loss to profit)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "0.06",
      "yoy": "-0.48 (loss to profit)",
      "qoq": "-0.04 (loss to profit)"
    }
  ],
  "summary": "Horizon Industrial Parks reported consolidated operating revenue of ₹214.99 crore, up 29.88% year on year and 7.20% from June. Profit attributable to owners was ₹15.34 crore against losses of ₹73.99 crore a year ago and ₹10.32 crore in June; basic EPS was ₹0.06. The year-ago results were management-compiled and not audited or reviewed. Current profit includes a tax credit and joint-venture profit.",
  "caveats": [
    "Source: consolidated statement on PDF page 7, review on pages 2-3 and notes on page 10. Original ₹ million amounts are divided by 10 for crore; revenue growth uses original values before rounding. EPS is reported, not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Note 2 and the review report say September 2025 quarter and half-year results were management-compiled, board-approved and neither audited nor reviewed. That limitation applies to the revenue-growth comparison too.",
    "Owners' PAT of ₹15.337 crore plus non-controlling loss of ₹1.403 crore equals total group PAT of ₹13.934 crore. Total group losses were ₹76.050 crore a year ago and ₹11.627 crore in June. The owners' basis is used consistently; no percentage gain is shown across a loss-to-profit comparison.",
    "Total tax was ₹2.731 crore credit, including ₹1.905 crore current-tax credit and ₹0.826 crore deferred-tax credit. A year ago total tax was ₹3.048 crore expense and June was ₹4.719 crore expense. No tax-normalised or recurring PAT is estimated.",
    "Other income was ₹37.311 crore versus ₹10.266 crore a year ago and ₹39.989 crore in June. Finance costs were ₹115.541 crore versus ₹148.113 crore and ₹131.316 crore respectively. These are separate from operating revenue; no single cause is asserted for the turnaround.",
    "The quarter includes ₹1.200 crore share of joint-venture profit. The 49% Vision Softech investment is equity-accounted, not fully consolidated. The auditors rely on management-prepared, unreviewed JV information for 10 Jul-30 Sep 2026, with an unmodified review conclusion.",
    "Note 3 records an IPO during the quarter and ₹2,250 crore of proceeds used to repay/prepay borrowings. The changing share base matters for EPS comparisons; the reported ₹0.06 EPS is not recomputed using only closing shares. The company reports one industrial/logistics-space leasing business in India.",
    "This card uses statutory statement profit, not the presentation's pro-forma cash PAT or operational EBITDA. Those adjusted measures are not treated as interchangeable with owners' PAT. Basic and diluted quarter EPS are both ₹0.06.",
    "Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix; duplicate notices count once."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/9ec54eb0-701b-44be-a157-0bbd4f02e942.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:50:00 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "NINtec Systems",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "48.20",
      "yoy": "41.69 (+15.60%)",
      "qoq": "45.86 (+5.10%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "10.57",
      "yoy": "7.87 (+34.36%)",
      "qoq": "9.20 (+14.99%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "5.69",
      "yoy": "4.24 (+34.20%)",
      "qoq": "4.95 (+14.95%)"
    }
  ],
  "summary": "NINtec Systems reported consolidated operating revenue of ₹48.20 crore, up 15.60% year on year and 5.10% from June. Profit attributable to owners was ₹10.57 crore, up 34.36% and 14.99% respectively; basic EPS was ₹5.69. Total comprehensive income fell from June as other comprehensive income was smaller, not because PAT fell.",
  "caveats": [
    "Source: consolidated results and notes on PDF page 9, limited review on pages 6-7. Original ₹ lakh amounts are divided by 100 for crore. Growth uses the printed original line values before rounding; EPS is reported, not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT equals total group PAT in these quarter columns, with no non-controlling interest shown. Standalone results are not substituted.",
    "Total comprehensive income was ₹10.6877 crore versus ₹8.1318 crore a year ago and ₹10.9355 crore in June. It includes other comprehensive income of ₹0.1134 crore versus ₹0.2617 crore and ₹1.7395 crore respectively. Hedge and foreign-operation translation movements are OCI, not PAT.",
    "Other income was ₹1.3337 crore versus ₹0.8253 crore a year ago and ₹0.6905 crore in June. No exceptional, extraordinary or discontinued-operation item is reported in these quarter columns; no adjusted PAT is estimated.",
    "Current tax expense was ₹3.4427 crore versus ₹2.5840 crore a year ago and ₹2.7608 crore in June. Deferred tax was ₹0.0862 crore credit versus ₹0.0822 crore credit and ₹0.1150 crore expense respectively.",
    "The group includes wholly owned Nintec Systems B.V., Netherlands, and reports one software-services segment. The auditors' unmodified limited-review conclusion relies on management-provided unaudited subsidiary information: quarter revenue ₹21.2964 crore and PAT ₹1.0485 crore. This is not described as an audit of the subsidiary.",
    "The filing contains small rounding differences between some displayed components and totals, including revenue plus other income and quarterly sums versus half-year figures. Each metric is retained on its own printed line; no silent balancing adjustment is made. Basic and diluted quarter EPS are both ₹5.69.",
    "Selected original-source coverage, not a complete market list. Duplicate notices count once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/4f57e6c4-1d88-4c58-9c13-6ad99354f8b7.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:43:02 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Indian Energy Exchange",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "167.10",
      "yoy": "153.92 (+8.56%)",
      "qoq": "157.88 (+5.84%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "139.24",
      "yoy": "123.35 (+12.88%)",
      "qoq": "134.76 (+3.32%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "1.56",
      "yoy": "1.39 (+12.23%)",
      "qoq": "1.52 (+2.63%)"
    }
  ],
  "summary": "Indian Energy Exchange reported consolidated revenue from operations of ₹167.10 crore, up 8.56% year on year and 5.84% from June. Profit attributable to owners was ₹139.24 crore, up 12.88% and 3.32% respectively; basic EPS was ₹1.56. Other income fell from June, while the share of associate profit increased.",
  "caveats": [
    "Source: consolidated statement on PDF page 11, review report on pages 8-10 and notes on page 14. Original ₹ lakh figures are divided by 100 for crore. Percentage changes use original amounts before rounding; reported EPS is not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT equals total group PAT in these quarter columns, with no non-controlling profit shown. Standalone results and other comprehensive income are not substituted.",
    "Other income was ₹35.8613 crore versus ₹29.3432 crore a year ago and ₹44.9327 crore in June. Total income of ₹202.9576 crore includes this item and is not presented here as operating revenue.",
    "The share of associate profit, already net of tax, was ₹11.0475 crore versus ₹4.5255 crore a year ago and ₹7.7188 crore in June. It is included in consolidated profit, not operating revenue. No exceptional item is separately reported in these quarter columns.",
    "Total tax expense was ₹42.1584 crore versus ₹37.7524 crore a year ago and ₹42.0447 crore in June. The current quarter includes a ₹1.9981 crore deferred-tax credit, compared with ₹0.3179 crore credit a year ago and ₹0.3338 crore expense in June. No adjusted or recurring PAT is estimated.",
    "The group includes subsidiaries ICX and Indian Coal Exchange, plus associate Indian Gas Exchange. The review annexure says Indian Coal Exchange is included from 1 Jun 2026. The company reports one operating segment; no like-for-like growth adjustment or trading-volume growth is inferred from revenue.",
    "The auditors give an unmodified review conclusion but rely on management-certified, unreviewed interim information for the ESOP Trust and one subsidiary, described by management as immaterial to the group. This is a limited review, not an audit.",
    "The ₹2 per share final FY2026 dividend mentioned in note 6 was approved at the September AGM and paid during the quarter; it is not labelled a new Q2 dividend declaration. Basic and diluted quarter EPS are both ₹1.56; EPS rounding can make its growth differ from PAT growth.",
    "Selected original-source coverage, not a complete market list. Board outcomes and duplicate notices count once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/0bdb7483-6c23-4290-8f3a-78e5d627ec2a.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:48:10 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Ram Ratna Wires",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "1,961.95",
      "yoy": "1,163.39 (+68.64%)",
      "qoq": "1,853.28 (+5.86%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "35.04",
      "yoy": "21.30 (+64.53%)",
      "qoq": "35.21 (-0.50%)"
    },
    {
      "label": "Basic EPS (₹ per share, bonus-adjusted)",
      "current": "3.75",
      "yoy": "2.28 (+64.47%)",
      "qoq": "3.77 (-0.53%)"
    }
  ],
  "summary": "Ram Ratna Wires reported consolidated revenue of ₹1,961.95 crore, up 68.64% year on year and 5.86% from June. Profit attributable to owners was ₹35.04 crore, up 64.53% year on year but down 0.50% from June; reported bonus-adjusted basic EPS was ₹3.75. Notes disclose an EPR obligation whose financial impact the group says it cannot yet reasonably determine.",
  "caveats": [
    "Source: consolidated statement on PDF page 13, segments on page 16 and notes on page 17. Original ₹ lakh amounts are divided by 100 for crore; percentage changes use original figures before rounding. EPS is reported, not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT of ₹35.0372 crore plus ₹0.6674 crore non-controlling profit equals total group PAT of ₹35.7046 crore. The owners' line is used consistently; total PAT and standalone results are not mixed in.",
    "The share of joint-venture losses was ₹2.1525 crore versus ₹1.2590 crore a year ago and ₹1.4153 crore in June. No exceptional item appears in these quarter columns. The ₹3.5643 crore labour-code charge belongs to the year ended 31 Mar 2026, not this quarter.",
    "Total tax expense was ₹15.8342 crore versus ₹8.9568 crore a year ago and ₹10.9313 crore in June. Deferred-tax expense was ₹4.1445 crore versus ₹1.6004 crore and ₹0.7221 crore respectively. No tax-normalised profit is inferred.",
    "Prior-period EPS is restated for the 1-for-1 bonus issue with 26 Dec 2025 record date, as note v states. Basic and diluted quarter EPS are both ₹3.75; growth need not exactly equal PAT growth because EPS is rounded.",
    "Note vi says the group cannot reasonably determine the financial impact, if any, of its non-ferrous-metal scrap Extended Producer Responsibility obligation because the portal and operational/pricing framework are not yet available. This is the company's disclosure at the results date, not an independently verified statement of current regulation or a zero-cost assumption.",
    "The board approved acquiring the remaining 50% of joint venture Epavo, with 100% ownership to take effect at closing. Epavo remains a joint venture in these September results; the proposed transaction is not treated as already consolidated. Segments are winding wires/strips, copper tubes/pipes and others; revenue growth is not labelled volume growth.",
    "Selected original-source coverage, not a complete market list. Multiple results and board-outcome notices are counted once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/1c315cdf-44fc-4936-92e2-fd7e581ab73f.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:25:36 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Blue Star",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "2,930.95",
      "yoy": "2,422.37 (+21.00%)",
      "qoq": "3,377.92 (-13.23%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "123.92",
      "yoy": "99.01 (+25.16%)",
      "qoq": "102.50 (+20.90%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "6.03",
      "yoy": "4.80 (+25.63%)",
      "qoq": "4.99 (+20.84%)"
    }
  ],
  "summary": "Blue Star reported consolidated revenue of ₹2,930.95 crore, up 21.00% year on year but down 13.23% from June. Profit attributable to owners was ₹123.92 crore, up 25.16% and 20.90% respectively; basic EPS was ₹6.03. Reported profit includes a ₹23.02 crore exceptional gain on sale of the Medtech business.",
  "caveats": [
    "Source: consolidated statement on PDF page 5, ratios and segment information on pages 6-7 and notes on page 10. Amounts are already in ₹ crore. Percentage changes use the printed figures; EPS is reported and not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT of ₹123.92 crore plus ₹0.01 crore non-controlling loss equals total group PAT of ₹123.91 crore. Owners' profit is used consistently; standalone numbers are not substituted.",
    "Exceptional income was ₹23.02 crore in September from sale of the Medtech business by wholly owned Blue Star Engineering & Electronics. June included ₹9.17 crore property-sale profit, while September 2025 had no exceptional item. These are pre-tax amounts; no recurring or after-tax adjusted PAT is estimated.",
    "Profit before exceptional items and tax was ₹134.28 crore versus ₹132.17 crore a year ago and ₹125.42 crore in June. Joint-venture profit of ₹0.67 crore is included in that line, compared with losses of ₹0.99 crore and ₹0.20 crore respectively.",
    "Total tax expense was ₹33.39 crore, unchanged year on year, versus ₹32.08 crore in June. Deferred tax was ₹0.59 crore expense versus ₹0.01 crore credit and ₹3.05 crore expense respectively.",
    "The company describes its Unitary Products segment as seasonal. Its revenue was ₹897.66 crore versus ₹693.81 crore a year ago and ₹1,689.31 crore in June; one sequential group-revenue decline is not labelled a demand trend.",
    "The disclosed operating margin is 6.91% versus 7.57% a year ago and 5.18% in June, using (profit before tax and exceptional items less other income plus finance costs plus depreciation/amortisation) divided by revenue. It is not the owners' PAT margin or the sum of segment margins.",
    "Selected original-source coverage, not a complete market list. Multiple board outcomes and management notices are not additional results. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/040a7f5f-1c11-4a81-a9a7-090afa506a1d.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:18:16 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Firstsource Solutions",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, audited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "2,830.64",
      "yoy": "2,314.70 (+22.29%)",
      "qoq": "2,751.75 (+2.87%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "232.82",
      "yoy": "179.52 (+29.70%)",
      "qoq": "165.92 (+40.32%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "3.37",
      "yoy": "2.60 (+29.62%)",
      "qoq": "2.40 (+40.42%)"
    }
  ],
  "summary": "Firstsource Solutions reported consolidated revenue from operations of ₹2,830.64 crore, up 22.29% year on year and 2.87% from June. Profit attributable to owners was ₹232.82 crore, up 29.70% and 40.32% respectively. Reported basic EPS was ₹3.37. June included an exceptional expense; the comparisons are not adjusted for it.",
  "caveats": [
    "Source: audited consolidated statement on PDF page 6, segment reconciliation on page 8 and audit report on pages 2-5. Original ₹ million figures are divided by 10 for crore; changes use original values. EPS is reported, not annualised.",
    "Year ago is 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT of ₹232.823 crore plus ₹0.383 crore non-controlling loss equals ₹232.440 crore total group PAT. Owners' PAT is used consistently; standalone figures are not mixed in.",
    "Revenue is the statement's revenue-from-operations line before other operating income. The release's rounded ₹2,825.6 crore revenue includes net negative other operating income: ₹2,830.637 crore less ₹5.038 crore equals ₹2,825.599 crore. Its 22.2% growth therefore has a different base from the 22.29% shown here.",
    "No exceptional item is shown for September 2026. June carried ₹71.686 crore net exceptional expense, while September 2025 carried ₹1.911 crore net exceptional income. No after-tax adjusted profit or recurring-growth claim is inferred.",
    "Total tax expense was ₹66.910 crore versus ₹44.821 crore a year ago and ₹53.424 crore in June. Deferred tax was ₹3.792 crore expense versus ₹2.549 crore credit and ₹2.483 crore expense respectively.",
    "Basic EPS was ₹3.37 versus ₹2.60/₹2.40; diluted EPS was ₹3.31 versus ₹2.54/₹2.36. The reported per-share figures are not replaced by profit divided by period-end share capital.",
    "Four business segments are disclosed: Banking and Financial Services, Healthcare, Communication/Media/Technology and Diverse Industries. The segment result before tax and finance costs is not relabelled as EBITDA.",
    "Selected original-source coverage, not a complete market list. Multiple results, board-outcome and presentation notices are counted once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/906bdb1b-9c33-454e-b411-8f4cd03285dd.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:24:18 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Trent",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "5,873.14",
      "yoy": "4,817.60 (+21.91%)",
      "qoq": "5,754.71 (+2.06%)"
    },
    {
      "label": "Net profit attributable to equity holders",
      "current": "463.77",
      "yoy": "376.86 (+23.06%)",
      "qoq": "519.01 (-10.64%)"
    },
    {
      "label": "Basic EPS (₹ per share, bonus-adjusted)",
      "current": "8.70",
      "yoy": "7.07 (+23.06%)",
      "qoq": "9.73 (-10.59%)"
    }
  ],
  "summary": "Trent reported consolidated revenue of ₹5,873.14 crore, up 21.91% year on year and 2.06% from June. Profit attributable to equity holders was ₹463.77 crore, up 23.06% from a year ago but down 10.64% from June. Reported basic EPS of ₹8.70 and the comparison periods are adjusted for the 1-for-2 bonus issue.",
  "caveats": [
    "Source: consolidated statement on PDF pages 10-11 and notes on page 14. Amounts are already in ₹ crore; no million/lakh conversion is applied. Percentage changes use original figures. EPS is reported, not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Equity holders' PAT of ₹463.77 crore plus non-controlling profit of ₹4.32 crore equals total group PAT of ₹468.09 crore. The owners' line is used consistently; standalone results are not mixed in.",
    "The share of associate/joint-venture losses was ₹21.06 crore versus ₹1.10 crore a year ago and ₹9.74 crore in June. This is included in reported profit before tax, not treated as an exceptional add-back.",
    "Total tax expense was ₹150.97 crore versus ₹103.56 crore a year ago and ₹173.77 crore in June. Deferred-tax credits were ₹11.10 crore, ₹32.66 crore and ₹11.29 crore respectively. No adjusted or recurring PAT is inferred.",
    "The company issued one bonus share for every two shares held during the half year and adjusted EPS for all reporting periods accordingly. Unadjusted historical EPS should not be substituted for these comparisons.",
    "No exceptional item appears in the three quarter columns. The ₹26.11 crore labour-code charge relates to the year ended 31 Mar 2026. The disclosed operating margin includes an Ind AS 116 adjustment and is not relabelled as a simple quarterly EBITDA margin.",
    "The group reports retailing/trading as its main business without separate reportable segments. Revenue growth does not alone establish like-for-like store sales, volumes or customer demand.",
    "Selected original-source coverage, not a complete market list. Multiple board-outcome and press-release notices are counted once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/b962e91a-b409-4f5f-a22f-3275c992153a.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:11:10 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Milky Mist Dairy Food",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited; year-ago figures management-derived, not reviewed/audited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "1,089.40",
      "yoy": "769.47 (+41.58%)",
      "qoq": "973.45 (+11.91%)"
    },
    {
      "label": "Consolidated net profit after tax",
      "current": "77.94",
      "yoy": "28.39 (+174.52%)",
      "qoq": "64.68 (+20.50%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "1.10",
      "yoy": "0.44 (+150.00%)",
      "qoq": "1.01 (+8.91%)"
    }
  ],
  "summary": "Milky Mist Dairy Food reported consolidated revenue of ₹1,089.40 crore, up 41.58% year on year and 11.91% from June. Net profit was ₹77.94 crore versus ₹28.39 crore a year ago and ₹64.68 crore in June. The year-ago figures were management-derived and not reviewed or audited; the tax-regime change and recent IPO/share conversion also affect comparability.",
  "caveats": [
    "Source: consolidated statement on PDF page 13 and notes on page 15. Original ₹ lakh amounts are divided by 100 for crore; changes use original values before rounding. EPS is reported and not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Note 8 says September 2025 quarter and half-year figures were derived by management and were not reviewed or audited by statutory auditors. These comparisons are not described as like-for-like reviewed results.",
    "Consolidated PAT is the statement's profit-for-period line; no separate owner/non-controlling-interest split is printed on that page. Standalone results and press-release EBITDA are not substituted.",
    "Total tax expense was ₹12.4059 crore versus ₹19.1041 crore a year ago and ₹8.8283 crore in June. Deferred tax was a ₹10.3416 crore credit versus ₹10.3676 crore expense a year ago and a ₹9.6819 crore credit in June. The company opted into a 25.168% tax regime effective 1 Apr 2026 and remeasured deferred taxes. No tax-adjusted or recurring PAT is inferred.",
    "The company listed in August 2026 after its IPO; 2.5 crore CCPS were converted into equity shares in July. Reported EPS uses the applicable share basis and need not grow at the same rate as PAT. Fresh-issue proceeds, promoter offer-for-sale proceeds and issue expenses are not treated as operating revenue or profit.",
    "The business reports one milk-processing and milk-products segment. No exceptional-item line is printed in this consolidated statement; nominal revenue growth does not establish volume growth.",
    "Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/f55906a8-4678-419c-bdea-de43eb1f6dc8.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:21:12 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Praj Industries",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "848.99",
      "yoy": "841.63 (+0.87%)",
      "qoq": "715.82 (+18.60%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "23.16",
      "yoy": "19.28 (+20.09%)",
      "qoq": "11.61 (+99.53%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "1.26",
      "yoy": "1.05 (+20.00%)",
      "qoq": "0.63 (+100.00%)"
    }
  ],
  "summary": "Praj Industries reported consolidated revenue of ₹848.99 crore, up 0.87% year on year and 18.60% from June. Profit attributable to owners was ₹23.16 crore, compared with ₹19.28 crore a year ago and ₹11.61 crore in June. The June comparison includes an insurance claim recognised in that earlier quarter, not fresh income from its September cash receipt.",
  "caveats": [
    "Source: consolidated statement on PDF page 10 and notes on page 11. Original ₹ million amounts are divided by 10 for crore; changes use original values before rounding. EPS is reported as printed, with no annualisation inferred.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' PAT is ₹23.1582 crore; total group PAT is ₹23.1674 crore including ₹0.0092 crore non-controlling profit. Growth uses the owners' line consistently, not total PAT or standalone figures.",
    "The company recognised ₹8.8974 crore insurance-claim income in June after approval, relating to a March 2025 fire whose losses were already expensed. The ₹2.3974 crore balance received in September is a cash receipt against that claim, not newly recognised September income.",
    "Total tax expense was ₹12.9572 crore versus ₹10.3257 crore a year ago and ₹9.4428 crore in June. Current deferred-tax expense was ₹0.49 crore; June had a ₹5.82 crore deferred-tax credit and ₹1.8958 crore prior-period tax adjustment. No adjusted or recurring PAT is inferred.",
    "No exceptional item appears in these three quarter columns. The ₹26.3821 crore new-labour-code provision was booked in the year ended 31 Mar 2026, not the current quarter.",
    "The group reports one Process and Project Engineering segment. Geographic revenue is disclosed separately; nominal revenue growth alone does not establish volume growth, new orders or order-book conversion.",
    "Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/c8a47c6a-733c-43e3-b316-727201f72193.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 16:12:26 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Laurus Labs",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "2,206.37",
      "yoy": "1,653.47 (+33.44%)",
      "qoq": "2,026.31 (+8.89%)"
    },
    {
      "label": "Net profit attributable to equity holders",
      "current": "441.48",
      "yoy": "194.97 (+126.43%)",
      "qoq": "367.60 (+20.10%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "8.17",
      "yoy": "3.61 (+126.32%)",
      "qoq": "6.81 (+19.97%)"
    }
  ],
  "summary": "Laurus Labs reported consolidated revenue of ₹2,206.37 crore, up 33.44% year on year and 8.89% from June. Profit attributable to equity holders rose to ₹441.48 crore, compared with ₹194.97 crore a year ago and ₹367.60 crore in June. Total group profit after the share of associates and joint venture was ₹436.19 crore, a different attribution basis.",
  "caveats": [
    "Source: consolidated statement on PDF page 2 and notes on page 5. The statement is already in ₹ crore; no million/lakh conversion is applied. Changes use original amounts before rounding. EPS is reported and not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Equity holders' PAT of ₹441.48 crore plus non-controlling loss of ₹5.29 crore equals total group PAT of ₹436.19 crore. That total includes ₹0.55 crore share of associate/joint-venture losses; the preceding ₹436.74 crore PAT line is not substituted for owners' profit.",
    "Total tax expense was ₹155.08 crore versus ₹75.98 crore a year ago and ₹119.37 crore in June. Deferred-tax credits were ₹7.86 crore, ₹11.93 crore and ₹15.51 crore respectively. Reported PAT is not an adjusted or recurring-profit estimate.",
    "The group reports one pharmaceuticals segment. Consolidation includes Laurus Bio at 78.34%, associates and the 49% KRKA Pharma joint venture; standalone results are not mixed into the comparison.",
    "The proposed Synthesis/Sriam scheme remains subject to approvals. The company says these consolidated results do not give effect to the proposed merger. Laurus Generics GmbH liquidation remains ongoing through its statutory creditor-objection period; the note describes its net assets and results as not material.",
    "The company allotted 455,636 ESOP shares during the half year. Reported EPS uses its applicable share basis. The ₹1 per-share interim dividend approved on 29 Oct is a distribution decision, not an addition to quarterly PAT.",
    "No separate exceptional-item line appears in this consolidated statement. No EBITDA or acquisition-adjusted profit is inferred from a press release. Board-outcome, presentation and press-release notices are not counted as separate company results.",
    "Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/62c262ff-9bb7-43ac-93da-16eac8dbe6d4.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:00:11 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "InterGlobe Aviation (IndiGo)",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "23,363.80",
      "yoy": "18,555.30 (+25.91%)",
      "qoq": "24,584.10 (-4.96%)"
    },
    {
      "label": "Net loss attributable to owners",
      "current": "(1,878.60)",
      "yoy": "(2,581.70) (loss narrowed 27.23%)",
      "qoq": "(237.60) (loss widened 690.66%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "(48.58)",
      "yoy": "(66.79)",
      "qoq": "(6.15)"
    }
  ],
  "summary": "IndiGo reported consolidated revenue of ₹23,363.80 crore, up 25.91% year on year but down 4.96% from June. Loss attributable to owners was ₹1,878.60 crore, narrower than ₹2,581.70 crore a year ago but wider than ₹237.60 crore in June. Reported foreign-exchange loss and fuel costs materially affect the comparison; no adjusted profit is inferred.",
  "caveats": [
    "Source: consolidated statement on PDF page 3 and notes on pages 7-8. Original ₹ million amounts are divided by 10 for crore. Percentage changes use original values; loss narrowing/widening uses absolute loss amounts, not a misleading positive-profit growth rate. Parentheses indicate negative values.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Owners' loss is ₹1,878.60 crore; total group loss is ₹1,879.10 crore including ₹0.50 crore non-controlling loss. The adjacent standalone results are not mixed into this summary.",
    "Net foreign-exchange loss was ₹1,333.20 crore versus ₹2,892.10 crore a year ago and ₹82.50 crore in June. Aircraft fuel expense was ₹9,966.80 crore versus ₹5,961.80 crore and ₹10,832.90 crore respectively. These are reported expense lines, not a quantified causal bridge to PAT.",
    "The fuel note says domestic ATF price caps applied through 8 Jun 2026. The group did not opt into the subsequent Price Stabilisation Fund scheme and accrued fuel at prevailing market prices under its contracts. Revenue growth alone does not establish passenger-volume or yield growth.",
    "No exceptional item appears in the three quarter columns. The annual March 2026 exceptional charge is not treated as a current-quarter charge. EPS is not annualised; potential shares are excluded from diluted EPS because they are anti-dilutive in loss periods.",
    "The tax note discloses disputed exposure of ₹2,418.50 crore excluding interest/penalty, with no provision based on the group's legal advice; it also says carried-forward losses could be affected. IGST paid under protest of ₹2,400 crore remains shown as recoverable. These are the company's accounting positions, not independent legal conclusions.",
    "The regulatory note describes DGCA guarantees of ₹50 crore and a CCI matter held in abeyance while proposed commitments are considered; management made no provision pending the outcome. These matters are not presented as resolved.",
    "Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/6898d04a-23b0-45d7-a70e-0645f44dafc9.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:50:52 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Monarch Networth Capital",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "123.14",
      "yoy": "83.12 (+48.15%)",
      "qoq": "91.23 (+34.97%)"
    },
    {
      "label": "Consolidated net profit after tax",
      "current": "56.56",
      "yoy": "44.97 (+25.77%)",
      "qoq": "45.18 (+25.19%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "7.13",
      "yoy": "5.67 (+25.75%)",
      "qoq": "5.70 (+25.09%)"
    }
  ],
  "summary": "Monarch Networth Capital reported consolidated revenue from operations of ₹123.14 crore, up 48.15% year on year and 34.97% from June. Net profit was ₹56.56 crore, up 25.77% and 25.19% respectively. Revenue includes fair-value gains while a separate fair-value loss sits in expenses; it is not a net trading-income measure.",
  "caveats": [
    "Source: consolidated statement on PDF page 12, segment table on page 13, notes on page 16 and review report on pages 10-11. Original ₹ lakh amounts are divided by 100 for crore; changes use original amounts before rounding. EPS is reported, not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. The company says September-quarter figures are the balancing figures between the six-month results and the June quarter. Consolidated PAT is used as printed; no separate owner/non-controlling-interest split appears on the statement page.",
    "Revenue from operations includes ₹82.46 crore fees/commission, ₹34.81 crore interest and ₹5.87 crore net fair-value gains. Expenses separately include ₹15.18 crore net fair-value losses, versus ₹0.35 crore in June and nil in the year-ago column. These gain/loss lines are not silently netted or treated as exceptional adjustments.",
    "The group includes broking and related services, non-banking finance, insurance, asset management and other activities. Industrial EBITDA and a recurring-profit estimate are not inferred.",
    "Total tax expense was ₹15.53 crore versus ₹15.83 crore a year ago and ₹10.41 crore in June. Current deferred-tax expense was ₹5.18 crore; June had a ₹0.85 crore deferred-tax credit.",
    "Finserve subsidiary results were reviewed by another auditor. Five other subsidiaries supplied management-certified, unreviewed interim information; the review report says these were not material to the group and its conclusion was not modified for reliance on them. The results remain unaudited, not annual audited accounts.",
    "The company allotted 40,000 ESOP shares during the half year. Reported EPS follows its applicable share basis. Prior-year half-year PBT differs by ₹0.02 lakh between the statement and segment table; no half-year growth is computed here.",
    "Selected original-source coverage, not a complete market list. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/b955d9a5-c5ef-4daa-abc1-d36b627b72a5.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:43:22 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "BlackBuck",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "235.33",
      "yoy": "151.14 (+55.70%)",
      "qoq": "204.17 (+15.26%)"
    },
    {
      "label": "Consolidated net profit after tax",
      "current": "41.40",
      "yoy": "29.20 (+41.79%)",
      "qoq": "42.17 (-1.83%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "2.27",
      "yoy": "1.60 (+41.88%)",
      "qoq": "2.31 (-1.73%)"
    }
  ],
  "summary": "BlackBuck, formerly Zinka Logistics Solutions, reported consolidated revenue of ₹235.33 crore, up 55.70% year on year and 15.26% from June. Net profit was ₹41.40 crore, up 41.79% from a year ago but down 1.83% from June. Tax credits affect the profit comparison; reported basic EPS was ₹2.27.",
  "caveats": [
    "Source: consolidated statement on PDF page 11 and notes on page 15. Original ₹ million amounts are divided by 10 for crore; percentage changes use original values before rounding. EPS is reported and not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Consolidated net profit is the statement's profit-for-period line. No separate owner/non-controlling-interest split is printed on that page; no additional attribution is invented.",
    "Total tax expense was ₹1.42 crore, including a ₹1.17 crore deferred-tax credit, versus ₹9.75 crore a year ago. June had a ₹3.96 crore deferred-tax credit and ₹0.05 crore net tax credit. Reported PAT is not an adjusted or recurring-profit estimate.",
    "The group has truck-operator services and a lending business through BlackBuck Finserve, an NBFC. An industrial EBITDA measure is not imposed on this mixed business.",
    "Wholly owned ZZ Logistics Solutions was struck off on 11 May 2026 and derecognised from consolidation. BlackBuck Transport Services was incorporated on 24 Sep 2026; the Loads-business transfer to it was executed after the quarter on 12 Oct 2026. These scope changes are disclosed, not treated as a quantified growth driver.",
    "No exceptional item appears in the three quarter columns. The ₹3.83 crore labour-code provision shown as exceptional relates to the year ended 31 Mar 2026, not the current quarter.",
    "Selected checked coverage from the original filing. The board outcome and subsequent financial-result notice are counted once, not as two company results. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/3d816d99-0925-4c22-a04d-71e9fa387b1b.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:34:05 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "P N Gadgil Jewellers",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "2,666.38",
      "yoy": "2,177.62 (+22.44%)",
      "qoq": "2,412.98 (+10.50%)"
    },
    {
      "label": "Net profit attributable to shareholders",
      "current": "121.11",
      "yoy": "79.31 (+52.70%)",
      "qoq": "105.34 (+14.98%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "8.69",
      "yoy": "5.84 (+48.80%)",
      "qoq": "7.76 (+11.98%)"
    }
  ],
  "summary": "P N Gadgil Jewellers reported consolidated revenue of ₹2,666.38 crore, up 22.44% year on year and 10.50% from June. Profit attributable to shareholders rose to ₹121.11 crore, compared with ₹79.31 crore a year ago and ₹105.34 crore in June. Reported basic EPS was ₹8.69.",
  "caveats": [
    "Source: consolidated statement on PDF page 7 and notes on page 10. Original ₹ million amounts are divided by 10 for crore; changes use original values before rounding. EPS is reported and not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Current consolidated PAT is fully attributed to shareholders in the statement; the adjacent standalone table is not mixed into this summary.",
    "The consolidated group includes Gadgil Diamonds Private Limited in India and PNG Jewelers, Inc. in the USA. It reports one jewellery-business segment.",
    "During the period the company raised ₹700 crore through a QIP and allotted 1,14,94,252 shares. Reported EPS uses the applicable share basis and need not grow at the same rate as PAT.",
    "The QIP note reports ₹23.23 crore of issue expenses adjusted against securities premium. These equity-issue costs are not treated here as a charge in quarterly PAT. No adjusted PAT is inferred.",
    "No exceptional item was reported in these three quarter columns. Nominal revenue growth alone does not establish sales-volume growth.",
    "Selected checked coverage from the original filing; board-outcome and result notices are not counted as separate company results. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/164ff9d6-a0c4-4fda-8780-c4574c1f3395.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:32:13 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Equitas Small Finance Bank",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Bank standalone, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share and NPA ratios in %",
  "rows": [
    {
      "label": "Total income",
      "current": "2,357.51",
      "yoy": "1,846.29 (+27.69%)",
      "qoq": "2,215.50 (+6.41%)"
    },
    {
      "label": "Net interest income (computed)",
      "current": "1,025.71",
      "yoy": "773.68 (+32.58%)",
      "qoq": "1,029.59 (-0.38%)"
    },
    {
      "label": "Net profit after tax",
      "current": "218.04",
      "yoy": "24.14 (+803.41%)",
      "qoq": "183.61 (+18.75%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "1.91",
      "yoy": "0.21",
      "qoq": "1.61"
    },
    {
      "label": "Gross NPA ratio (%)",
      "current": "2.29%",
      "yoy": "2.92%",
      "qoq": "2.42%"
    },
    {
      "label": "Net NPA ratio (%)",
      "current": "0.70%",
      "yoy": "0.98%",
      "qoq": "0.71%"
    }
  ],
  "summary": "Equitas Small Finance Bank reported total income of ₹2,357.51 crore and net profit of ₹218.04 crore, compared with ₹24.14 crore a year ago and ₹183.61 crore in June. Computed net interest income was ₹1,025.71 crore. The profit comparison needs a material caveat: the bank reversed ₹84.63 crore of excess provisions following sales of non-performing advances to an asset reconstruction company.",
  "caveats": [
    "Source: bank statement on PDF page 3 and notes on pages 7-8. Original ₹ lakh amounts are divided by 100 for crore; percentages use original figures before rounding. EPS is reported, not annualised.",
    "Bank-specific measures are used instead of industrial revenue/EBITDA. Net interest income is computed as interest earned minus interest expended: ₹2,065.9953 crore minus ₹1,040.2825 crore in the current quarter. No NIM or EBITDA is inferred.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. The previous-quarter net-PAT line is ₹18,360.69 lakh, matching profit before tax less tax. The preceding ordinary-profit line prints ₹18,360.89 lakh; this ₹0.20 lakh source discrepancy is not silently reconciled.",
    "Current provisions other than tax were ₹114.99 crore versus ₹207.02 crore a year ago and ₹160.66 crore in June. Note 11 reports ₹84.63 crore of excess-provision reversal on NPA sales to an ARC. Reported PAT is not an adjusted or recurring-profit estimate.",
    "GNPA/NNPA ratios are the bank's reported asset-quality measures at the period ends, not growth rates. Gross NPA amount was ₹1,086.30 crore and net NPA ₹324.99 crore as of 30 Sep 2026.",
    "The bank states it had no subsidiary, associate or joint venture as of 30 Sep 2026, so it was not required to publish consolidated results.",
    "Selected checked coverage; multiple debt-scrip notices with this same attachment are counted once. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/6f889d64-cb01-49b0-a5ef-e74e55b30519.pdf",
  "sourceName": "BSE bank statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:04:57 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Aplab",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Standalone, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "10.83",
      "yoy": "17.35 (-37.58%)",
      "qoq": "9.61 (+12.67%)"
    },
    {
      "label": "Net profit / (loss) after tax",
      "current": "-0.61",
      "yoy": "1.61 (profit to loss)",
      "qoq": "-2.52 (loss narrowed 75.88%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "-0.39",
      "yoy": "1.04",
      "qoq": "-1.60"
    }
  ],
  "summary": "Aplab reported standalone revenue of ₹10.83 crore, down 37.58% year on year but up 12.67% sequentially. It recorded a net loss of ₹0.61 crore versus a ₹1.61 crore profit a year ago. The loss was smaller than June's ₹2.52 crore, but the company remained loss-making.",
  "caveats": [
    "Source: standalone statement and notes on PDF page 3. Original values are ₹ lakh, divided by 100 for crore. Changes use original lakh figures before display rounding; EPS is reported and not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. The year-on-year profit-to-loss change is not given a growth percentage. Sequential loss narrowing compares absolute loss amounts.",
    "Current pre-tax loss was ₹1.38 crore. A deferred-tax credit of ₹0.77 crore reduced the net loss; reported net loss is not an operating-profit measure.",
    "No exceptional item was reported for these three quarter columns. The note about a ₹0.59 crore Labour Codes cost relates to the year ended March 2026, not a new September-quarter charge.",
    "This is the company's stated standalone basis. It reports one electronic-equipment segment. No consolidated attribution or adjusted PAT is inferred.",
    "Selected checked coverage from the original filing. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/aa961b45-33a5-482b-b97c-f5680ede02d3.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:15:30 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Ind-Swift Laboratories",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Standalone only, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "234.89",
      "yoy": "156.43 (+50.15%)",
      "qoq": "186.08 (+26.23%)"
    },
    {
      "label": "Net profit after tax",
      "current": "31.03",
      "yoy": "8.76 (+254.33%)",
      "qoq": "24.44 (+26.94%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "3.57",
      "yoy": "1.09 (+227.52%)",
      "qoq": "2.81 (+27.05%)"
    }
  ],
  "summary": "On a standalone basis, Ind-Swift Laboratories reported revenue of ₹234.89 crore, up 50.15% year on year and 26.23% sequentially. Reported net profit was ₹31.03 crore, compared with ₹8.76 crore a year ago and ₹24.44 crore in June. These are parent-company figures, not consolidated group profit. Interim PAT excludes any deferred-tax adjustment, which the filing says will be provided at year end.",
  "caveats": [
    "Source: standalone statement on PDF page 4 and notes on pages 13-14. Original ₹ lakh amounts are divided by 100 for crore; changes use original figures before display rounding. EPS is reported and not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Standalone coverage is deliberate: the separate consolidated table is not mixed with this statement, and no owners-attributable group PAT is inferred.",
    "The company says no deferred-tax adjustment has been made under Ind AS 12 because it will be provided at year end. This is a material basis limitation on the reported interim PAT; no normalised tax or adjusted PAT is estimated.",
    "Exceptional expense of ₹0.58 crore relates to balances written back/written off on amounts no longer payable/receivable; it was ₹0.24 crore in June and nil a year ago. Reported PAT retains those items.",
    "Reported standalone basic EPS is ₹3.57 versus ₹1.09 a year ago and ₹2.81 in June; diluted EPS is ₹3.56 versus ₹1.05 and ₹2.81. No per-share figures are inferred from closing capital.",
    "Selected checked coverage from the original filing. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/b7c4cfe4-5a2f-483e-a52e-dc13318374e3.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 15:07:59 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "HeidelbergCement India",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Company financial results, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "567.78",
      "yoy": "511.66 (+10.97%)",
      "qoq": "628.11 (-9.61%)"
    },
    {
      "label": "Net profit after tax",
      "current": "16.77",
      "yoy": "24.93 (-32.73%)",
      "qoq": "30.55 (-45.11%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "0.74",
      "yoy": "1.10 (-32.73%)",
      "qoq": "1.35 (-45.19%)"
    }
  ],
  "summary": "HeidelbergCement India reported revenue of ₹567.78 crore, up 10.97% year on year but down 9.61% from June. Net profit fell to ₹16.77 crore, down 32.73% year on year and 45.11% sequentially. Higher revenue did not translate into higher profit.",
  "caveats": [
    "Source: company financial statement on PDF page 4 and notes on page 7. Original values are ₹ million, converted to ₹ crore by dividing by 10. EPS is reported, not annualised.",
    "The filing presents one company statement, not separate standalone and consolidated tables. This summary retains that stated company basis and does not label it a consolidated group result.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use the printed values. No exceptional charge appears in any of these three quarter columns.",
    "The ₹8.04 crore Labour Codes exceptional charge in the annual March 2026 column is not a September-quarter charge. No adjusted PAT is inferred.",
    "Power and fuel expense rose to ₹153.18 crore from ₹148.27 crore a year ago; freight was ₹75.51 crore versus ₹73.68 crore. These are reported costs, not a complete attribution of the profit decline.",
    "Selected original-source coverage. The BSE notices at 14:24:23 and 14:29:14 link byte-identical documents and are counted once. Raw RSS time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/1ce9dace-e99a-451e-98fa-1d063a4d3680.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:24:23 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Wheels India",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "1,710.95",
      "yoy": "1,263.97 (+35.36%)",
      "qoq": "1,491.00 (+14.75%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "59.42",
      "yoy": "30.90 (+92.30%)",
      "qoq": "38.32 (+55.06%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "24.21",
      "yoy": "12.65 (+91.38%)",
      "qoq": "15.68 (+54.40%)"
    }
  ],
  "summary": "Wheels India reported consolidated revenue of ₹1,710.95 crore, up 35.36% year on year and 14.75% sequentially. Profit attributable to owners rose to ₹59.42 crore from ₹30.90 crore a year ago and ₹38.32 crore in the June quarter. Reported basic EPS was ₹24.21.",
  "caveats": [
    "Source: consolidated columns on PDF page 3; notes on page 4. Amounts are ₹ crore except reported, non-annualised EPS in ₹ per share. The adjacent standalone columns are not mixed into this summary.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use the rounded figures printed in this filing.",
    "Owners' PAT is ₹59.42 crore, not total consolidated PAT of ₹60.16 crore. The reported non-controlling share is ₹0.75 crore; the displayed components differ from the total by ₹0.01 crore. All three figures are retained as printed, without forcing a reconciliation.",
    "The filing recasts previous-period consolidated figures after the merger of Forge 2000 into associate Axles India, effective 1 Apr 2025. Comparisons here use those recast figures, not earlier releases.",
    "Paid-up capital increased during the quarter following preferential and QIB share allotments, with proceeds used to repay debt. Reported EPS reflects the applicable weighted share count and should not be inferred from closing share capital.",
    "Consolidated profit before tax includes ₹3.76 crore share of associate profit versus ₹2.12 crore a year ago and ₹2.66 crore in the June quarter. No adjusted PAT is inferred.",
    "Selected checked coverage from the original statement; repeated outcome and press-release notices are not additional company results. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/5AB6F8ED-5CB6-4A2C-8BD5-6E38823971CB-145313.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:53:23 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Dwarikesh Sugar Industries",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Standalone, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "256.59",
      "yoy": "245.93 (+4.33%)",
      "qoq": "358.13 (-28.35%)"
    },
    {
      "label": "Net profit / (loss) after tax",
      "current": "-13.12",
      "yoy": "-32.62 (loss narrowed 59.80%)",
      "qoq": "-25.73 (loss narrowed 49.03%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "-0.71",
      "yoy": "-1.76",
      "qoq": "-1.39"
    }
  ],
  "summary": "Dwarikesh Sugar reported revenue of ₹256.59 crore, up 4.33% year on year but down 28.35% from the June quarter. Its net loss narrowed to ₹13.12 crore from ₹32.62 crore a year ago and ₹25.73 crore in the previous quarter. A narrower loss is not a return to profit.",
  "caveats": [
    "Source: statement on PDF page 4 and notes on page 7. Original amounts are ₹ lakh, converted to ₹ crore by dividing by 100. Percentages use the original lakh values before rounding; EPS is reported, not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Loss-narrowing percentages compare absolute loss amounts, not profit growth.",
    "The company states it had no subsidiary, associate or joint venture as of 30 Sep 2026, so this is standalone coverage. No consolidated basis is implied.",
    "The filing warns that the seasonal sugar industry makes a quarter an unreliable proportional guide to annual performance. The sequential revenue decline should be read in that context.",
    "Current loss before tax was ₹17.52 crore; a deferred-tax credit of ₹4.40 crore reduced the reported net loss. No exceptional item was reported for the quarter.",
    "Selected checked coverage from the original filing. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/bd69baf5-f5fe-43f0-8b10-d96dfa925ea6.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:54:13 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Greaves Cotton",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "1,175.91",
      "yoy": "815.46 (+44.20%)",
      "qoq": "974.12 (+20.72%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "4.82",
      "yoy": "26.01 (-81.47%)",
      "qoq": "25.77 (-81.30%)"
    },
    {
      "label": "Total consolidated profit / (loss) after tax",
      "current": "-29.81",
      "yoy": "6.32 (profit to loss)",
      "qoq": "6.16 (profit to loss)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "0.20",
      "yoy": "1.12 (-82.14%)",
      "qoq": "1.11 (-81.98%)"
    }
  ],
  "summary": "Greaves Cotton reported revenue of ₹1,175.91 crore, up 44.20% year on year and 20.72% sequentially. Profit attributable to owners fell to ₹4.82 crore, while the group recorded a total consolidated loss of ₹29.81 crore. These are different attribution bases: non-controlling interests absorbed ₹34.63 crore of losses.",
  "caveats": [
    "Source: consolidated statement, PDF page 10, and notes page 14. Values are ₹ crore, except reported basic EPS in ₹ per share; EPS is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Percentages use reported rounded values. The total-PAT row labels a switch from profit to loss rather than a misleading growth rate.",
    "Current exceptional expense of ₹32.75 crore comprises ₹12.66 crore of abandoned subsidiary IPO costs and ₹20.09 crore of goodwill/brand impairment. Prior-quarter exceptional expense was nil; year-ago expense was ₹3.58 crore. Reported profits retain these items.",
    "The electric-mobility subsidiary accelerated depreciation by ₹7.75 crore and brand amortisation by ₹19.55 crore after useful-life reviews. These charges affect the quarter; no adjusted PAT is inferred.",
    "Total group PAT is not owners' PAT. Owners' profit plus the non-controlling loss reconciles to the total consolidated loss; basic EPS uses the owners' basis.",
    "No industrial EBITDA/margin is imposed on this mixed group, which includes vehicle finance as well as engines and electric mobility.",
    "Selected checked coverage from the original filing. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/bc014ca2-6ff1-4ef8-ade5-c94a845412dc.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:42:54 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Welspun Corp",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "4,643.72",
      "yoy": "4,373.61 (+6.18%)",
      "qoq": "4,081.12 (+13.79%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "498.56",
      "yoy": "439.68 (+13.39%)",
      "qoq": "1,046.49 (-52.36%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "18.91",
      "yoy": "16.70 (+13.23%)",
      "qoq": "39.68 (-52.34%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "726.74",
      "yoy": "591.10 (+22.95%)",
      "qoq": "692.34 (+4.97%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "15.65%",
      "yoy": "13.52%",
      "qoq": "16.96%"
    }
  ],
  "summary": "Welspun Corp reported September-quarter revenue of ₹4,643.72 crore, up 6.18% year on year and 13.79% sequentially. Profit attributable to owners was ₹498.56 crore, up 13.39% year on year. The sequential profit decline reflects a previous-quarter ₹547.93 crore gain on sale of associate shares, so it is not a clean operating comparison.",
  "caveats": [
    "Source: consolidated statement, PDF page 9, and notes page 10. Values are ₹ crore, except reported basic EPS in ₹ per share; EPS is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Percentage changes use the reported rounded statement values.",
    "EBITDA is computed from profit before exceptional items, share of JV/associate profit and tax, plus finance costs, plus depreciation and amortisation, minus other income. It excludes JV/associate contributions and the gain on sale of associate shares. Margin divides this measure by revenue from operations.",
    "The previous quarter included ₹547.93 crore profit on sale of East Pipes associate shares. This remains in the reported owners-profit comparison; no adjusted PAT is inferred.",
    "Owners' PAT of ₹498.56 crore differs from total PAT of ₹495.09 crore due to a ₹3.47 crore non-controlling loss. Total PAT was ₹1,047.88 crore previous quarter and ₹443.51 crore year ago.",
    "Welspun Captive Power Generation became a subsidiary during this quarter after an additional 51% stake purchase, changing the group scope. The statement shows a current-tax credit of ₹57.84 crore and deferred-tax expense of ₹218.33 crore.",
    "Selected checked coverage from the original filing, not raw RSS republication. Raw RSS notice time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/bd5b2914-a870-4538-86ac-cf6a854f393b.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:35:21 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Ambuja Cements",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "9,166",
      "yoy": "9,130 (+0.39%)",
      "qoq": "9,474 (-3.25%)"
    },
    {
      "label": "Profit before tax",
      "current": "298",
      "yoy": "883 (-66.25%)",
      "qoq": "848 (-64.86%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "193",
      "yoy": "1,774 (-89.12%)",
      "qoq": "577 (-66.55%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "0.78",
      "yoy": "7.19 (-89.15%)",
      "qoq": "2.32 (-66.38%)"
    }
  ],
  "summary": "Ambuja Cements reported September-quarter revenue from operations of ₹9,166 crore, up 0.39% year on year and down 3.25% sequentially. Profit attributable to owners was ₹193 crore versus ₹1,774 crore a year earlier. The profit comparison is distorted by a large tax credit in the year-ago quarter; acquisition scope and restatements also affect comparability.",
  "caveats": [
    "Source: consolidated statement, PDF page 19; restatement note page 23, tax note page 24 and exceptional-items table page 26. Values are rounded to the nearest ₹ crore; EPS is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025, using the restated comparative figures in this filing; previous quarter is 30 Jun 2026. Percentages use the displayed rounded values.",
    "The year-ago quarter had a ₹1,453 crore net tax credit, including ₹1,710 crore of prior-period tax writebacks/adjustments, versus ₹62 crore tax expense in the current quarter. The PAT decline is not a clean operating-growth measure.",
    "Current exceptional expense was ₹85 crore for voluntary severance, versus ₹24 crore sequentially and ₹223 crore a year earlier. No adjusted PAT has been inferred.",
    "Owners' profit excludes ₹43 crore of non-controlling interests; total consolidated PAT was ₹236 crore. Prior owners' PAT was ₹577 crore and year-ago owners' PAT ₹1,774 crore.",
    "The filing restates year-ago results for the final Orient Cement purchase-price allocation. It also flags limited comparability from Adani Cementation/Adani Cement Industries consolidation from August 2025.",
    "Revenue shown excludes separately disclosed government grants: ₹31 crore current, ₹26 crore previous and ₹45 crore year ago. Selected checked coverage; raw RSS time has no timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/e0c0cfdf-78b1-4b8a-b879-350be59d438c.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:32:23 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Senores Pharmaceuticals",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "192.33",
      "yoy": "153.94 (+24.94%)",
      "qoq": "180.21 (+6.73%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "57.66",
      "yoy": "41.69 (+38.31%)",
      "qoq": "53.76 (+7.25%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "29.98%",
      "yoy": "27.08%",
      "qoq": "29.83%"
    },
    {
      "label": "Net profit attributable to equity holders",
      "current": "39.49",
      "yoy": "32.38 (+21.96%)",
      "qoq": "30.72 (+28.55%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "8.85",
      "yoy": "6.54 (+35.32%)",
      "qoq": "6.61 (+33.89%)"
    }
  ],
  "summary": "Senores Pharmaceuticals' September-quarter revenue rose 24.94% year on year to ₹192.33 crore. Profit attributable to equity holders was ₹39.49 crore, up 21.96% year on year. The defined operating EBITDA margin was 29.98%, compared with 27.08% a year earlier.",
  "caveats": [
    "The group acquired 75% of Apnar Pharma on 16 Jan 2026 and consolidated it from acquisition; year-on-year comparisons therefore include a changed group perimeter.",
    "Source: consolidated statement, PDF page 5. Values are ₹ crore, except reported basic EPS in ₹ per share; EPS is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Changes use reported statement values; EPS changes use reported rounded EPS.",
    "EBITDA is computed as profit before tax plus finance costs plus depreciation and amortisation minus other income. Margin is this measure divided by revenue from operations.",
    "Equity-holder profit of ₹39.49 crore is higher than total consolidated PAT of ₹36.60 crore because non-controlling interests recorded a ₹2.89 crore loss. The same attribution basis is used for comparisons.",
    "Detected through RSS and separately checked against the original statement. Raw notice timestamp has no supplied timezone suffix; this is selected checked coverage."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/aea5b6ce-116a-4f25-9b60-459ed53a4bbd.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 13:56:12 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Grindwell Norton",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "883.67",
      "yoy": "774.74 (+14.06%)",
      "qoq": "803.29 (+10.01%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "166.45",
      "yoy": "140.67 (+18.33%)",
      "qoq": "157.01 (+6.01%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "18.84%",
      "yoy": "18.16%",
      "qoq": "19.55%"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "132.70",
      "yoy": "106.88 (+24.16%)",
      "qoq": "115.51 (+14.88%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "11.99",
      "yoy": "9.65 (+24.25%)",
      "qoq": "10.43 (+14.96%)"
    }
  ],
  "summary": "Grindwell Norton's September-quarter revenue was ₹883.67 crore, up 14.06% year on year. Profit attributable to owners was ₹132.70 crore, up 24.16% year on year. The defined operating EBITDA margin was 18.84%, versus 18.16% a year earlier.",
  "caveats": [
    "Source: unaudited consolidated statement, PDF page 10. Original ₹ lakh divided by 100 for ₹ crore; EPS is ₹ per share and not annualised. Changes use source values before display rounding.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026.",
    "EBITDA is computed from profit before exceptional items and tax, plus finance costs, plus depreciation and amortisation, minus other income. Margin is this measure divided by revenue from operations.",
    "Detected through RSS and separately checked against the original statement. Raw notice timestamp has no supplied timezone suffix; this is selected checked coverage.",
    "Operating EBITDA starts before the share of joint-venture profit, so excludes that non-operating contribution. PAT shown is attributable to owners; current total profit including non-controlling interest is ₹133.17 crore."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/5f504c27-3524-4d01-a5b7-048fcb47c098.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:16:58 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Jasch Industries",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Standalone, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "84.81",
      "yoy": "51.62 (+64.31%)",
      "qoq": "75.26 (+12.68%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "2.10",
      "yoy": "4.17 (-49.56%)",
      "qoq": "6.32 (-66.76%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "2.48%",
      "yoy": "8.07%",
      "qoq": "8.40%"
    },
    {
      "label": "Net profit",
      "current": "0.58",
      "yoy": "2.09 (-72.23%)",
      "qoq": "3.81 (-84.75%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "0.86",
      "yoy": "3.08 (-72.08%)",
      "qoq": "5.61 (-84.67%)"
    }
  ],
  "summary": "Jasch Industries's September-quarter revenue was ₹84.81 crore, up 64.31% year on year. Net profit was ₹0.58 crore, down 72.23% year on year. The defined operating EBITDA margin was 2.48%, versus 8.07% a year earlier.",
  "caveats": [
    "Source: unaudited standalone statement, PDF page 2/3 for EPS. Original ₹ lakh divided by 100 for ₹ crore; EPS is ₹ per share and not annualised. Changes use source values before display rounding.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026.",
    "EBITDA is computed from profit before exceptional items and tax, plus finance costs, plus depreciation and amortisation, minus other income. Margin is this measure divided by revenue from operations.",
    "Detected through RSS and separately checked against the original statement. Raw notice timestamp has no supplied timezone suffix; this is selected checked coverage.",
    "Prior September quarter had ₹0.12 crore exceptional expense. EBITDA uses profit before this expense; PAT comparisons use reported profit after it. Current-quarter profit fell despite revenue growth, with production costs rising sharply."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/8305178f-49f9-4ed8-8771-95a4c03ed80d.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:17:22 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Tips Films",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Standalone, unaudited",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Net sales / income from operations",
      "current": "62.07",
      "yoy": "56.49 (+9.88%)",
      "qoq": "47.96 (+29.41%)"
    },
    {
      "label": "Net loss after tax",
      "current": "-0.54",
      "yoy": "-14.25 (loss narrowed)",
      "qoq": "-29.41 (loss narrowed)"
    },
    {
      "label": "Basic and diluted EPS (₹ per share)",
      "current": "-1.24",
      "yoy": "-32.97",
      "qoq": "-68.04"
    }
  ],
  "summary": "Tips Films reported net sales of ₹62.07 crore, up 9.88% year on year. Its net loss narrowed to ₹0.54 crore from ₹14.25 crore a year earlier and ₹29.41 crore in the June quarter. Basic and diluted loss per share was ₹1.24.",
  "caveats": [
    "Source: unaudited statement, PDF page 3; consolidated statements are not applicable per the filing. Original ₹ lakh values divided by 100 for ₹ crore display. Changes use unrounded values; EPS remains ₹ per share.",
    "Revenue shown is net sales/income from operations, excluding other income; total income including other income is ₹62.30 crore. Year ago is 30 Sep 2025 quarter; previous quarter is 30 Jun 2026.",
    "Losses are shown with negative signs. Percentage profit/EPS growth is omitted because comparison periods are losses. The prior September quarter included a ₹1.60 crore current-tax credit.",
    "Detected through RSS and separately checked against the original statement. Raw notice timestamp has no supplied timezone suffix; this is selected checked coverage."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/86ea7367-4c29-41f3-9e42-ceebac08799a.pdf",
  "sourceName": "BSE statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:04:05 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Man Infraconstruction",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited Ind AS",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "266.01",
      "yoy": "169.20 (+57.21%)",
      "qoq": "218.31 (+21.85%)"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "62.76",
      "yoy": "55.21 (+13.67%)",
      "qoq": "71.64 (-12.40%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "1.56",
      "yoy": "1.38 (+13.04%)",
      "qoq": "1.77 (-11.86%)"
    }
  ],
  "summary": "Man Infraconstruction's September-quarter revenue was ₹266.01 crore, up 57.21% year on year. Profit attributable to owners was ₹62.76 crore, up 13.67% year on year but 12.40% below the June quarter.",
  "caveats": [
    "Source: consolidated statement, PDF page 6. Original ₹ lakh values divided by 100 to display ₹ crore; changes use unrounded statement amounts. EPS remains ₹ per share and is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Profit attributable to owners is taken from profit after tax and non-controlling interest, not total consolidated profit.",
    "Starting this financial year, interest from loans to real-estate joint ventures and associates is classified as other operating revenue because it is part of primary revenue-generating activity; comparatives have been reclassified, per note 2. EBITDA and operating margin are omitted rather than treating that financing revenue as comparable industrial EBITDA.",
    "The June quarter included a deferred-tax credit. These are reported PAT comparisons, not adjusted recurring-profit comparisons.",
    "Detected through RSS and separately checked against the original statement. This selected summary is not unattended automatic publication or complete market coverage; raw RSS notice time has no supplied timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/9cbf32a4-9e25-4326-8e6d-0caef06dd0de.pdf",
  "sourceName": "BSE consolidated statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 13:51:32 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
{
  "company": "Asian Paints",
  "quarterLabel": "Q2 FY2027",
  "periodEnded": "30 Sep 2026",
  "basis": "Consolidated, unaudited Ind AS",
  "currencyUnit": "₹ crore, except EPS in ₹/share",
  "rows": [
    {
      "label": "Revenue from operations",
      "current": "9976.51",
      "yoy": "8531.27 (+16.94%)",
      "qoq": "10541.94 (-5.36%)"
    },
    {
      "label": "EBITDA (computed, see note)",
      "current": "1557.07",
      "yoy": "1503.38 (+3.57%)",
      "qoq": "2168.76 (-28.20%)"
    },
    {
      "label": "EBITDA margin (computed)",
      "current": "15.61%",
      "yoy": "17.62%",
      "qoq": "20.57%"
    },
    {
      "label": "Net profit attributable to owners",
      "current": "1067.63",
      "yoy": "993.59 (+7.45%)",
      "qoq": "1539.25 (-30.64%)"
    },
    {
      "label": "Basic EPS (₹ per share)",
      "current": "11.14",
      "yoy": "10.37 (+7.43%)",
      "qoq": "16.06 (-30.64%)"
    }
  ],
  "summary": "Asian Paints' September-quarter revenue rose 16.94% year on year to ₹9976.51 crore. Profit attributable to owners rose 7.45% to ₹1067.63 crore, but was 30.64% below the June quarter. The defined operating EBITDA margin was 15.61%.",
  "caveats": [
    "Source: unaudited consolidated statement, PDF page 12. Statement monetary values are ₹ crore; EPS remains ₹ per share and is not annualised.",
    "Year ago is the quarter ended 30 Sep 2025; previous quarter is 30 Jun 2026. Percentage changes use the reported values; EPS comparisons use reported rounded EPS.",
    "EBITDA is computed as profit before share of associates, exceptional items and tax, plus finance costs, plus depreciation and amortisation, minus other income. Margin is this measure divided by revenue from operations. Share of associates is excluded, rather than treated as operating profit.",
    "Profit shown is attributable to owners, excluding non-controlling interest. Total consolidated profit for the current quarter is ₹1085.35 crore, including ₹17.72 crore of non-controlling interest.",
    "Detected through RSS and separately checked against the original statement. This selected summary is not unattended automatic publication or complete market coverage; raw RSS notice time has no supplied timezone suffix."
  ],
  "sourceUrl": "https://www.bseindia.com/xml-data/corpfiling/AttachLive/e20392a9-cbd5-4271-9ad1-450cad3ff835.pdf",
  "sourceName": "BSE consolidated statement; RSS notice timestamp",
  "sourceDisseminatedAt": "29-Oct-2026 14:03:11 (raw source time)",
  "verifiedAt": "29 Oct 2026"
},
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
