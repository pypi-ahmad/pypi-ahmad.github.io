export function Pagination({ page, pages, onPage, label = "Results" }) {
  if (pages < 2) return null;
  return (
    <nav className="gh-toolbar" aria-label={`${label} pages`}>
      <button disabled={page === 1} onClick={() => onPage(page - 1)}>
        Previous page
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button disabled={page === pages} onClick={() => onPage(page + 1)}>
        Next page
      </button>
    </nav>
  );
}
export function Unavailable({ name }) {
  return (
    <p role="status">
      {name} is not available in this snapshot. Try refreshing the data above,
      or <a href="https://github.com/pypi-ahmad">view the GitHub profile</a>.
    </p>
  );
}
export function YearSelect({
  years,
  value,
  onChange,
  label = "Contribution year",
}) {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {[...years].reverse().map((y) => (
          <option key={y.year} value={y.year}>
            {y.year}
          </option>
        ))}
      </select>
    </label>
  );
}
