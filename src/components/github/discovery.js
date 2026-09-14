export function safeGitHubUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "github.com" &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
export function sourceExcerpt(value) {
  const plain = value
    .replace(/```[\s\S]*?(?:```|$)/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*(?:#{1,6}\s+|[-*>]\s+)/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > 300
    ? `${plain.slice(0, 300).replace(/\s+\S*$/, "")}…`
    : plain;
}
const text = (value) => typeof value === "string";
const date = (value) => text(value) && Number.isFinite(Date.parse(value));
const count = (value) => Number.isInteger(value) && value >= 0;
export function validDiscovery(data) {
  if (
    data.repositories !== undefined &&
    (!Array.isArray(data.repositories) ||
      !data.repositories.every(
        (r) =>
          [r.name, r.fullName, r.description, r.language].every(text) &&
          safeGitHubUrl(r.url) &&
          Array.isArray(r.topics) &&
          r.topics.every(text) &&
          count(r.stars) &&
          typeof r.fork === "boolean" &&
          typeof r.archived === "boolean" &&
          date(r.createdAt) &&
          (r.pushedAt === null || date(r.pushedAt)),
      ))
  )
    return false;
  if (
    data.releases !== undefined &&
    (!Array.isArray(data.releases) ||
      !data.releases.every(
        (r) =>
          count(r.id) &&
          [r.repository, r.title, r.tag, r.notes].every(text) &&
          safeGitHubUrl(r.url) &&
          date(r.publishedAt) &&
          typeof r.prerelease === "boolean" &&
          Array.isArray(r.assets) &&
          r.assets.every(
            (a) =>
              text(a.name) &&
              safeGitHubUrl(a.url) &&
              count(a.size) &&
              count(a.downloads),
          ),
      ))
  )
    return false;
  if (
    data.externalPullRequests !== undefined &&
    (!Array.isArray(data.externalPullRequests) ||
      !data.externalPullRequests.every(
        (r) =>
          count(r.number) &&
          [r.repository, r.title, r.description].every(text) &&
          safeGitHubUrl(r.url) &&
          date(r.mergedAt),
      ))
  )
    return false;
  return (
    data.discoveryCoverage === undefined ||
    (data.discoveryCoverage &&
      typeof data.discoveryCoverage.scope === "string" &&
      ["repositories", "releases", "externalPullRequests"].every(
        (key) => data.discoveryCoverage[key] === "complete",
      ))
  );
}
export function pageSlice(items, requested, size = 10) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const page = Math.min(pages, Math.max(1, Math.floor(Number(requested)) || 1));
  return { page, pages, items: items.slice((page - 1) * size, page * size) };
}
export function exploreRepositories(
  repositories,
  params,
  generatedAt,
  featured = [],
) {
  const q = (params.get("q") || "").trim().toLowerCase();
  const days = ["30", "90", "365"].includes(params.get("activity"))
    ? Number(params.get("activity"))
    : 0;
  const cutoff = Date.parse(generatedAt) - days * 86400000;
  const matches = repositories.filter(
    (r) =>
      (params.get("forks") === "1" || !r.fork) &&
      (params.get("archived") === "1" || !r.archived) &&
      (!q ||
        `${r.name} ${r.description} ${r.topics.join(" ")}`
          .toLowerCase()
          .includes(q)) &&
      (!params.get("language") || r.language === params.get("language")) &&
      (!params.get("topic") || r.topics.includes(params.get("topic"))) &&
      (!days || (r.pushedAt && Date.parse(r.pushedAt) >= cutoff)),
  );
  const rank = (r) => {
    const i = featured.indexOf(r.url);
    return i < 0 ? Infinity : i;
  };
  return matches.sort((a, b) => {
    const name = a.name.localeCompare(b.name, "en");
    const recent =
      (Date.parse(b.pushedAt) || 0) - (Date.parse(a.pushedAt) || 0);
    switch (params.get("sort")) {
      case "name":
        return name;
      case "stars":
        return b.stars - a.stars || name;
      case "recent":
        return recent || name;
      default:
        return rank(a) - rank(b) || recent || name;
    }
  });
}
export function yearMetrics(year) {
  const months = Array(12).fill(0);
  for (const day of year.days)
    months[Number(day.date.slice(5, 7)) - 1] += day.count;
  const peak = Math.max(...months);
  const covered = months.map((_, i) =>
    year.days.some((d) => Number(d.date.slice(5, 7)) === i + 1),
  );
  return {
    total: year.days.reduce((n, d) => n + d.count, 0),
    active: year.days.filter((d) => d.count > 0).length,
    months,
    covered,
    busiest: peak ? months.flatMap((n, i) => (n === peak ? [i] : [])) : [],
  };
}
export function compareYears(a, b, full = false) {
  if (full)
    return {
      a: yearMetrics(a),
      b: yearMetrics(b),
      coverage: "Full recorded years; coverage may differ.",
      comparable: a.days.length > 0 && b.days.length > 0,
    };
  const mapA = new Map(a.days.map((d) => [d.date.slice(5), d]));
  const mapB = new Map(b.days.map((d) => [d.date.slice(5), d]));
  const dates = [...mapA.keys()].filter((d) => mapB.has(d)).sort();
  return {
    a: yearMetrics({ days: dates.map((d) => mapA.get(d)) }),
    b: yearMetrics({ days: dates.map((d) => mapB.get(d)) }),
    comparable: dates.length > 0,
    coverage: dates.length
      ? `Matched dates: ${dates[0]}–${dates.at(-1)} (${dates.length} shared calendar dates). Unshared dates, including unmatched leap days, are excluded.`
      : "No shared calendar dates are available.",
  };
}
