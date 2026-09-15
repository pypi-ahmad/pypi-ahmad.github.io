import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { homePageData, projects, skillsPageData } from "../../portfolio";
import { buildThemeBackground, buildThemeShadow, revealMotion } from "../../themeMotion";
import "./SkillsPage.css";

export default function SkillsPage({ theme }) {
  // These names must match projects.data exactly; content tests guard the cross-file references.
  const featuredProjects = skillsPageData.featuredProjectNames.map(name =>
    projects.data.find(project => project.name === name)
  );

  return (
    <div className="skills-main">
      <Header />
      <main id="main-content">
        <section
          className="skills-hero"
          aria-labelledby="skills-title"
          style={{
            background: buildThemeBackground(theme.heroGradient, theme.heroPattern),
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.heroRadius,
            boxShadow: buildThemeShadow(`0 2px 8px ${theme.shadowColor}`, theme.panelGlow),
          }}
        >
          <motion.p {...revealMotion(0, true)} className="skills-eyebrow" style={{ color: theme.secondaryText }}>
            {skillsPageData.eyebrow}
          </motion.p>
          <h1 id="skills-title" style={{ color: theme.text }}>
            {skillsPageData.title}
          </h1>
          <motion.p {...revealMotion(1, true)} className="skills-intro" style={{ color: theme.secondaryText }}>
            {skillsPageData.subtitle}
          </motion.p>
        </section>

        <section className="skills-section" aria-labelledby="capabilities-title">
          <motion.div {...revealMotion()} className="skills-section-heading">
            <h2 id="capabilities-title" style={{ color: theme.text }}>Core capabilities</h2>
            <p style={{ color: theme.secondaryText }}>
              The systems I build and how I evaluate them.
            </p>
          </motion.div>
          <div className="capability-grid">
            {skillsPageData.capabilities.map((capability, index) => (
              <motion.article
                {...revealMotion(index)}
                key={capability.title}
                className="capability-card"
                style={{
                  background: buildThemeBackground(theme.cardBackgroundAlt, theme.surfacePattern),
                  border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                  borderRadius: theme.surfaceRadius,
                  boxShadow: buildThemeShadow(`0 2px 8px ${theme.shadowColor}`, theme.panelGlow),
                }}
              >
                <h3 style={{ color: theme.text }}>{capability.title}</h3>
                <p style={{ color: theme.secondaryText }}>{capability.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="skills-section" aria-labelledby="toolkit-title">
          <div className="skills-section-heading">
            <h2 id="toolkit-title" style={{ color: theme.text }}>Tools in context</h2>
            <p style={{ color: theme.secondaryText }}>Tools are grouped by where I’ve used them, without a proficiency ranking. Some appear in more than one context.</p>
          </div>
          <div className="toolkit-grid">
            {skillsPageData.toolGroups.map((group, index) => <motion.article {...revealMotion(index)} key={group.title} className="toolkit-group" aria-labelledby={`tool-group-${index}`} style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
              <h3 id={`tool-group-${index}`} style={{ color: theme.text }}>{group.title}</h3>
              <p className="toolkit-description" style={{ color: theme.secondaryText }}>{group.description}</p>
              <div className="toolkit-examples">
                {group.examples.map(example => <div className="toolkit-example" key={example.label}>
                  <ul className="skill-tags" aria-label={`${example.label} tools`}>
                    {example.tools.map(tool => <li key={tool} style={{ color: theme.text, borderColor: theme.borderSoft }}>{tool}</li>)}
                  </ul>
                  <p style={{ color: theme.secondaryText }}>{example.context}</p>
                  {example.href.startsWith("/")
                    ? <Link className="skills-evidence-link" to={example.href}>{example.label}</Link>
                    : <a className="skills-evidence-link" href={example.href}>{example.label}</a>}
                </div>)}
              </div>
            </motion.article>)}
          </div>
        </section>

        <section className="skills-section" aria-labelledby="skills-evidence-title">
          <motion.div {...revealMotion()} className="skills-section-heading">
            <h2 id="skills-evidence-title" style={{ color: theme.text }}>Evidence in practice</h2>
            <p style={{ color: theme.secondaryText }}>
              Reported employer results and public projects show where I’ve used these skills.
            </p>
          </motion.div>
          <ul className="skills-outcome-grid">
            {homePageData.outcomes.map((outcome, index) => (
              <motion.li
                {...revealMotion(index)}
                key={outcome.label}
                style={{
                  background: theme.evidenceSurface,
                  border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.evidenceBorder}`,
                  borderRadius: theme.surfaceRadius,
                }}
              >
                <strong style={{ color: theme.evidenceText }}>{outcome.metric}</strong>
                <h3 style={{ color: theme.text }}>{outcome.label}</h3>
                <p style={{ color: theme.secondaryText }}>{outcome.context}</p>
              </motion.li>
            ))}
          </ul>
          <div className="skills-proof-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.url} repo={project} index={index + 1} priority />
            ))}
          </div>
        </section>

        <section className="skills-section" aria-labelledby="lifecycle-title">
          <div className="skills-section-heading">
            <h2 id="lifecycle-title" style={{ color: theme.text }}>AI system lifecycle</h2>
            <p style={{ color: theme.secondaryText }}>These stages appear across my projects, rather than in one shared architecture. Each system uses the stages its problem needs.</p>
          </div>
          <ol className="skills-lifecycle" style={{ color: theme.text }}>
            {skillsPageData.lifecycle.map((stage, index) => <li key={stage}>
              {index > 0 && <svg aria-hidden="true" className="skills-flow-arrow" width="18" height="18" viewBox="0 0 18 18"><path d="M2 9h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>}
              <span>{stage}</span>
            </li>)}
          </ol>
        </section>

        <section className="skills-section" aria-labelledby="learning-title">
          <div className="skills-section-heading skills-learning-heading">
            <h2 id="learning-title" style={{ color: theme.text }}>Currently exploring</h2>
            <p style={{ color: theme.secondaryText }}>{skillsPageData.learningIntroduction}</p>
          </div>
          <div className="skills-learning-grid">
            {skillsPageData.learning.map((area, index) => <motion.article {...revealMotion(index)} key={area.title} className="skills-learning-card" aria-labelledby={`learning-area-${index}`} style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
              <h3 id={`learning-area-${index}`} style={{ color: theme.text }}>{area.title}</h3>
              <ul className="skill-tags">
                {area.topics.map(topic => <li key={topic} style={{ color: theme.secondaryText, borderColor: theme.borderSoft }}>{topic}</li>)}
              </ul>
            </motion.article>)}
          </div>
        </section>

        <motion.section
          {...revealMotion()}
          className="skills-cta"
          style={{
            background: theme.accentSoft,
            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
            borderRadius: theme.surfaceRadius,
          }}
        >
          <div>
            <h2 style={{ color: theme.text }}>See the skills in working systems.</h2>
            <p style={{ color: theme.secondaryText }}>
              Explore the implementation details or contact me about an AI engineering role or project.
            </p>
          </div>
          <div className="skills-cta-actions">
            <Link to="/projects" style={{ background: theme.accentGradient, color: theme.accentText }}>
              View projects
            </Link>
            <Link to="/contact" style={{ color: theme.text, borderColor: theme.borderSoft }}>
              Contact me
            </Link>
          </div>
        </motion.section>
      </main>
      <Footer theme={theme} />
    </div>
  );
}
