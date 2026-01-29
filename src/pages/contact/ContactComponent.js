import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ContactLinksList from "../../components/socialMedia/ContactLinksList";
import BlogsImg from "./BlogsImg";
import { Fade } from "react-reveal";
import "./ContactComponent.css";
import { greeting, contactPageData } from "../../portfolio.js";
import styled from "styled-components";

const ContactData = contactPageData.contactSection;
const blogSection = contactPageData.blogSection;

const ContactButton = styled.a`
  background-color: ${props => props.theme.accentBright};
  &:hover {
    box-shadow: 0 5px 15px ${props => props.theme.accentBright};
  }
`;

function Contact(props) {
  const theme = props.theme;
  const resumeUrl = greeting.resumeLink
    ? `${process.env.PUBLIC_URL}/${greeting.resumeLink}`
    : "";

  return (
    <div className="contact-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-contact">
        <Fade bottom duration={1000} distance="40px">
          <div className="contact-heading-div">
            <div className="contact-heading-img-div">
              {/* <img
                className="profile-pic"
                src={require(`../../assests/images/${ContactData["profile_image_path"]}`)}
                alt=""
              /> */}
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
              <ContactLinksList theme={theme} />
              <br />
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
          </div>
        </Fade>
        <Fade bottom duration={1000} distance="40px">
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
        </Fade>
      </div>
      <Footer theme={props.theme} onToggle={props.onToggle} />
    </div>
  );
}

export default Contact;
