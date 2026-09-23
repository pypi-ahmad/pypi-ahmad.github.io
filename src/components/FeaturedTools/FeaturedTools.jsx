import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "../../data/caseStudies";
import { revealMotion } from "../../themeMotion";
import "./FeaturedTools.css";

function Command({ project, label, code }) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Copied.");
    } catch {
      setStatus("Copy unavailable. Select and copy the command below.");
    }
  }
  return <div className="featured-tool__command">
    <div className="featured-tool__command-heading">
      <span>{label}</span>
      <button type="button" onClick={copy} aria-label={`Copy ${project}: ${label}`}>Copy</button>
    </div>
    <pre><code>{code}</code></pre>
    <p className="featured-tool__copy-status" role="status">{status}</p>
  </div>;
}

export default function FeaturedTools() {
  return <section id="featured-tools" className="featured-tools" aria-labelledby="featured-tools-title">
    <header className="featured-tools__heading">
      <p>Open-source software</p>
      <h2 id="featured-tools-title">Featured document tools</h2>
      <p>Two applications you can install with uv and use on your own documents.</p>
    </header>
    {caseStudies.filter(project => project.homeFeature).map((project, index) => {
      const feature = project.homeFeature;
      const diagram = project.diagrams[0];
      return <motion.article {...revealMotion(index)} className="featured-tool" key={project.id} aria-labelledby={`home-${project.id}`}>
        <div className="featured-tool__body">
          <div className="featured-tool__overview">
            <p className="featured-tool__category">{project.category}</p>
            <h3 id={`home-${project.id}`}>{project.name}</h3>
            <p className="featured-tool__tagline">{feature.tagline}</p>
            <p>{feature.introduction}</p>
            <h4>Use it on your documents</h4>
            <p>{feature.usage}</p>
            <div className="featured-tool__links">
              <a href={feature.readmeUrl} target="_blank" rel="noopener noreferrer">Read {project.name} README</a>
              <a href={project.repositories[0].url} target="_blank" rel="noopener noreferrer">View {project.name} on GitHub</a>
              <Link to={`/projects#${project.id}`} aria-label={`Read ${project.name} case study`}>Read case study</Link>
            </div>
          </div>
          <section className="featured-tool__setup" aria-label={`${project.name} installation and usage`}>
            <div className="featured-tool__setup-heading"><h4>Install and try</h4><span>{feature.version}</span></div>
            <p>{feature.requirements} <a href="https://docs.astral.sh/uv/getting-started/installation/" target="_blank" rel="noopener noreferrer">Install uv</a>.</p>
            {feature.installationNote ? <p>{feature.installationNote}</p> : null}
            {feature.commands.map(command => <Command key={command.label} project={project.name} {...command} />)}
          </section>
        </div>
        <figure className="featured-tool__diagram">
          <a href={diagram.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} diagram at full size`}>
            <img src={diagram.src} alt={diagram.alt} width={feature.diagramWidth} height={feature.diagramHeight} loading="lazy" decoding="async" />
          </a>
          <figcaption>
            {diagram.title}. Select the diagram to view it at full size.
            {feature.diagramCollectionLabel ? <Link to={`/projects#${project.id}`}>{feature.diagramCollectionLabel}</Link> : null}
          </figcaption>
        </figure>
      </motion.article>;
    })}
  </section>;
}
