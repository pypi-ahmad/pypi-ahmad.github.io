import React from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { motion } from "framer-motion";

export default function Skills(props) {
  const theme = props.theme;
  return (
    <div className="main" id="skills">
      <div className="skills-header-div">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="skills-header" style={{ color: theme.text }}>
            Here's what I do
          </h1>
        </motion.div>
      </div>
      <SkillSection theme={theme} />
    </div>
  );
}
