/**
 * Contact Page (/contact)
 *
 * Contact-first hero and configured channel list.
 *
 * Props: { theme }
 */
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ContactLinksList, { buildContactItems } from "../../components/socialMedia/ContactLinksList";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ContactComponent.css";
import { contactPageData } from "../../portfolio.js";
import { buildThemeBackground, buildThemeShadow, revealMotion } from "../../themeMotion";

const ContactData = contactPageData.contactSection;

function Contact(props) {
  const theme = props.theme;
  const items = buildContactItems();
  // Derive the primary action from the same filtered list to avoid an empty mailto link.
  const email = items.find(item => item.key === "email");

  return (
    <div className="contact-main">
      <Header />
      <main className="basic-contact" id="main-content">
        <section
          className="contact-hero"
          aria-labelledby="contact-title"
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(`0 28px 80px ${theme.shadowColor}`, theme.panelGlow),
          }}
        >
          <motion.p {...revealMotion(0, true)} className="contact-eyebrow" style={{ color: theme.accentSolid }}>
            {ContactData.eyebrow}
          </motion.p>
          <h1 id="contact-title" style={{ color: theme.text }}>
            {ContactData.title}
          </h1>
          <motion.p {...revealMotion(1, true)} className="contact-intro" style={{ color: theme.secondaryText }}>
            {ContactData.description}
          </motion.p>
          {email && <motion.div {...revealMotion(2, true)} className="contact-actions">
            <a
              className="contact-action contact-action--primary"
              href={email.href}
              style={{ background: theme.accentGradient, color: theme.accentText }}
            >
              {ContactData.emailLabel}
            </a>
          </motion.div>}
        </section>
        {items.length > 0 ? <section
          className="contact-channels"
          aria-labelledby="contact-channels-title"
        >
          <motion.div {...revealMotion()} className="contact-section-heading">
            <h2 id="contact-channels-title" style={{ color: theme.text }}>
              {ContactData.channelsTitle}
            </h2>
          </motion.div>
          <ContactLinksList theme={theme} items={items} />
        </section> : <section className="contact-channels" aria-label="Contact availability">
          <p>Contact links are currently unavailable.</p>
          <Link to="/home" style={{ color: theme.accentSolid }}>Return home</Link>
        </section>}
      </main>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Contact;
