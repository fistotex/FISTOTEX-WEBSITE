/** Proposed metadata boundary. Not connected to any public page or live source. */
export type DiscoveryItem = {
  id: string;
  source: "BSE" | "NSE";
  sourceUrl: string;
  company: string;
  sourceTimestampRaw: string;
  sourceTimestampIso?: string;
  timezoneVerified: boolean;
  firstSeenAt: string;
  state: "detected" | "reviewed" | "rejected";
};

export type PublicationGate = {
  publicUseSupported: boolean;
  productionTransportVerified: boolean;
  experimentalLabelPresent: boolean;
};

export function canPublishDiscovery(gate: PublicationGate): boolean {
  return gate.publicUseSupported && gate.productionTransportVerified && gate.experimentalLabelPresent;
}

export function normalizeDiscovery(item: DiscoveryItem): DiscoveryItem {
  if (!item.id.trim() || !item.company.trim()) throw new Error("Missing identity");
  const url = new URL(item.sourceUrl);
  if (url.protocol !== "https:") throw new Error("HTTPS source required");
  const hosts = item.source === "BSE"
    ? ["www.bseindia.com"]
    : ["nsearchives.nseindia.com", "archives.nseindia.com", "www.nseindia.com"];
  if (!hosts.includes(url.hostname)) throw new Error("Unexpected source host");
  if (!Number.isFinite(Date.parse(item.firstSeenAt))) throw new Error("Invalid first-seen date");
  if (item.sourceTimestampIso && !item.timezoneVerified) {
    throw new Error("Unverified timezone cannot become a normalized source time");
  }
  if (item.sourceTimestampIso && !Number.isFinite(Date.parse(item.sourceTimestampIso))) {
    throw new Error("Invalid source date");
  }
  return { ...item };
}

/** Only exact source IDs dedupe automatically; cross-exchange identity needs separate validation. */
export function dedupeDiscovery(items: DiscoveryItem[]): DiscoveryItem[] {
  const map = new Map<string, DiscoveryItem>();
  for (const item of items) {
    const normalized = normalizeDiscovery(item);
    const key = `${normalized.source}:${normalized.id}`;
    const old = map.get(key);
    if (!old || Date.parse(normalized.firstSeenAt) < Date.parse(old.firstSeenAt)) map.set(key, normalized);
  }
  return [...map.values()];
}
