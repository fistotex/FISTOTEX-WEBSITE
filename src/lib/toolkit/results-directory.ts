export type ResultsDirectoryEntry = {
  company: string;
  quarterLabel: string;
  quarterEnded: string;
  status: "published" | "scheduled";
  dateLabel: string;
  sourceUrl: string;
  sourceName: string;
};

export const RESULTS_DIRECTORY_REVIEWED_ON = "23 Oct 2026";

// Hand-verified entries. Each row is checked against the company's own
// investor-relations page or press release before it is listed, and we only
// link out - figures and reports stay on the company's website.
export const RESULTS_DIRECTORY: ResultsDirectoryEntry[] = [
  {
    company: "Infosys",
    quarterLabel: "Q2 FY2027",
    quarterEnded: "30 Sep 2026",
    status: "published",
    dateLabel: "23 Oct 2026",
    sourceUrl:
      "https://www.infosys.com/investors/reports-filings/quarterly-results/2026-2027/q2.html",
    sourceName: "infosys.com",
  },
  {
    company: "Wipro",
    quarterLabel: "Q2 FY2027",
    quarterEnded: "30 Sep 2026",
    status: "published",
    dateLabel: "15 Oct 2026",
    sourceUrl:
      "https://www.wipro.com/newsroom/press-releases/2026/wipro-announces-results-for-the-quarter-ended-september-30-2026/",
    sourceName: "wipro.com",
  },
  {
    company: "Tata Consultancy Services",
    quarterLabel: "Q2 FY2027",
    quarterEnded: "30 Sep 2026",
    status: "published",
    dateLabel: "8 Oct 2026",
    sourceUrl:
      "https://www.tcs.com/who-we-are/newsroom/press-release/tcs-financial-results-q2-fy-2027",
    sourceName: "tcs.com",
  },
];

export type ResultsArchiveEntry = {
  company: string;
  /** Official investor-relations / results archive page, verified live and terms-checked. */
  sourceUrl: string;
  sourceName: string;
};

export const RESULTS_ARCHIVE_REVIEWED_ON = "23 Oct 2026";

// Official results/IR archive pages. Each URL was fetched and confirmed to be
// the company's own results or investor-relations page, and the company's
// terms/disclaimer page was read for linking restrictions before inclusion
// (companies whose terms restrict linking are left out). These are NOT dated
// quarterly-result verifications - the latest quarter on each page is not
// separately confirmed.
export const RESULTS_ARCHIVE: ResultsArchiveEntry[] = [
  { company: "Axis Bank", sourceUrl: "https://www.axisbank.com/shareholders-corner/financial-results-and-other-information/quarterly-results", sourceName: "axisbank.com" },
  { company: "Bajaj Auto", sourceUrl: "https://www.bajajauto.com/investors/financial-and-operational-performance", sourceName: "bajajauto.com" },
  { company: "Bajaj Finance", sourceUrl: "https://www.bajajfinserv.in/finance-investor-relations-financial-results", sourceName: "bajajfinserv.in" },
  { company: "Dabur", sourceUrl: "https://www.dabur.com/investor/financial-information/results", sourceName: "dabur.com" },
  { company: "HDFC Bank", sourceUrl: "https://www.hdfcbank.com/personal/about-us/investor-relations/financial-results", sourceName: "hdfcbank.com" },
  { company: "HCL Technologies", sourceUrl: "https://www.hcltech.com/investors", sourceName: "hcltech.com" },
  { company: "Hindalco Industries", sourceUrl: "https://www.hindalco.com/investors/financial-performance/results-reports-presentations", sourceName: "hindalco.com" },
  { company: "Hindustan Unilever", sourceUrl: "https://www.hul.co.in/investors/results-and-presentations/quarterly-results-and-webcasts/", sourceName: "hul.co.in" },
  { company: "ICICI Bank", sourceUrl: "https://www.icicibank.com/about-us/qfr", sourceName: "icicibank.com" },
  { company: "ITC", sourceUrl: "https://itcportal.com/investors/quarterly-results.html", sourceName: "itcportal.com" },
  { company: "JSW Steel", sourceUrl: "https://www.jswsteel.in/quarterly-reports", sourceName: "jswsteel.in" },
  { company: "Mahindra & Mahindra", sourceUrl: "https://www.mahindra.com/investor-relations", sourceName: "mahindra.com" },
  { company: "Sun Pharmaceutical", sourceUrl: "https://sunpharma.com/board-meeting-financial-results/", sourceName: "sunpharma.com" },
  { company: "Tata Steel", sourceUrl: "https://www.tatasteel.com/investors/financial-performance/financial-results/", sourceName: "tatasteel.com" },
  { company: "Tech Mahindra", sourceUrl: "https://www.techmahindra.com/en-in/investors/", sourceName: "techmahindra.com" },
  { company: "UltraTech Cement", sourceUrl: "https://www.ultratechcement.com/corporate/investors-/financials-", sourceName: "ultratechcement.com" },
  { company: "Zomato (Eternal)", sourceUrl: "https://www.zomato.com/investor-relations", sourceName: "zomato.com" },
  { company: "Adani Enterprises", sourceUrl: "https://www.adanienterprises.com/investors", sourceName: "adanienterprises.com" },
  { company: "Britannia Industries", sourceUrl: "https://www.britannia.co.in/investors", sourceName: "britannia.co.in" },
  { company: "Coal India", sourceUrl: "https://www.coalindia.in/performance/financial-statements/", sourceName: "coalindia.in" },
  { company: "DLF", sourceUrl: "https://www.dlf.in/investor", sourceName: "dlf.in" },
  { company: "Hero MotoCorp", sourceUrl: "https://www.heromotocorp.com/en-in/investors.html", sourceName: "heromotocorp.com" },
  { company: "Kotak Mahindra Bank", sourceUrl: "https://www.kotak.com/en/investor-relations.html", sourceName: "kotak.com" },
  { company: "Lupin", sourceUrl: "https://www.lupin.com/investors/", sourceName: "lupin.com" },
];
