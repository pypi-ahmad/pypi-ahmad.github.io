/**
 * Educations — "Degrees Received" section.
 *
 * Maps `degrees.degrees` to DegreeCard components.
 * Used inside the Education page.
 *
 * Props: { theme }
 */
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard";
import { degrees } from "../../portfolio";

function Educations(props) {
  const theme = props.theme;

  return (
    <section className="education-section" id="educations" aria-labelledby="degrees-title">
      <motion.div {...revealMotion()} className="education-section-heading">
        <p className="education-section-label" style={{ color: theme.accentSolid }}>
          Academic foundation
        </p>
        <h2 id="degrees-title" className="educations-header" style={{ color: theme.text }}>
          Degrees
        </h2>
        <p style={{ color: theme.secondaryText }}>
          Computer science engineering followed by postgraduate study in data
          analytics and decision sciences.
        </p>
      </motion.div>
      <motion.div {...revealMotion()} className="educations-body-div">
        {degrees.degrees.map((degree) => {
          return (
            <DegreeCard key={degree.title} degree={degree} theme={theme} />
          );
        })}
      </motion.div>
    </section>
  );
}

export default Educations;
