import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ContactLinksList from "../../components/socialMedia/ContactLinksList";
import BlogsImg from "./BlogsImg";
import { motion } from "framer-motion";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio.js";
import styled from "styled-components";

const ContactData = contactPageData.contactSection;
const blogSection = contactPageData.blogSection;

const ContactButton = styled.a`
  background-color: ${props => props.theme.accentBright};
  &:hover {
    color: white;
  }
`;

function Contact(props) {
  const theme = props.theme;
  const resumeUrl = greeting.resumeLink
    ? `/${greeting.resumeLink}`
    : "";

  return (
    <div className="contact-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="contact-heading-div">
            <div className="contact-resume-div">
              <h2
                className="contact-cta-text"
                style={{ color: theme.text }}
              >
                Want to know more?
              </h2>
              <p
                className="contact-cta-subtext"
                style={{ color: theme.secondaryText }}
              >
                Get my resume and let's start a conversation!
              </p>
              <ContactButton
                theme={theme}
                className="general-btn"
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                See my Resume
              </ContactButton>
            </div>
            <div className="contact-heading-text-div">
              <h1
                className="contact-heading-text"
                style={{ color: theme.text }}
              >
                {ContactData["title"]}
              </h1>
              <p
                className="contact-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {ContactData["description"]}
              </p>
              <h3
                className="contact-social-intro"
                style={{ color: theme.text }}
              >
                Let's connect!
              </h3>
              <ContactLinksList theme={theme} />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="blog-heading-div">
            <div className="blog-heading-text-div">
              <h1 className="blog-heading-text" style={{ color: theme.text }}>
                {blogSection["title"]}
              </h1>
              <p
                className="blog-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {blogSection["subtitle"]}
              </p>
              <div className="blogsite-btn-div">
                <ContactButton
                  theme={theme}
                  className="general-btn"
                  href={blogSection.link}
                >
                  My Medium Profile
                </ContactButton>
              </div>
            </div>
            <div className="blog-heading-img-div">
              <BlogsImg theme={theme} />
            </div>
          </div>
        </motion.div>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Contact;
