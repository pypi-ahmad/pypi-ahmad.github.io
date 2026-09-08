/**
 * SocialMedia — Icon-button row of social links (Font Awesome icons).
 *
 * Renders only platforms whose link is truthy and not a single space.
 * Used in the Greeting/hero section.
 */
import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

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
          <FaGithub className="icon-glyph" />
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
          <FaLinkedinIn className="icon-glyph" />
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
          <FaGoogle className="icon-glyph" />
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
          <FaTwitter className="icon-glyph" />
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
          <FaInstagram className="icon-glyph" />
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
          <FaTelegramPlane className="icon-glyph" />
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.whatsapp && socialMediaLinks.whatsapp !== " " ? (
        <a
          href={socialMediaLinks.whatsapp}
          className="icon-button whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="icon-glyph" />
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.portfolio && socialMediaLinks.portfolio !== " " ? (
        <a
          href={socialMediaLinks.portfolio}
          className="icon-button portfolio"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
        >
          <FaGlobe className="icon-glyph" />
          <span></span>
        </a>
      ) : null}

      {socialMediaLinks.facebook && socialMediaLinks.facebook !== " " ? (
        <a
          href={socialMediaLinks.facebook}
          className="icon-button facebook"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF className="icon-glyph" />
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
          <FaDiscord className="icon-glyph" />
          <span></span>
        </a>
      ) : null}
    </div>
  );
}
