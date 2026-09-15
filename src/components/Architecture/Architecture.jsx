import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import { architectures } from "../../data/architectures";
import "./Architecture.css";

function Steps({ steps, label }) {
  return <ol className="architecture-steps" aria-label={label}>
    {steps.map((step, index) => <li key={step}>
      {index > 0 ? <svg className="architecture-arrow" aria-hidden="true" width="16" height="20" viewBox="0 0 16 20"><path d="M8 2v15m-5-5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg> : null}
      <span className="architecture-node">{step}</span>
    </li>)}
  </ol>;
}

export default function Architecture({ theme }) {
  return <section id="architecture" className="architecture-section" aria-labelledby="architecture-title" style={{ color: theme.secondaryText }}>
    <p className="architecture-eyebrow" style={{ color: theme.secondaryText }}>Architecture</p>
    <h2 id="architecture-title" style={{ color: theme.text }}>How the systems are put together</h2>
    <p className="architecture-intro">Three professional systems, with detailed decisions and results on the Experience page.</p>
    <div className="architecture-grid">
      {architectures.map((system, index) => <motion.article {...revealMotion(index)} key={system.id} className="architecture-card" aria-labelledby={`architecture-${system.id}`} style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
        <h3 id={`architecture-${system.id}`} style={{ color: theme.text }}>{system.title}</h3>
        <p>{system.subtitle}</p>
        {system.systemLabel ? <p className="architecture-system" style={{ color: theme.text }}>{system.systemLabel}</p> : null}
        <div className="architecture-paths">
          {system.paths.map(path => <div key={path.label} className="architecture-path">
            <h4 style={{ color: theme.text }}>{path.label}</h4>
            <Steps steps={path.steps} label={`${system.title}: ${path.label}`} />
            {path.branches?.map(branch => <div className="architecture-branch" key={branch.label}>
              <h5 style={{ color: theme.text }}>{branch.label}</h5>
              <Steps steps={branch.steps} label={branch.label} />
            </div>)}
          </div>)}
        </div>
        {system.convergence ? <p className="architecture-convergence" style={{ color: theme.text }}>Both context paths feed: <strong>{system.convergence}</strong></p> : null}
        <ul className="architecture-notes">{system.notes.map(note => <li key={note}>{note}</li>)}</ul>
        <Link className="architecture-link" to={`/experience#${system.id}`} aria-label={`Read ${system.title} engineering story`}>Read project story</Link>
      </motion.article>)}
    </div>
    <p className="architecture-scope">Simplified architecture views; internal infrastructure and client-specific rules are omitted.</p>
  </section>;
}
