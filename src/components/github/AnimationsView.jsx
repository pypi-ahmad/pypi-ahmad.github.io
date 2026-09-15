import { useState } from "react";
import { useThemeController } from "../../themeController";

const output =
  "https://raw.githubusercontent.com/pypi-ahmad/pypi-ahmad/output/";
export const animations = [
  { name: "Snake", file: "github-contribution-grid-snake" },
  { name: "Pac-Man", file: "pacman-contribution-graph" },
  { name: "Breakout", file: "breakout-contribution-graph" },
  { name: "Galaga", file: "galaga-contribution-graph" },
  { name: "Bomberman", file: "bomberman-contribution-graph" },
  { name: "Puzzle Bobble", file: "puzzle-bobble-contribution-graph" },
  { name: "Minesweeper", file: "minesweeper-contribution-graph" },
];

function AnimationCard({ animation, themeMode }) {
  const [status, setStatus] = useState("stopped");
  const active = status === "loading" || status === "playing";
  const src = `${output}${animation.file}${themeMode === "dark" ? "-dark" : ""}.svg`;
  return (
    <article className="gh-panel gh-animation-card">
      <div className="gh-section-heading">
        <h3>{animation.name}</h3>
        <button
          type="button"
          onClick={() => setStatus(active ? "stopped" : "loading")}
        >
          {active ? `Stop ${animation.name} animation` : status === "error" ? `Retry ${animation.name} animation` : `Play ${animation.name} animation`}
        </button>
      </div>
      {active && (
        <img
          className="gh-animation-image"
          src={src}
          alt={`${animation.name} animation of the GitHub contribution grid`}
          onLoad={() => setStatus("playing")}
          onError={() => setStatus("error")}
        />
      )}
      <p className="gh-hint" role="status">
        {status === "loading"
          ? "Loading animation…"
          : status === "error"
            ? "Unable to load this animation. Retry loading it."
            : status === "playing"
              ? "Playing. Stop the animation at any time."
              : "Stopped. Play to load this animation from GitHub."}
      </p>
    </article>
  );
}

export default function AnimationsView() {
  const { themeMode } = useThemeController();
  return (
    <section id="contribution-animations" className="gh-section">
      <h2>Contribution animations</h2>
      <p>
        Seven animations from my GitHub profile. Select Play to watch one,
        or visit Arcade for playable games. Nothing plays automatically.
      </p>
      <p className="gh-hint">
        These animations use the profile’s generated contribution grid, not the
        year selected in Activity.
      </p>
      {animations.map((animation) => (
        <AnimationCard
          key={`${animation.file}-${themeMode}`}
          animation={animation}
          themeMode={themeMode}
        />
      ))}
    </section>
  );
}
