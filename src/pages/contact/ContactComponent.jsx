/**
 * Contact Page (/contact)
 *
 * Contact-first hero and verified channel list.
 *
 * Props: { theme }
 */
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ContactLinksList from "../../components/socialMedia/ContactLinksList";
import { motion } from "framer-motion";
import "./ContactComponent.css";
import { greeting, contactPageData, socialMediaLinks } from "../../portfolio.js";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";

const ContactData = contactPageData.contactSection;

function Contact(props) {
  const theme = props.theme;
  const resumeUrl = greeting.resumeLink
    ? `/${greeting.resumeLink}`
    : "";

  return (
    <div className="contact-main">
      <Header />
      <main className="basic-contact" id="main-content">
        <motion.section
          className="contact-hero"
          aria-labelledby="contact-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(`0 28px 80px ${theme.shadowColor}`, theme.panelGlow),
          }}
        >
          <p className="contact-eyebrow" style={{ color: theme.accentSolid }}>
            {ContactData.eyebrow}
          </p>
          <h1 id="contact-title" style={{ color: theme.text }}>
            {ContactData.title}
          </h1>
          <p className="contact-intro" style={{ color: theme.secondaryText }}>
            {ContactData.description}
          </p>
          <div className="contact-actions">
            <a
              className="contact-action contact-action--primary"
              href={`mailto:${socialMediaLinks.gmail}`}
              style={{ background: theme.accentGradient, color: theme.accentText }}
            >
              {ContactData.emailLabel}
            </a>
            <a
              className="contact-action contact-action--secondary"
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.text, borderColor: theme.borderSoft }}
            >
              {ContactData.resumeLabel}
            </a>
          </div>
        </motion.section>
        <motion.section
          className="contact-channels"
          aria-labelledby="contact-channels-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="contact-section-heading">
            <h2 id="contact-channels-title" style={{ color: theme.text }}>
              {ContactData.channelsTitle}
            </h2>
            <p style={{ color: theme.secondaryText }}>
              {ContactData.channelsDescription}
            </p>
          </div>
          <ContactLinksList theme={theme} />
        </motion.section>
      </main>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Contact;
