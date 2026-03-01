/**
 * SocialMedia — Icon-button row of social links (Font Awesome icons).
 *
 * Renders only platforms whose link is truthy and not a single space.
 * Used in the Greeting/hero section.
 */
import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";

export default function socialMedia() {
  return (
    <div className="social-media-div">
      {socialMediaLinks.github ? (
        <a
          href={socialMediaLinks.github}
          className="icon-button github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <i className="fab fa-github"></i>
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.linkedin ? (
        <a
          href={socialMediaLinks.linkedin}
          className="icon-button linkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <i className="fab fa-linkedin-in"></i>
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.gmail ? (
        <a
          href={`mailto:${socialMediaLinks.gmail}`}
          className="icon-button google"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send email"
        >
          <i className="fab fa-google"></i>
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.twitter && socialMediaLinks.twitter !== " " ? (
        <a
          href={socialMediaLinks.twitter}
          className="icon-button twitter"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter profile"
        >
          <i className="fab fa-twitter"></i>
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.instagram && socialMediaLinks.instagram !== " " ? (
        <a
          href={socialMediaLinks.instagram}
          className="icon-button instagram"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram profile"
        >
          <i className="fab fa-instagram"></i>
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.telegram && socialMediaLinks.telegram !== " " ? (
        <a
          href={socialMediaLinks.telegram}
          className="icon-button telegram"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          style={{ backgroundColor: "#0088cc" }}
        >
          <i className="fab fa-telegram-plane"></i>
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.discord && socialMediaLinks.discord !== " " ? (
        <a
          href={socialMediaLinks.discord}
          className="icon-button discord"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          style={{ backgroundColor: "#7289da" }}
        >
          <i className="fab fa-discord"></i>
          <span></span>
        </a>
      ) : null}
    </div>
  );
}
