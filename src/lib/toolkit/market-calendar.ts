/**
 * Market-moving event calendar.
 *
 * Data policy: every dated entry below comes from an official, publicly
 * published source (RBI press releases, NSE circulars, the US Federal
 * Reserve calendar, MoSPI's advance release calendar). Sources are listed
 * per group. Past entries use the actual officially published release dates.
 * The data is reviewed and re-verified against those sources on
 * a monthly cadence; the "reviewedOn" stamp shows when that last happened.
 * Timed entries carry the organiser's official release time as a UTC instant
 * and are displayed in IST; an asterisk marks times the source itself lists
 * as approximate. Only official previous figures are shown, never forecasts.
 *
 * F&O expiry dates are COMPUTED from the exchange's current expiry-day
 * convention (NSE: Tuesday; BSE: Thursday), shifted back to the previous
 * trading day when the expiry day is a trading holiday.
 */

export type EventKind =
  | "rbi"
  | "global-central-bank"
  | "expiry"
  | "budget"
  | "macro-data"
  | "results-season"
  | "holiday"
  | "special-session";

export interface MarketEvent {
  /** ISO date (yyyy-mm-dd). For multi-day meetings, the decision day. */
  date: string;
  /** Optional span label, e.g. "Dec 2-4" for a 3-day meeting. */
  span?: string;
  /** ISO end date when a span is still ongoing; keeps it out of the "past" group. */
  spanEnd?: string;
  title: string;
  kind: EventKind;
  /** true = expect an outsized move that day; flagged in the UI. */
  volatile: boolean;
  note?: string;
  /** UTC instant of the event start, when the organiser publishes an exact time; drives the IST time display and the countdown. */
  instantUTC?: string;
  /** true when the source itself lists the time as approximate. */
  timeApprox?: boolean;
  /** Currency the event primarily moves, e.g. "USD". */
  currency?: string;
  /** The previous officially published figure, with its basis. Forecasts are never shown. */
  previous?: string;
  /** Official released figures, with period and measurement basis. Absent until checked. */
  actual?: string;
  /** The organiser's own page for this specific event. */
  source?: { label: string; href: string };
}

/** NSE/BSE trading holidays remaining in the current calendar year (NSE circular CMTR71775, Dec 12 2025). */
export const TRADING_HOLIDAYS_2026: Record<string, string> = {
  "2026-09-14": "Ganesh Chaturthi",
  "2026-10-02": "Mahatma Gandhi Jayanti",
  "2026-10-20": "Dussehra",
  "2026-11-10": "Diwali - Balipratipada",
  "2026-11-24": "Prakash Gurpurb (Sri Guru Nanak Dev Jayanti)",
  "2026-12-25": "Christmas",
};

export const TRADING_HOLIDAYS_2027: Record<string, string> = {
  "2027-01-26": "Republic Day",
};

const HOLIDAYS: Record<string, string> = { ...TRADING_HOLIDAYS_2026, ...TRADING_HOLIDAYS_2027 };

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function isTradingDay(d: Date): boolean {
  const day = d.getUTCDay();
  return day !== 0 && day !== 6 && !HOLIDAYS[toISO(d)];
}

/** Last weekly/monthly expiry for a given year+month, rolled back over weekends/holidays. */
function monthlyExpiry(year: number, monthIndex: number, weekday: number): Date {
  const d = new Date(Date.UTC(year, monthIndex + 1, 0)); // last day of month
  while (d.getUTCDay() !== weekday) d.setUTCDate(d.getUTCDate() - 1);
  while (!isTradingDay(d)) d.setUTCDate(d.getUTCDate() - 1);
  return d;
}

/** How far back the "last 3 months" section reaches. */
export const PAST_WINDOW_DAYS = 92;

/**
 * NSE monthly F&O expiry dates (Tuesday convention) around `fromISO`:
 * `futureMonths` ahead plus `pastMonths` back, the latter clipped to the past window.
 */
