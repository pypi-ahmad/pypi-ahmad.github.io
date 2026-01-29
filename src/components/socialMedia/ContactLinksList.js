import React from "react";
import "./ContactLinksList.css";
import { socialMediaLinks } from "../../portfolio";

const buildContactItems = () => {
  const items = [];

  if (socialMediaLinks.github && socialMediaLinks.github !== " ") {
    items.push({
      key: "github",
      label: "GitHub",
      href: socialMediaLinks.github,
      display: socialMediaLinks.github,
      iconClass: "fab fa-github",
    });
  }

  if (socialMediaLinks.linkedin && socialMediaLinks.linkedin !== " ") {
    items.push({
      key: "linkedin",
      label: "LinkedIn",
      href: socialMediaLinks.linkedin,
      display: socialMediaLinks.linkedin,
      iconClass: "fab fa-linkedin-in",
    });
  }

  if (socialMediaLinks.gmail && socialMediaLinks.gmail !== " ") {
    items.push({
      key: "email",
      label: "Email",
      href: `mailto:${socialMediaLinks.gmail}`,
      display: socialMediaLinks.gmail,
      iconClass: "fas fa-envelope",
    });
  }

  if (socialMediaLinks.telegram && socialMediaLinks.telegram !== " ") {
    items.push({
      key: "telegram",
      label: "Telegram",
      href: socialMediaLinks.telegram,
      display: socialMediaLinks.telegram,
      iconClass: "fab fa-telegram-plane",
    });
  }

  if (socialMediaLinks.discord && socialMediaLinks.discord !== " ") {
    items.push({
      key: "discord",
      label: "Discord",
      href: socialMediaLinks.discord,
      display: socialMediaLinks.discord,
      iconClass: "fab fa-discord",
    });
  }

  return items;
};

export default function ContactLinksList({ theme }) {
  const items = buildContactItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="contact-links-list">
      {items.map(item => (
        <li key={item.key} className="contact-links-item">
          <a
            className="contact-links-anchor"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label}: ${item.display}`}
          >
            <span
              className="contact-links-bullet"
              style={{ color: theme.secondaryText }}
              aria-hidden="true"
            >
              •
            </span>
            <span
              className="contact-links-icon"
              style={{ color: theme.text }}
              aria-hidden="true"
            >
              <i className={item.iconClass}></i>
            </span>
            <span className="contact-links-label" style={{ color: theme.text }}>
              {item.label}
            </span>
            <span
              className="contact-links-sep"
              style={{ color: theme.secondaryText }}
              aria-hidden="true"
            >
              —
            </span>
            <span className="contact-links-url" style={{ color: theme.secondaryText }}>
              {item.display}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
