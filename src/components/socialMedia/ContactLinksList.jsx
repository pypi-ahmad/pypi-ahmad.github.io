/**
 * ContactLinksList — Structured contact links with descriptions.
 *
 * Builds a list of available contact channels from socialMediaLinks data,
 * each showing an icon, label, and description. Used on the /contact page.
 *
 * Props: { theme }
 */
import React from "react";
import "./ContactLinksList.css";
import { socialMediaLinks } from "../../portfolio";
import {
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";

/** Assemble enabled contact items from the social-media data. */
const buildContactItems = () => {
  const items = [];

  if (socialMediaLinks.github && socialMediaLinks.github !== " ") {
    items.push({
      key: "github",
      label: "GitHub",
      href: socialMediaLinks.github,
      description: socialMediaLinks.githubDesc || "",
      Icon: FaGithub,
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.linkedin && socialMediaLinks.linkedin !== " ") {
    items.push({
      key: "linkedin",
      label: "LinkedIn",
      href: socialMediaLinks.linkedin,
      description: socialMediaLinks.linkedinDesc || "",
      Icon: FaLinkedinIn,
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.gmail && socialMediaLinks.gmail !== " ") {
    items.push({
      key: "email",
      label: "Email",
      href: `mailto:${socialMediaLinks.gmail}`,
      description: socialMediaLinks.gmailDesc || "",
      Icon: FaEnvelope,
      openInNewTab: false,
    });
  }

  if (socialMediaLinks.phone && socialMediaLinks.phone !== " ") {
    items.push({
      key: "phone",
      label: "Phone",
      href: `tel:${socialMediaLinks.phone.replace(/[^+\d]/g, "")}`,
      description: socialMediaLinks.phoneDesc || "",
      Icon: FaPhone,
      displayValue: socialMediaLinks.phone,
      openInNewTab: false,
    });
  }

  if (socialMediaLinks.telegram && socialMediaLinks.telegram !== " ") {
    items.push({
      key: "telegram",
      label: "Telegram",
      href: socialMediaLinks.telegram,
      description: socialMediaLinks.telegramDesc || "",
      Icon: FaTelegramPlane,
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.discord && socialMediaLinks.discord !== " ") {
    items.push({
      key: "discord",
      label: "Discord",
      href: socialMediaLinks.discord,
      description: socialMediaLinks.discordDesc || "",
      Icon: FaDiscord,
      openInNewTab: true,
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
            target={item.openInNewTab ? "_blank" : undefined}
            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
            aria-label={item.label}
          >
            <span
              className="contact-links-icon"
              style={{ color: theme.text }}
              aria-hidden="true"
            >
              <item.Icon />
            </span>
            <div className="contact-links-content">
              <span className="contact-links-label" style={{ color: theme.text }}>
                {item.displayValue ? `${item.label} · ${item.displayValue}` : item.label}
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
