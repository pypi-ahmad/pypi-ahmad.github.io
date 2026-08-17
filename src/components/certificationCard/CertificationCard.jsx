import React from "react";
import "./CertificationCard.css";

function CertificationCard({ certificate, theme }) {
  return (
    <article
      className="cert-card layer-card shadow-sm hover-shadow-lg"
      style={{
        background: theme.cardBackgroundAlt,
        border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
        borderRadius: theme.surfaceRadius,
      }}
    >
      <p className="cert-card__issuer" style={{ color: theme.accentSolid }}>
        {certificate.subtitle}
      </p>
      <h4 style={{ color: theme.text }}>{certificate.title}</h4>
      {certificate.completionDate ? (
        <p className="cert-card__date" style={{ color: theme.secondaryText }}>
          Completed {certificate.completionDate}
        </p>
      ) : null}
      {certificate.summary ? (
        <p className="cert-card__summary" style={{ color: theme.secondaryText }}>
          {certificate.summary}
        </p>
      ) : null}
      {certificate.highlights?.length ? (
        <ul className="cert-card__highlights" aria-label="Course topics">
          {certificate.highlights.map(highlight => (
            <li key={highlight} style={{ color: theme.secondaryText }}>
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="cert-card__actions">
        {certificate.certificateLink ? (
          <a
            href={certificate.certificateLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.accentSolid }}
          >
            Verify credential <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {certificate.pdfLink ? (
          <a
            href={certificate.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.accentSolid }}
          >
            View certificate PDF <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default CertificationCard;
