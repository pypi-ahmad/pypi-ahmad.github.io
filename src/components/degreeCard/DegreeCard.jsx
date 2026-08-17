import React from "react";
import "./DegreeCard.css";

function DegreeCard({ degree, theme }) {
  return (
    <article
      className="degree-card layer-card shadow-sm hover-shadow-lg"
      style={{
        background: theme.cardBackgroundAlt,
        border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
        borderRadius: theme.surfaceRadius,
      }}
    >
      <div className="degree-card__logo" aria-hidden="true">
        <img
          src={`/images/${degree.logoPath}`}
          alt=""
          loading="lazy"
          decoding="async"
          width={88}
          height={88}
        />
      </div>
      <div className="degree-card__content">
        <p className="degree-card__duration" style={{ color: theme.accentSolid }}>
          {degree.duration}
        </p>
        <h3 style={{ color: theme.text }}>{degree.subtitle}</h3>
        <p className="degree-card__institution" style={{ color: theme.secondaryText }}>
          {degree.title}
        </p>
        <ul className="degree-card__coursework" style={{ color: theme.secondaryText }}>
          {degree.descriptions.map(description => (
            <li key={description}>{description.replace(/^⚡\s*/, "")}</li>
          ))}
        </ul>
        <a
          className="degree-card__link"
          href={degree.websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.accentSolid }}
        >
          Visit institution <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export default DegreeCard;