export function expiriesAround(fromISO: string, pastMonths = 3, futureMonths = 4): MarketEvent[] {
  const from = new Date(fromISO + "T00:00:00Z");
  const windowStart = new Date(from);
  windowStart.setUTCDate(windowStart.getUTCDate() - PAST_WINDOW_DAYS);
  const out: MarketEvent[] = [];
  for (let i = -pastMonths; i < futureMonths; i++) {
    const y = from.getUTCFullYear();
    const m = from.getUTCMonth() + i;
    const d = monthlyExpiry(y, m, 2); // 2 = Tuesday (NSE convention, 2025-26)
    if (d < windowStart) continue;
    const label = d.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" });
    out.push({
      date: toISO(d),
      title: `F&O monthly expiry (${label})`,
      kind: "expiry",
      volatile: true,
      note: "NSE index & stock derivatives expire on Tuesdays; rolled to the previous trading day on holidays. Expect rollover-driven volatility.",
    });
  }
  return out;
}

/** Fixed, officially published events. Decision day is the date used for sorting. */
export const SCHEDULED_EVENTS: MarketEvent[] = [
{
  "date": "2026-10-29",
  "title": "US PCE inflation - September 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-10-29T12:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BEA September PCE release",
    "href": "https://www.bea.gov/news/2026/personal-income-and-outlays-september-2026"
  },
  "actual": "Headline 3.6% YoY / 0.5% MoM; core 3.1% YoY / 0.3% MoM.",
  "note": "Monthly price-index release. Core excludes food and energy. YoY is the change from the same month a year earlier, not a one-month rise. No consensus forecast is supplied. Figures verified 29 Oct 2026."
},
{
  "date": "2026-10-29",
  "title": "US real GDP - Q3 2026 advance estimate",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-10-29T12:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BEA Q3 GDP advance release",
    "href": "https://www.bea.gov/news/2026/gdp-advance-estimate-3rd-quarter-2026"
  },
  "actual": "+3.4% quarter-on-quarter at a seasonally adjusted annual rate (SAAR); +0.8% at a quarterly rate.",
  "previous": "Q2 2026: +2.2% SAAR, as reported in this release.",
  "note": "Advance estimate, subject to revision. This is not year-on-year GDP growth. The quarterly PCE price measure in this GDP report is a different basis from monthly PCE inflation. Figures verified 29 Oct 2026."
},
{
  "date": "2026-10-14",
  "title": "US CPI inflation - September 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-10-14T12:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BLS September CPI release",
    "href": "https://www.bls.gov/news.release/cpi.htm"
  },
  "actual": "Headline 3.7% YoY (not seasonally adjusted) / 0.6% MoM (seasonally adjusted); core 2.6% YoY / 0.3% MoM.",
  "previous": "August headline: 3.4% YoY / 0.4% MoM; core: 2.4% YoY / 0.3% MoM.",
  "note": "Core excludes food and energy. Current BLS release page checked 29 Oct 2026; it rolls to the next release, so the month and check date identify these figures."
},
{
  "date": "2026-10-02",
  "title": "US jobs - September 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-10-02T12:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BLS September employment release",
    "href": "https://www.bls.gov/news.release/empsit.htm"
  },
  "actual": "Nonfarm payrolls +29,000 jobs (seasonally adjusted monthly change); unemployment rate 4.2%.",
  "note": "Payroll change and unemployment rate come from different surveys and are not interchangeable. Payroll estimates can be revised. Current BLS release page checked 29 Oct 2026; it rolls to the next release."
},
{
  "date": "2026-11-06",
  "title": "US jobs - October 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-11-06T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BLS jobs release schedule",
    "href": "https://www.bls.gov/schedule/news_release/empsit.htm"
  },
  "note": "Scheduled 08:30 US Eastern Time, converted to IST with daylight saving handled by date. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-12-04",
  "title": "US jobs - November 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-12-04T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BLS jobs release schedule",
    "href": "https://www.bls.gov/schedule/news_release/empsit.htm"
  },
  "note": "Scheduled 08:30 US Eastern Time, converted to IST with daylight saving handled by date. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-11-10",
  "title": "US CPI inflation - October 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-11-10T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BLS CPI release schedule",
    "href": "https://www.bls.gov/schedule/news_release/cpi.htm"
  },
  "note": "Scheduled 08:30 US Eastern Time, converted to IST with daylight saving handled by date. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-12-10",
  "title": "US CPI inflation - November 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-12-10T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BLS CPI release schedule",
    "href": "https://www.bls.gov/schedule/news_release/cpi.htm"
  },
  "note": "Scheduled 08:30 US Eastern Time, converted to IST with daylight saving handled by date. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-11-25",
  "title": "US PCE inflation - October 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-11-25T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BEA release schedule",
    "href": "https://www.bea.gov/news/schedule/full"
  },
  "note": "Personal Income and Outlays release, including headline and core PCE inflation. Scheduled 08:30 US Eastern Time. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-11-25",
  "title": "US real GDP - Q3 2026 second estimate",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-11-25T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BEA release schedule",
    "href": "https://www.bea.gov/news/schedule/full"
  },
  "note": "A revision of the same July-September quarter, not a new quarter. Scheduled 08:30 US Eastern Time. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-12-23",
  "title": "US PCE inflation - November 2026",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-12-23T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BEA release schedule",
    "href": "https://www.bea.gov/news/schedule/full"
  },
  "note": "Personal Income and Outlays release, including headline and core PCE inflation. Scheduled 08:30 US Eastern Time. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
{
  "date": "2026-12-23",
  "title": "US real GDP - Q3 2026 third estimate",
  "kind": "macro-data",
  "volatile": true,
  "instantUTC": "2026-12-23T13:30:00Z",
  "currency": "USD",
  "source": {
    "label": "BEA release schedule",
    "href": "https://www.bea.gov/news/schedule/full"
  },
  "note": "A revision of the same July-September quarter, not a new quarter. Scheduled 08:30 US Eastern Time. Actual figures are not released yet. Date checked 29 Oct 2026; schedules can change."
},
  {
    date: "2026-07-29",
    span: "Jul 28-29",
    title: "US Fed FOMC decision",
    kind: "global-central-bank",
    volatile: true,
  },
  {
    date: "2026-08-05",
    span: "Aug 3-5",
    title: "RBI MPC decision",
    kind: "rbi",
    volatile: true,
    note: "Rate decision + Governor's briefing on the final day.",
  },
  {
    date: "2026-08-12",
    title: "CPI inflation (July print)",
    kind: "macro-data",
    volatile: true,
  },
  {
    date: "2026-08-31",
    title: "GDP Q1 FY27 (Apr-Jun)",
    kind: "macro-data",
    volatile: true,
    note: "MoSPI quarterly estimates.",
  },
  {
    date: "2026-09-14",
    title: "CPI inflation (August print)",
    kind: "macro-data",
    volatile: true,
    note: "MoSPI release; moved from the 12th (a Saturday).",
  },
  {
    date: "2026-09-15",
    title: "Advance tax Q2 installment",
    kind: "macro-data",
    volatile: false,
    note: "45% of annual advance tax due; liquidity effect is modest.",
  },
  {
    date: "2026-09-16",
    span: "Sep 15-16",
    title: "US Fed FOMC decision",
    kind: "global-central-bank",
    volatile: true,
  },
  {
    date: "2026-10-07",
    span: "Oct 5-7",
    title: "RBI MPC decision",
    kind: "rbi",
    volatile: true,
  },
  {
    date: "2026-10-08",
    span: "Oct 8 - Nov 14",
    spanEnd: "2026-11-14",
    title: "Q2 FY27 results season",
    kind: "results-season",
    volatile: true,
    note: "Underway. Companies must declare quarterly results within 45 days of quarter end (SEBI LODR); IT majors opened the season.",
  },
  {
    date: "2026-10-12",
    title: "CPI inflation (September print)",
    kind: "macro-data",
    volatile: true,
  },
  {
    date: "2026-10-28",
    title: "UK Annual Budget statement",
    kind: "budget",
    volatile: true,
    instantUTC: "2026-10-28T12:30:00Z",
    timeApprox: true,
    currency: "GBP",
    note: "Approximate time: about 12:30 pm in London, straight after Prime Minister's Questions.",
    source: { label: "UK Parliament", href: "https://www.parliament.uk/business/news/2026/october-2026/budget-statement-wednesday-28-october/" },
  },
  {
    date: "2026-10-28",
    title: "Bank of Canada rate decision + Monetary Policy Report",
    kind: "global-central-bank",
    volatile: true,
    instantUTC: "2026-10-28T13:45:00Z",
    currency: "CAD",
    previous: "2.25% (held since December 2025)",
    source: { label: "Bank of Canada", href: "https://www.bankofcanada.ca/press/upcoming-events/" },
  },
  {
    date: "2026-10-28",
    title: "Bank of Canada press conference",
    kind: "global-central-bank",
    volatile: false,
    instantUTC: "2026-10-28T14:30:00Z",
    timeApprox: true,
    currency: "CAD",
    source: { label: "Bank of Canada", href: "https://www.bankofcanada.ca/2026/10/fad-announcement-release-mpr-2026-10-28/" },
  },
  {
    date: "2026-10-28",
    span: "Oct 27-28",
    title: "US Fed FOMC decision",
    kind: "global-central-bank",
    volatile: true,
    note: "Global risk sentiment driver for FII flows into India.",
    instantUTC: "2026-10-28T18:00:00Z",
    currency: "USD",
    previous: "3.75-4.00% target range (September statement)",
    source: { label: "Federal Reserve", href: "https://www.federalreserve.gov/newsevents/2026-october.htm" },
  },
  {
    date: "2026-10-28",
    title: "US Fed press conference",
    kind: "global-central-bank",
    volatile: false,
    instantUTC: "2026-10-28T18:30:00Z",
    currency: "USD",
    note: "Chair's press conference follows the FOMC statement.",
    source: { label: "Federal Reserve", href: "https://www.federalreserve.gov/newsevents/2026-october.htm" },
  },
  {
    date: "2026-11-08",
    title: "Muhurat trading (Diwali Laxmi Pujan)",
    kind: "special-session",
    volatile: false,
    note: "Special one-hour Sunday session; timings notified by NSE circular.",
  },
  {
    date: "2026-11-12",
    title: "CPI inflation (October print)",
    kind: "macro-data",
    volatile: true,
    note: "MoSPI release, usually the 12th of the month. A surprise vs the RBI's band moves rate-sensitive stocks.",
  },
  {
    date: "2026-11-27",
    title: "GDP Q2 FY27 (Jul-Sep)",
    kind: "macro-data",
    volatile: true,
    note: "MoSPI quarterly estimates, expected in the last week of November.",
  },
  {
    date: "2026-12-04",
    span: "Dec 2-4",
    title: "RBI MPC decision",
    kind: "rbi",
    volatile: true,
    note: "Rate decision + Governor's briefing on the final day. Bank and NBFC stocks typically swing.",
  },
  {
    date: "2026-12-09",
    span: "Dec 8-9",
    title: "US Fed FOMC decision",
    kind: "global-central-bank",
    volatile: true,
  },
  {
    date: "2026-12-09",
    title: "Bank of Canada rate decision",
    kind: "global-central-bank",
    volatile: true,
    instantUTC: "2026-12-09T14:45:00Z",
    currency: "CAD",
    source: { label: "Bank of Canada", href: "https://www.bankofcanada.ca/press/upcoming-events/" },
  },
  {
    date: "2026-12-12",
    title: "CPI inflation (November print)",
    kind: "macro-data",
    volatile: true,
  },
  {
    date: "2026-12-15",
    title: "Advance tax Q3 installment",
    kind: "macro-data",
    volatile: false,
    note: "75% of annual advance tax due; liquidity effect is modest.",
  },
  {
    date: "2027-01-08",
    span: "Jan 8 - Feb 14",
    title: "Q3 FY27 results season",
    kind: "results-season",
    volatile: true,
    note: "Companies must declare quarterly results within 45 days of quarter end (SEBI LODR). IT majors usually open the season.",
  },
  {
    date: "2027-01-12",
    title: "CPI inflation (December print)",
    kind: "macro-data",
    volatile: true,
  },
  {
    date: "2027-01-27",
    span: "Jan 26-27",
    title: "US Fed FOMC decision",
    kind: "global-central-bank",
    volatile: true,
  },
  {
    date: "2027-02-01",
    title: "Union Budget 2027",
    kind: "budget",
    volatile: true,
    note: "The single biggest scheduled volatility event for Indian markets. Expect sharp index swings during the speech.",
  },
  {
    date: "2027-02-05",
    span: "Feb 3-5",
    title: "RBI MPC decision",
    kind: "rbi",
    volatile: true,
  },
  {
    date: "2027-02-12",
    title: "CPI inflation (January print)",
    kind: "macro-data",
    volatile: true,
  },
  {
    date: "2027-02-26",
    title: "GDP Q3 FY27 (Oct-Dec)",
    kind: "macro-data",
    volatile: true,
    note: "Expected in the last week of February per MoSPI's release calendar.",
  },
  {
    date: "2027-03-17",
    span: "Mar 16-17",
    title: "US Fed FOMC decision",
    kind: "global-central-bank",
    volatile: true,
  },
];

