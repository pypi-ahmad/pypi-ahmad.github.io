import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { fdePageData, skillsPageData } from "../../portfolio";
import "./FdePage.css";

export default function FdePage({ theme }) {
  return <div className="fde-main">
    <Header />
    <main id="main-content" style={{ color: theme.secondaryText }}>
      <section className="fde-hero" aria-labelledby="fde-title" style={{ background: theme.heroGradient, borderColor: theme.borderSoft }}>
        <motion.p {...revealMotion(0, true)} className="fde-eyebrow" style={{ color: theme.secondaryText }}>{fdePageData.eyebrow}</motion.p>
        <h1 id="fde-title" style={{ color: theme.text }}>{fdePageData.title}</h1>
        <motion.p {...revealMotion(1, true)} className="fde-intro">{fdePageData.introduction}</motion.p>
      </section>
      <section className="fde-section" aria-labelledby="fde-foundations-title">
        <h2 id="fde-foundations-title" style={{ color: theme.text }}>Foundations I’m building on</h2>
        <p className="fde-section-intro">These capabilities come from my professional work and personal projects. They are not completed FDE milestones or a chronological curriculum. Each linked story explains my contribution.</p>
        <div className="fde-grid">
          {fdePageData.foundations.map((foundation, index) => <motion.article {...revealMotion(index)} key={foundation.title} aria-labelledby={`fde-foundation-${index}`} className="fde-card" style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
            <p className="fde-context" style={{ color: theme.secondaryText }}>{foundation.context}</p>
            <h3 id={`fde-foundation-${index}`} style={{ color: theme.text }}>{foundation.title}</h3>
            <p>{foundation.description}</p>
            <ul className="fde-evidence-links">
              {foundation.links.map(link => <li key={link.href}><Link to={link.href}>{link.label}</Link></li>)}
            </ul>
          </motion.article>)}
        </div>
      </section>
      <section className="fde-section" aria-labelledby="fde-learning-title">
        <h2 id="fde-learning-title" style={{ color: theme.text }}>Learning direction</h2>
        <p className="fde-section-intro">{fdePageData.learningIntroduction}</p>
        <ul className="fde-learning-list" style={{ color: theme.text }}>
          {skillsPageData.learning.map(area => <li key={area.title}>{area.title}</li>)}
        </ul>
        <div className="fde-actions">
          <Link to="/skills">Explore my skills and learning</Link>
          <Link to="/contact">Contact me</Link>
        </div>
      </section>
    </main>
    <Footer theme={theme} />
  </div>;
}
