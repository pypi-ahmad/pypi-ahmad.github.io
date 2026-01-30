import React from "react";
import "./CertificationCard.css";
import { Fade } from "react-reveal";
import styled from "styled-components";

const CertCardDiv = styled.div`
  box-shadow: 0px 2px 5px ${props => props.certificate.color_code};
  border: 1px solid ${props => props.certificate.color_code};
  &:hover {
    box-shadow: 0 5px 15px ${props => props.certificate.color_code};
  }
`;

function CertificationCard(props) {
  const certificate = props.certificate;
  const theme = props.theme;

  return (
    <Fade bottom duration={2000} distance="20px">
      <CertCardDiv className="cert-card" certificate={certificate}>
        <div className="content">
          <a
            href={certificate.certificate_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="content-overlay"></div>
            <div
              className="cert-header"
              style={{ backgroundColor: certificate.color_code }}
            >
              <img
                className="logo_img"
                src={`/images/${certificate.logo_path}`}
                alt={certificate.alt_name}
              />
            </div>
          </a>
        </div>
        <div className="cert-body">
          <h2 className="cert-body-title" style={{ color: theme.text }}>
            {certificate.title}
          </h2>
          <h3
            className="cert-body-subtitle"
            style={{ color: theme.secondaryText }}
          >
            {certificate.subtitle}
          </h3>
        </div>
      </CertCardDiv>
    </Fade>
  );
}

export default CertificationCard;
