import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
  );
}

export default function useAccessibleDialog({ isOpen, onClose, triggerRef }) {
  const dialogRef = useRef(null);
  const lastActiveElementRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        if (triggerRef?.current && typeof triggerRef.current.focus === "function") {
          triggerRef.current.focus();
        } else if (
          lastActiveElementRef.current &&
          typeof lastActiveElementRef.current.focus === "function"
        ) {
          lastActiveElementRef.current.focus();
        }
      }

      wasOpenRef.current = false;
      return undefined;
    }

    const dialogElement = dialogRef.current;
    if (!dialogElement) {
      return undefined;
    }

    wasOpenRef.current = true;
    lastActiveElementRef.current = document.activeElement;

    const focusInitialElement = () => {
      const focusableElements = getFocusableElements(dialogElement);
      const initialTarget = focusableElements[0] || dialogElement;
      initialTarget.focus();
    };

    focusInitialElement();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialogElement);
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogElement.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !dialogElement.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (activeElement === last || !dialogElement.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  return dialogRef;
}
