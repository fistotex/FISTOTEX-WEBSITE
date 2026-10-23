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
