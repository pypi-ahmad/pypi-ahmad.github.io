import "./CertificationCard.css";

// Credentials can expose verification, a PDF, or both; missing optional fields must stay absent.
function CertificationCard({ certificate, theme, headingLevel = 4 }) {
  const Title = headingLevel === 3 ? "h3" : "h4";

  return (
    <article
      className="cert-card layer-card shadow-sm hover-shadow-lg"
      style={{
        background: theme.cardBackgroundAlt,
        border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
        borderRadius: theme.surfaceRadius,
      }}
    >
      <div className="cert-card__heading">
        <div>
          <p className="cert-card__issuer" style={{ color: theme.accentSolid }}>
            {certificate.subtitle}
          </p>
          <Title className="cert-card__title" style={{ color: theme.text }}>
            {certificate.title}
          </Title>
        </div>
        {certificate.badgeImagePath ? (
          <img
            className="cert-card__badge"
            src={certificate.badgeImagePath}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      {certificate.completionDate ? (
        <p className="cert-card__date" style={{ color: theme.secondaryText }}>
          {certificate.dateLabel || "Completed"} {certificate.completionDate}
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
            aria-label={`Verify credential: ${certificate.title}`}
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
            aria-label={`View certificate PDF: ${certificate.title}`}
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
