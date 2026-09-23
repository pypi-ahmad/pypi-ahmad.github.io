import { useId, useState } from "react";
import "./ProjectDiagrams.css";

export default function ProjectDiagrams({ project }) {
  const selectId = useId();
  const [selected, setSelected] = useState(project.diagrams[0].src);
  const diagram = project.diagrams.find(item => item.src === selected);

  return <div className="project-diagrams">
    <div className="project-diagrams__controls">
      <label htmlFor={selectId}>{project.name} diagram</label>
      <select id={selectId} value={selected} onChange={event => setSelected(event.target.value)}>
        {project.diagrams.map(item => <option key={item.src} value={item.src}>{item.title}</option>)}
      </select>
      <a href={diagram.src} target="_blank" rel="noopener noreferrer">
        Open {diagram.title} in a new tab
      </a>
    </div>
    <p>Use the diagram controls to zoom, pan, and change views. On narrow screens, scroll sideways to reach all controls.</p>
    <div className="project-diagrams__frame" tabIndex={0} aria-label="Scroll interactive diagram">
      <iframe
        key={diagram.src}
        src={diagram.src}
        title={`${project.name}: ${diagram.title} (interactive)`}
        loading="lazy"
        allow="fullscreen; clipboard-write"
        allowFullScreen
      />
    </div>
  </div>;
}