/** Day count from today (Asia/Kolkata) to the event date. */
export function daysUntil(iso: string, now = new Date()): number {
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const today = Date.UTC(istNow.getFullYear(), istNow.getMonth(), istNow.getDate());
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - today) / 86400000);
}

const IST_TZ = "Asia/Kolkata";

/** "29 Oct" for an instant, in IST. */
export function istDateLabel(instantUTC: string): string {
  return new Date(instantUTC).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: IST_TZ });
}

/** "Thu" for an instant, in IST. */
export function istWeekday(instantUTC: string): string {
  return new Date(instantUTC).toLocaleDateString("en-IN", { weekday: "short", timeZone: IST_TZ });
}

/** "00:00" 24h clock for an instant, in IST. */
export function istTimeLabel(instantUTC: string): string {
  return new Date(instantUTC).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: IST_TZ });
}

/** Day count from today (Asia/Kolkata) to the IST day containing the instant. */
export function daysUntilInstant(instantUTC: string, now = new Date()): number {
  const istDay = (d: Date): number => {
    const p = new Date(d.toLocaleString("en-US", { timeZone: IST_TZ }));
    return Date.UTC(p.getFullYear(), p.getMonth(), p.getDate());
  };
  return Math.round((istDay(new Date(instantUTC)) - istDay(now)) / 86400000);
}

