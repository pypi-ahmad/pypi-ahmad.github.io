import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import { greeting, settings } from "../../portfolio.js";
import { useThemeController } from "../../themeController";
import "./Header.css";

const desktopQuery = "(min-width: 80rem)";
const navItems = [
  ["/home", "Home"],
  ["/education", "Education and certifications"],
  ["/experience", "Experience"],
  ["/skills", "Skills"],
  ["/projects", "Projects"],
  ["/github", "GitHub"],
  ["/contact", "Contact"],
];

export default function Header() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia(desktopQuery).matches,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [instant, setInstant] = useState(true);
  const headerRef = useRef(null);
  const triggerRef = useRef(null);
  const brandRef = useRef(null);
  const menuRef = useRef(null);
  const themeRef = useRef(null);
  const resizeFocus = useRef(null);
  const menuId = useId();
  const { themeMode, toggleMode } = useThemeController();
  const location = useLocation();
  const visible = isDesktop || isMenuOpen;

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const change = (event) => {
      if (document.activeElement === themeRef.current)
        resizeFocus.current = "theme";
      if (!event.matches && menuRef.current?.contains(document.activeElement))
        resizeFocus.current = "menu";
      if (event.matches && document.activeElement === triggerRef.current)
        resizeFocus.current = "brand";
      setInstant(true);
      setIsMenuOpen(false);
      setIsDesktop(event.matches);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useLayoutEffect(() => {
    if (resizeFocus.current === "menu") triggerRef.current?.focus();
    if (resizeFocus.current === "brand") brandRef.current?.focus();
    if (resizeFocus.current === "theme") themeRef.current?.focus();
    resizeFocus.current = null;
  }, [isDesktop]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const dismiss = (event) => {
      if (!headerRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [isMenuOpen]);

  const themeButton = (
    <button
      key="theme"
      ref={themeRef}
      className="change-theme-btn"
      type="button"
      aria-label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
      onClick={() => {
        toggleMode();
        setIsMenuOpen(false);
      }}
    >
      {themeMode === "dark" ? (
        <HiMoon size={20} aria-hidden="true" />
      ) : (
        <CgSun size={20} aria-hidden="true" />
      )}
    </button>
  );

  return (
    <header
      className={`header${isDesktop ? " header--wide" : ""}`}
      ref={headerRef}
      onKeyDown={(event) => {
        setInstant(true);
        if (event.key === "Escape" && isMenuOpen) {
          event.preventDefault();
          triggerRef.current?.focus();
          setIsMenuOpen(false);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInstant(true);
          setIsMenuOpen(false);
        }
      }}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <NavLink
        ref={brandRef}
        className="header-brand"
        to={settings.isSplash ? "/splash" : "/home"}
        onClick={() => setIsMenuOpen(false)}
      >
        {greeting.logoName}
      </NavLink>
      {!isDesktop && themeButton}
      <button
        ref={triggerRef}
        type="button"
        hidden={isDesktop}
        className={`menu-icon${isMenuOpen ? " is-open" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        onClick={(event) => {
          setInstant(event.detail === 0);
          setIsMenuOpen((open) => !open);
        }}
      >
        <span className="navicon" />
      </button>
      <nav aria-label="Primary">
        <ul
          ref={menuRef}
          id={menuId}
          className={`menu${isMenuOpen ? " menu--open" : ""}${instant ? " menu--instant" : ""}`}
          hidden={!visible}
          aria-hidden={!visible}
          inert={!visible}
        >
          {navItems.map(([to, label]) => (
            <li key={to}>
              <Link
                to={to}
                aria-current={
                  location.pathname === to ||
                  (to === "/home" && location.pathname === "/")
                    ? "page"
                    : undefined
                }
                tabIndex={visible ? undefined : -1}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {isDesktop && themeButton}
    </header>
  );
}
