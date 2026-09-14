import { lazy, Suspense, useEffect, useRef, useState } from "react";
const Preview = lazy(() => import("./GitHubPreview"));
export default function LazyGitHubPreview() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div id="github-overview" ref={ref} style={{ minHeight: "12rem" }}>
      {visible && (
        <Suspense fallback={<p role="status">Loading GitHub overview…</p>}>
          <Preview />
        </Suspense>
      )}
    </div>
  );
}
