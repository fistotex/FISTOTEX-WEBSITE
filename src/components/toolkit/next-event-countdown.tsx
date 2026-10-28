"use client";

import { useEffect, useState } from "react";

export interface CountdownEvent {
  title: string;
  instantUTC: string;
  timeApprox?: boolean;
  /** "23:30" 24h, precomputed in IST on the server. */
  timeLabelIST: string;
  /** "28 Oct", precomputed in IST on the server. */
  dateLabelIST: string;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Ticking countdown to the next timed calendar event. The remaining time is
 * rendered only after mount so the server HTML and first client render match.
 */
export function NextEventCountdown({
  events,
  serverNow,
}: {
  events: CountdownEvent[];
  serverNow: number;
}) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const ref = now ?? serverNow;
  const next = events.find((e) => Date.parse(e.instantUTC) > ref);

  let clock = "--:--:--";
  if (now !== null && next) {
    const total = Math.max(0, Math.floor((Date.parse(next.instantUTC) - now) / 1000));
    const days = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    clock = days > 0 ? `${days}d ${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(h)}:${pad(m)}:${pad(sec)}`;
  }

  return (
    <div className="ledger mb-10 px-4 py-5 sm:px-6">
      <p className="eyebrow eyebrow-plain mb-3">Next high-impact event</p>
      {next ? (
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <div className="min-w-0">
            <p className="text-lg font-semibold">{next.title}</p>
            <p className="mt-0.5 font-mono text-sm opacity-80">
              {next.dateLabelIST} &middot; {next.timeLabelIST} IST
              {next.timeApprox ? " (approx.)" : ""}
            </p>
          </div>
          <p className="font-mono text-3xl font-bold tabular-nums text-panel-accent sm:ml-auto">
            <span className="mr-3 align-middle font-mono text-xs font-normal uppercase tracking-wide opacity-70">
              starts in
            </span>
            {clock}
          </p>
        </div>
      ) : (
        <p className="text-sm opacity-80">
          No more timed events in the current list. New entries are added at the monthly review.
        </p>
      )}
    </div>
  );
}