export function allEvents(now = new Date()): MarketEvent[] {
  const todayISO = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
    .toISOString()
    .slice(0, 10);
  const windowStart = new Date(now);
  windowStart.setUTCDate(windowStart.getUTCDate() - PAST_WINDOW_DAYS);
  const windowStartISO = toISO(windowStart);
  const holidays: MarketEvent[] = Object.entries(HOLIDAYS)
    .filter(([d]) => d >= windowStartISO)
    .map(([d, name]) => ({
      date: d,
      title: `Market holiday - ${name}`,
      kind: "holiday" as const,
      volatile: false,
      note: "NSE & BSE closed.",
    }));
  return [...SCHEDULED_EVENTS, ...expiriesAround(todayISO), ...holidays]
    .filter((e) => daysUntil(e.date, now) >= -PAST_WINDOW_DAYS)
    .sort((a, b) =>
      (a.instantUTC ?? `${a.date}T00:00:00Z`).localeCompare(b.instantUTC ?? `${b.date}T00:00:00Z`)
    );
}

/** Where each data group comes from - shown on the page for trust. */
export const CALENDAR_SOURCES = [
  { label: "BEA economic release schedule (PCE and GDP)", href: "https://www.bea.gov/news/schedule/full" },
  { label: "BLS CPI release schedule", href: "https://www.bls.gov/schedule/news_release/cpi.htm" },
  { label: "BLS employment release schedule", href: "https://www.bls.gov/schedule/news_release/empsit.htm" },
  { label: "RBI press release, MPC schedule 2026-27 (Mar 23, 2026)", href: "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=62422" },
  { label: "NSE circular CMTR71775 - 2026 trading holidays", href: "https://nsearchives.nseindia.com/content/circulars/CMTR71775.pdf" },
  { label: "US Federal Reserve FOMC calendar", href: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" },
  { label: "MoSPI advance release calendar", href: "https://www.mospi.gov.in/release-calendar" },
  { label: "Bank of Canada - upcoming events", href: "https://www.bankofcanada.ca/press/upcoming-events/" },
  { label: "UK Parliament - Budget statement, 28 October", href: "https://www.parliament.uk/business/news/2026/october-2026/budget-statement-wednesday-28-october/" },
];

export const CALENDAR_REVIEWED_ON = "October 28, 2026";

/** Selected economic-release entries checked separately from the legacy date list. */
export const ECONOMIC_DATA_REVIEWED_ON = "October 29, 2026";
