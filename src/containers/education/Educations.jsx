import React from "react";
import "./Educations.css";
import DegreeCard from "../../components/degreeCard/DegreeCard";
import { degrees } from "../../portfolio";
import { motion } from "framer-motion";

function Educations(props) {
  const theme = props.theme;

  return (
    <div className="main" id="educations">
      <div className="educations-header-div">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="educations-header" style={{ color: theme.text }}>
            Degrees Received
          </h1>
        </motion.div>
      </div>
      <div className="educations-body-div">
        {degrees.degrees.map((degree) => {
          return (
            <DegreeCard key={degree.title} degree={degree} theme={theme} />
          );
        })}
      </div>
    </div>
  );
}

export default Educations;
