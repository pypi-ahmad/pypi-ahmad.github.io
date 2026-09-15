import { useId } from "react";
import { motion } from "framer-motion";
import { revealMotion } from "../../themeMotion";
import { careerProgression, careerStages } from "../../data/experience";
import "./CareerProgression.css";

export default function CareerProgression({ theme }) {
  const titleId = useId();
  return (
    <section className="career-section" aria-labelledby={titleId} style={{ color: theme.secondaryText }}>
      <p className="career-section__label" style={{ color: theme.secondaryText }}>{careerProgression.label}</p>
      <h2 id={titleId} style={{ color: theme.text }}>{careerProgression.title}</h2>
      <p className="career-section__intro">{careerProgression.introduction}</p>
      <ol className="career-progression">
        {careerStages.map((stage, index) => (
          <motion.li {...revealMotion(index)} key={stage.title} style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
            <p>{stage.period}</p>
            <h3 style={{ color: theme.text }}>{stage.title}</h3>
            <p>{stage.description}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
