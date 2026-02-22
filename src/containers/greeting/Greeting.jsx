import React, { useState } from "react";
import "./Greeting.css";
import { greeting } from "../../portfolio";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeelingProud from "./FeelingProud";

export default function Greeting(props) {
  const theme = props.theme;
  const navigate = useNavigate();
  const [docError, setDocError] = useState("");
  const resumeUrl = greeting.resumeLink
    ? `/${greeting.resumeLink}`
    : "";
  const coverUrl = greeting.coverLetterLink
    ? `/${greeting.coverLetterLink}`
    : "";

  const handleDocOpen = async (event, url, label) => {
    event.preventDefault();
    if (!url) {
      setDocError(`${label} is unavailable right now.`);
      return;
    }

    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("missing");
      }
      setDocError("");
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setDocError(`${label} is unavailable right now.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text">{greeting.title}</h1>
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText }}
              >
                <span>I'm </span>
                <span style={{ color: theme.accentColor }}>
                  {greeting.fullName}.{" "}
                </span>
                {greeting.subTitle}
              </p>

              {/* Hero Bullets */}
              {greeting.heroBullets && greeting.heroBullets.length > 0 && (
                <ul className="hero-bullets" style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "1rem 0",
                }}>
                  {greeting.heroBullets.map((bullet, i) => (
                    <li key={i} style={{
                      fontSize: "0.95rem",
                      color: theme.secondaryText,
                      marginBottom: "0.4rem",
                      paddingLeft: "1.2rem",
                      position: "relative",
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: theme.accentColor || "#64ffda",
                      }}>▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {/* Philosophy */}
              {greeting.philosophy && (
                <p className="greeting-philosophy" style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: theme.secondaryText,
                  borderLeft: `3px solid ${theme.accentColor || "#64ffda"}`,
                  paddingLeft: "1rem",
                  marginTop: "0.8rem",
                  marginBottom: "1.2rem",
                  lineHeight: "1.5",
                }}>
                  {greeting.philosophy}
                </p>
              )}

              <div className="portfolio-repo-btn-div">
                <button
                  className="button"
                  onClick={() => {
                    navigate("/contact");
                  }}
                  style={{
                    backgroundColor: theme.accentBright,
                    color: "#fff",
                    transition: "all 0.2s ease-in-out",
                    marginRight: "15px",
                  }}
                >
                  Contact Me
                </button>
                {greeting.resumeLink && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    onClick={event =>
                      handleDocOpen(event, resumeUrl, "Resume")
                    }
                    style={{
                      backgroundColor: theme.accentBright,
                      color: "#fff",
                      transition: "all 0.2s ease-in-out",
                      marginRight: "15px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    Download Resume
                  </a>
                )}
                {greeting.coverLetterLink && (
                  <a
                    href={coverUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                    onClick={event =>
                      handleDocOpen(event, coverUrl, "Cover letter")
                    }
                    style={{
                      backgroundColor: theme.accentBright,
                      color: "#fff",
                      transition: "all 0.2s ease-in-out",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    View Cover Letter
                  </a>
                )}
              </div>
              {docError && (
                <p
                  className="doc-fallback-text"
                  style={{ color: theme.secondaryText }}
                >
                  {docError}
                </p>
              )}
            </div>
          </div>
          <div className="greeting-image-div">
            <FeelingProud theme={theme} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
