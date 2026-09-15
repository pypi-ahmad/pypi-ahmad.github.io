import "./CaseStudy.css";
import CaseStudyDisclosure from "./CaseStudyDisclosure";

export default function CaseStudy({ study }) {
  return (
    <article className="case-study layer-card" aria-labelledby={study.id}>
      <header>
        <p className="case-study__category">{study.category}</p>
        <h2 id={study.id} tabIndex={-1} data-case-study-heading>{study.name}</h2>
        <p>{study.description}</p>
      </header>
      <CaseStudyDisclosure headingId={study.id} label="Read case study">
      <div className="case-study__grid">
        <section><h3>Problem</h3><p>{study.problem}</p></section>
        <section><h3>What I built</h3><p>{study.built}</p></section>
      </div>
      <section>
        <h3>Engineering decisions</h3>
        <ul>{study.decisions.map(decision => <li key={decision}>{decision}</li>)}</ul>
      </section>
      <div className="case-study__grid">
        <section><h3>Evidence</h3><p>{study.evidence}</p></section>
        <section><h3>Limits</h3><p>{study.limitations}</p></section>
      </div>
      <ul className="case-study__stack" aria-label={`${study.name} technologies`}>
        {study.technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      <section>
        <h3>{study.repositories.length > 1 ? "Explore the implementations" : "Explore the project"}</h3>
        <ul className="case-study__repositories">
          {study.repositories.map(repository => (
            <li key={repository.url}>
              <a href={repository.url} target="_blank" rel="noopener noreferrer">{repository.name} on GitHub</a>
              {repository.approach ? <p>{repository.approach}</p> : null}
            </li>
          ))}
        </ul>
        {study.demoUrl ? <a href={study.demoUrl} target="_blank" rel="noopener noreferrer">Open {study.name} demo</a> : null}
      </section>
      </CaseStudyDisclosure>
    </article>
  );
}
