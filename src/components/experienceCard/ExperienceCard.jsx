import React from "react";
import "./ExperienceCard.css";

function DetailList({ title, items, theme }) {
  return (
    <section className="experience-detail-group">
      <h4 style={{ color: theme.text }}>{title}</h4>
      <ul>
        {items.map(item => <li key={item} style={{ color: theme.secondaryText }}>{item}</li>)}
      </ul>
    </section>
  );
}

export default function ExperienceCard({ experience, theme }) {
  const borderColor = /^#([0-9a-f]{6})$/i.test(experience.color)
    ? `${experience.color}55`
    : theme.borderSoft;
  const isFeatured = Boolean(experience.systemContext);

  return (
    <article
      className={`experience-card${isFeatured ? " experience-card--featured" : ""}`}
      style={{ background: theme.cardBackgroundAlt, borderColor }}
    >
      <header className="experience-card-header">
        <a className="experience-card-logo-link" href={experience.companyUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="experience-card-logo"
            src={`/images/${experience.logoPath}`}
            alt={`${experience.company} logo`}
            loading="lazy"
            decoding="async"
            width={70}
            height={70}
          />
        </a>
        <div className="experience-card-identity">
          <h3 style={{ color: theme.text }}>{experience.title}</h3>
          <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" style={{ color: theme.secondaryText }}>
            {experience.company}
          </a>
        </div>
        <div className="experience-card-meta" style={{ color: theme.secondaryText }}>
          <span>{experience.duration}</span>
          <span>{experience.location}</span>
        </div>
      </header>

      {isFeatured ? (
        <div className="experience-featured-body">
          <div className="experience-detail-grid">
            <DetailList title="Team system context" items={experience.systemContext} theme={theme} />
            <DetailList title="My contributions" items={experience.contributions} theme={theme} />
          </div>
          <section className="experience-outcomes" aria-labelledby="deloitte-outcomes-title">
            <h4 id="deloitte-outcomes-title" style={{ color: theme.text }}>Qualified outcomes</h4>
            <ul>
              {experience.outcomes.map(outcome => (
                <li key={outcome.label} style={{ background: theme.accentSoft, borderColor: theme.borderSoft }}>
                  <strong style={{ color: theme.accentSolid }}>{outcome.metric}</strong>
                  <span style={{ color: theme.text }}>{outcome.label}</span>
                  <small style={{ color: theme.secondaryText }}>{outcome.context}</small>
                </li>
              ))}
            </ul>
          </section>
          <aside className="experience-disclosure" style={{ color: theme.secondaryText, borderColor: theme.borderSoft }}>
            <strong style={{ color: theme.text }}>Scope note</strong>
            <p>{experience.disclosureNote}</p>
          </aside>
        </div>
      ) : (
        <ul className="experience-description-list">
          {experience.descriptions.map(description => (
            <li key={description} style={{ color: theme.secondaryText }}>{description}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
