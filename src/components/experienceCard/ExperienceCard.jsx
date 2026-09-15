import { motion } from "framer-motion";
import { useId } from "react";
import { revealMotion } from "../../themeMotion";
import "./ExperienceCard.css";
import CaseStudyDisclosure from "../CaseStudy/CaseStudyDisclosure";

function DetailList({ title, items, theme, level = 4 }) {
  const Heading = `h${level}`;
  return (
    <section className="experience-detail-group">
      <Heading style={{ color: theme.text }}>{title}</Heading>
      <ul>
        {items.map(item => <li key={item} style={{ color: theme.secondaryText }}>{item}</li>)}
      </ul>
    </section>
  );
}

function Outcomes({ outcomes, theme, level = 4, projectHeadingId }) {
  const id = useId();
  const Heading = `h${level}`;
  return <section className="experience-outcomes" aria-labelledby={projectHeadingId ? `${projectHeadingId} ${id}` : id}>
    <Heading id={id} style={{ color: theme.text }}>Reported results</Heading>
    <ul>{outcomes.map(outcome => <li key={outcome.label} style={{ background: theme.evidenceSurface, borderColor: theme.evidenceBorder }}>
      <strong style={{ color: theme.evidenceText }}>{outcome.metric}</strong>
      <span style={{ color: theme.text }}>{outcome.label}</span>
      <small style={{ color: theme.secondaryText }}>{outcome.context}</small>
    </li>)}</ul>
  </section>;
}

function ProjectGroup({ group, theme }) {
  const id = group.id;
  return <section className="experience-project-group" aria-labelledby={id} style={{ color: theme.secondaryText }}>
    <h4 id={id} tabIndex={-1} data-case-study-heading style={{ color: theme.text }}>{group.title}</h4>
    <p>{group.context}</p>
    {group.outcomes ? <Outcomes outcomes={group.outcomes} theme={theme} level={5} projectHeadingId={id} /> : null}
    <CaseStudyDisclosure headingId={id} label="Read project story">
    {group.story ? <div className="experience-story">
      <h5 style={{ color: theme.text }}>Problem</h5>
      <p>{group.story.problem}</p>
      <h5 style={{ color: theme.text }}>What changed the approach</h5>
      <p>{group.story.finding}</p>
      <DetailList title="Engineering decisions" items={group.story.decisions} theme={theme} level={5} />
      <h5 style={{ color: theme.text }}>What I learned</h5>
      <p>{group.story.lesson}</p>
    </div> : null}
    {group.subprojects?.map(project => <section key={project.title}>
      <h5 style={{ color: theme.text }}>{project.title}</h5>
      <p>{project.description}</p>
    </section>)}
    {group.contributions ? <DetailList title="My contributions" items={group.contributions} theme={theme} level={5} /> : null}
    </CaseStudyDisclosure>
  </section>;
}

export default function ExperienceCard({ experience, theme }) {
  // Appending alpha bytes is valid only for six-digit hex colors; other forms use the theme border.
  const borderColor = /^#([0-9a-f]{6})$/i.test(experience.color)
    ? `${experience.color}55`
    : theme.borderSoft;
  // Featured roles separate team context from personal contributions; older roles use descriptions.
  const isFeatured = Boolean(experience.projectGroups || experience.systemContext);

  return (
    <motion.article
      {...revealMotion()}
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
          {experience.projectGroups ? experience.projectGroups.map(group => (
            <ProjectGroup key={group.id} group={group} theme={theme} />
          )) : <>
          {experience.story ? <section className="experience-story" style={{ color: theme.secondaryText }}>
            <h4 id={experience.story.id} tabIndex={experience.story.id ? -1 : undefined} data-case-study-heading={experience.story.id ? true : undefined} style={{ color: theme.text }}>{experience.story.title}</h4>
            <p>{experience.story.problem}</p>
          </section> : null}
          <Outcomes outcomes={experience.outcomes} theme={theme} />
          <CaseStudyDisclosure headingId={experience.story?.id} label="Read project story">
          {experience.story ? <section className="experience-story" style={{ color: theme.secondaryText }}>
            <h4 style={{ color: theme.text }}>What changed the approach</h4>
            <p>{experience.story.finding}</p>
            <DetailList title="Engineering decisions" items={experience.story.decisions} theme={theme} />
            <h4 style={{ color: theme.text }}>What I learned</h4>
            <p>{experience.story.lesson}</p>
          </section> : null}
          <div className="experience-detail-grid">
            <DetailList title="Project context" items={experience.systemContext} theme={theme} />
            <DetailList title="My contributions" items={experience.contributions} theme={theme} />
          </div>
          </CaseStudyDisclosure>
          </>}
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
    </motion.article>
  );
}
