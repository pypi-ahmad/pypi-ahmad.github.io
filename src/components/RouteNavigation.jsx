import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** Runs after the route's Suspense boundary commits its page, not its fallback. */
export default function RouteNavigation() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
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
