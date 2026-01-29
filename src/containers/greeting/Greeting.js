import React, { useState } from "react";
import "./Greeting.css";
import { greeting } from "../../portfolio";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import FeelingProud from "./FeelingProud";

export default function Greeting(props) {
  const theme = props.theme;
  const navigate = useNavigate();
  const [docError, setDocError] = useState("");
  const resumeUrl = greeting.resumeLink
    ? `${process.env.PUBLIC_URL}/${greeting.resumeLink}`
    : "";
  const coverUrl = greeting.coverLetterLink
    ? `${process.env.PUBLIC_URL}/${greeting.coverLetterLink}`
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
    <Fade bottom duration={2000} distance="40px">
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
                  {greeting.full_name}.{" "}
                </span>
                {greeting.subTitle}
              </p>
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
    </Fade>
  );
}
