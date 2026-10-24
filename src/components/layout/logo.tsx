import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Masthead mark: the Newsreader "F" whose top bar becomes a rising market
 * arrow, struck on a night-ink tile - the gazette's colophon stamp.
 * The F outline is extracted from Newsreader 700, the site's display face.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={cn("h-9 w-9 shrink-0 rounded-sm", className)}
    >
      <rect width="64" height="64" rx="6" fill="#12151A" stroke="#2A3038" strokeWidth="1.5" />
      <g transform="translate(1.88,51.2) scale(0.058)">
        <path
          d="M434.50-463.50L489-463.50L489-200L434.50-200L424-298L276-298L276-57L351.50-28.50L351.50 0L36.50 0L36.50-28.50L112-57L112-619L36.50-647.50L36.50-676L507-676L503-606.50L276-606.50L276-365.50L424-365.50L434.50-463.50Z"
          fill="#EDE8DF"
        />
      </g>
      <path
        d="M31.5 14 L38.5 21.5 L44 12.5 L50 19 L56 8.6"
        fill="none"
        stroke="#4FBF8B"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M60.2 3.9 L61.6 11.9 L53.4 7.3 Z" fill="#4FBF8B" />
    </svg>
  );
}

export function Logo({
  className,
  onClick,
  /** Hides the "The Indian Investor's Gazette" strapline (tight spaces, footer). */
  compact = false,
}: {
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <LogoMark className={compact ? "h-6 w-6" : undefined} />
      <span className="block">
        <span
          className={cn(
            "font-display block font-extrabold leading-none tracking-tight text-foreground",
            compact ? "text-xl" : "text-2xl sm:text-3xl"
          )}
        >
          {siteConfig.name}
        </span>
        {!compact && (
          <span className="mt-0.5 hidden min-[400px]:block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-2">
            The Indian Investor&apos;s Gazette
          </span>
        )}
      </span>
    </Link>
  );
}
