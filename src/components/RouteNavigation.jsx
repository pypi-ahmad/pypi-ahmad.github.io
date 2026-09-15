import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Runs after the route's Suspense boundary commits its page, not its fallback. */
export default function RouteNavigation() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);
  const initialVisit = useRef(true);

  useLayoutEffect(() => {
    const firstVisit = initialVisit.current;
    initialVisit.current = false;
    // Case-study fragments must resolve after the lazy page commits, including direct entry.
    if ((pathname === "/projects" || pathname === "/experience") && hash) {
      const heading = document.getElementById(hash.slice(1));
      if (heading?.hasAttribute("data-case-study-heading")) {
        const disclosure = Array.from(document.querySelectorAll("details[data-case-study-for]"))
          .find(node => node.dataset.caseStudyFor === heading.id);
        if (disclosure) disclosure.open = true;
        if (!firstVisit && navigationType === "POP") {
          previousPath.current = pathname;
          return;
        }
        previousPath.current = pathname;
        // Wait for the new header's layout measurement before resolving the fragment.
        let pending = true;
        const frame = requestAnimationFrame(() => {
          pending = false;
          heading.focus({ preventScroll: true });
          heading.scrollIntoView({ behavior: "instant", block: "start" });
        });
        return () => {
          cancelAnimationFrame(frame);
          if (pending && firstVisit) initialVisit.current = true;
        };
      }
    }
    // Initial visits and same-page anchors keep the browser's native focus and scroll behavior.
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const main = document.querySelector("main");
    if (main) {
      // Programmatic focus orients keyboard users without adding main to the normal tab order.
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
    // Native history restoration and fragment navigation retain their positions.
    if (navigationType !== "POP" && !hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash, navigationType]);

  return null;
}
