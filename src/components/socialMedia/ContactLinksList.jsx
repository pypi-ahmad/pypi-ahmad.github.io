/**
 * ContactLinksList — Structured contact links with descriptions.
 *
 * Builds a list of available contact channels from socialMediaLinks data,
 * each showing an icon, label, and description. Used on the /contact page.
 *
 * Props: { theme, items? } — omit items to use configured contact channels.
 */
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import "./ContactLinksList.css";
import { socialMediaLinks as configuredLinks } from "../../portfolio";
import {
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa";

/** Assemble enabled contact items from the social-media data. */
export const buildContactItems = (links = configuredLinks) => {
  // Whitespace-only settings intentionally hide a channel; trim before testing availability.
  const socialMediaLinks = Object.fromEntries(
    Object.entries(links).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );
  const items = [];

  if (socialMediaLinks.gmail) {
    items.push({
      key: "email",
      label: "Email",
      href: `mailto:${socialMediaLinks.gmail}`,
      description: socialMediaLinks.gmailDesc || "",
      Icon: FaEnvelope,
      openInNewTab: false,
    });
  }

  if (socialMediaLinks.linkedin) {
    items.push({
      key: "linkedin",
      label: "LinkedIn",
      href: socialMediaLinks.linkedin,
      description: socialMediaLinks.linkedinDesc || "",
      iconSrc: "/contacts-icons/linkedin.png",
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.github) {
    items.push({
      key: "github",
      label: "GitHub",
      href: socialMediaLinks.github,
      description: socialMediaLinks.githubDesc || "",
      iconSrc: "/contacts-icons/github.png",
      invertOnDark: true,
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.portfolio) {
    items.push({
      key: "portfolio",
      label: "Portfolio",
      href: socialMediaLinks.portfolio,
      description: socialMediaLinks.portfolioDesc || "",
      iconSrc: "/contacts-icons/portfolio.png",
      invertOnDark: true,
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.twitter) {
    items.push({
      key: "twitter",
      label: "X (Twitter)",
      href: socialMediaLinks.twitter,
      description: socialMediaLinks.twitterDesc || "",
      iconSrc: "/contacts-icons/twitter.png",
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.whatsapp) {
    items.push({
      key: "whatsapp",
      label: "WhatsApp",
      href: socialMediaLinks.whatsapp,
      description: socialMediaLinks.whatsappDesc || "",
      iconSrc: "/contacts-icons/whatsapp.png",
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.telegram) {
    items.push({
      key: "telegram",
      label: "Telegram",
      href: socialMediaLinks.telegram,
      description: socialMediaLinks.telegramDesc || "",
      iconSrc: "/contacts-icons/telegram.png",
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.instagram) {
    items.push({
      key: "instagram",
      label: "Instagram",
      href: socialMediaLinks.instagram,
      description: socialMediaLinks.instagramDesc || "",
      iconSrc: "/contacts-icons/instagram.png",
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.facebook) {
    items.push({
      key: "facebook",
      label: "Facebook",
      href: socialMediaLinks.facebook,
      description: socialMediaLinks.facebookDesc || "",
      iconSrc: "/contacts-icons/facebook.png",
      openInNewTab: true,
    });
  }

  if (socialMediaLinks.discord) {
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

export default function ContactLinksList({ theme, items = buildContactItems() }) {
  // The Contact page owns the empty-state message and recovery link, not this reusable list.
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="contact-links-list">
      {items.map((item, index) => (
        <motion.li {...revealMotion(index)} key={item.key} className="contact-links-item">
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
              {item.iconSrc ? (
                <img
                  src={item.iconSrc}
                  alt=""
                  className={`contact-links-icon-img${
                    item.invertOnDark && theme?.name === "dark"
                      ? " contact-links-icon-img--invert"
                      : ""
                  }`}
                />
              ) : item.Icon ? (
                <item.Icon />
              ) : null}
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
        </motion.li>
      ))}
    </ul>
  );
}
