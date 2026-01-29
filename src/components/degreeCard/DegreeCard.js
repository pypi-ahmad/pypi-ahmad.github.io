import React from "react";
import "./DegreeCard.css";
import { Fade, Flip } from "react-reveal";
import styled from "styled-components";

const DegreeImageDiv = styled.div`
  width: 220px;
  height: auto;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid ${props => props.theme.text};
  margin-right: 50px;
  box-shadow: 0px 0px 2px ${props => props.theme.text};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 10px ${props => props.theme.text};
  }
  @media (max-width: 768px) {
    margin-left: 50px;
    margin-bottom: 15px;
    width: 175px;
  }
`;

const DegreeCardBody = styled.div`
  border: 1px solid ${props => props.theme.text};
  border-radius: 7px;
  width: 90%;
  margin: 10px;
  box-shadow: 0px 0px 1px ${props => props.theme.text};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 10px ${props => props.theme.text};
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VisitButton = styled.p`
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  background: ${props => props.theme.accentColor};
  padding: 15px 15px;
  margin-top: 25px;
  border-radius: 4px;
  border-width: 0px;
  margin-bottom: 20px;
  width: 200px;
  height: 50px;
  font-weight: bold;
  font-family: Google Sans Regular;
  font-size: 17px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 10px ${props => props.theme.accentColor};
  }
`;

function DegreeCard(props) {
  const degree = props.degree;
  const theme = props.theme;

  return (
    <div className="degree-card">
      <Flip left duration={2000}>
        <DegreeImageDiv theme={theme}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              transform: "scale(50%, 50%)",
            }}
            src={require(`../../assests/images/${degree.logo_path}`)}
            alt={degree.alt_name}
          />
        </DegreeImageDiv>
      </Flip>
      <Fade right duration={2000} distance="40px">
        <DegreeCardBody theme={theme}>
          <div className="body-header">
            <div className="body-header-title">
              <h2 className="card-title" style={{ color: theme.text }}>
                {degree.title}
              </h2>
              <h3 className="card-subtitle" style={{ color: theme.text }}>
                {degree.subtitle}
              </h3>
            </div>
            <div className="body-header-duration">
              <h3 className="duration" style={{ color: theme.text }}>
                {degree.duration}
              </h3>
            </div>
          </div>
          <div className="body-content">
            {degree.descriptions.map((sentence) => {
              return (
                <p
                  key={sentence}
                  className="content-list"
                  style={{ color: theme.text }}
                >
                  {sentence}
                </p>
              );
            })}
            <a
              href={degree.website_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", textAlign: "center" }}
            >
              <VisitButton
                theme={theme}
                style={{
                  marginRight: "23px",
                  textDecoration: "none",
                  float: "right",
                  backgroundColor: theme.accentColor,
                }}
              >
                Visit Website
              </VisitButton>
            </a>
          </div>
        </DegreeCardBody>
      </Fade>
    </div>
  );
}

export default DegreeCard;
