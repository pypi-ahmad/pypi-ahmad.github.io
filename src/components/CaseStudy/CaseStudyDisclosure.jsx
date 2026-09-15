import { useEffect, useId, useRef } from "react";
import "./CaseStudyDisclosure.css";

export default function CaseStudyDisclosure({ headingId, label, children }) {
  const ref = useRef(null);
  const labelId = useId();

  useEffect(() => {
    const details = ref.current;
    let previousOpen;
    const beforePrint = () => {
      if (previousOpen === undefined) previousOpen = details.open;
      details.open = true;
    };
    const afterPrint = () => {
      if (previousOpen !== undefined) details.open = previousOpen;
      previousOpen = undefined;
    };
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return <details ref={ref} className="case-disclosure" data-case-study-for={headingId}>
    <summary aria-labelledby={headingId ? `${labelId} ${headingId}` : labelId}>
      <span id={labelId}>{label}</span>
    </summary>
    <div className="case-disclosure__content">{children}</div>
  </details>;
}
