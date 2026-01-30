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
      description: socialMediaLinks.githubDesc || "",
      iconClass: "fab fa-github",
    });
  }

  if (socialMediaLinks.linkedin && socialMediaLinks.linkedin !== " ") {
    items.push({
      key: "linkedin",
      label: "LinkedIn",
      href: socialMediaLinks.linkedin,
      description: socialMediaLinks.linkedinDesc || "",
      iconClass: "fab fa-linkedin-in",
    });
  }

  if (socialMediaLinks.gmail && socialMediaLinks.gmail !== " ") {
    items.push({
      key: "email",
      label: "Email",
      href: `mailto:${socialMediaLinks.gmail}`,
      description: socialMediaLinks.gmailDesc || "",
      iconClass: "fas fa-envelope",
    });
  }

  if (socialMediaLinks.telegram && socialMediaLinks.telegram !== " ") {
    items.push({
      key: "telegram",
      label: "Telegram",
      href: socialMediaLinks.telegram,
      description: socialMediaLinks.telegramDesc || "",
      iconClass: "fab fa-telegram-plane",
    });
  }

  if (socialMediaLinks.discord && socialMediaLinks.discord !== " ") {
    items.push({
      key: "discord",
      label: "Discord",
      href: socialMediaLinks.discord,
      description: socialMediaLinks.discordDesc || "",
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
            aria-label={item.label}
          >
            <span
              className="contact-links-icon"
              style={{ color: theme.text }}
              aria-hidden="true"
            >
              <i className={item.iconClass}></i>
            </span>
            <div className="contact-links-content">
              <span className="contact-links-label" style={{ color: theme.text }}>
                {item.label}
              </span>
              {item.description && (
                <span className="contact-links-desc" style={{ color: theme.secondaryText }}>
                  {item.description}
                </span>
              )}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
