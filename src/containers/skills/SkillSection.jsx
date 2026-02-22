import React from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { skills } from "../../portfolio";
import { motion } from "framer-motion";
import DataScienceImg from "./DataScienceImg";
import FullStackImg from "./FullStackImg";
import CloudInfraImg from "./CloudInfraImg";
// import DesignImg from "./DesignImg";

function GetSkillSvg(props) {
  if (props.fileName === "DataScienceImg")
    return <DataScienceImg theme={props.theme} />;
  else if (props.fileName === "FullStackImg")
    return <FullStackImg theme={props.theme} />;
  else if (props.fileName === "CloudInfraImg")
    return <CloudInfraImg theme={props.theme} />;
  // return <DesignImg theme={props.theme} />;
}

function SkillSection(props) {
  const theme = props.theme;
  return (
    <div>
      {skills.data.map((skill, index) => {
        if (index % 2 === 0) {
          return (
            <div key={skill.title} className="skills-main-div">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="skills-image-div">
                  <GetSkillSvg fileName={skill.fileName} theme={theme} />
                </div>
              </motion.div>

              <div className="skills-text-div">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <h1 className="skills-heading" style={{ color: theme.accentColor }}>
                    {skill.title}
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <SoftwareSkill logos={skill.softwareSkills} />
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <div>
                    {skill.skills.map((skillSentence) => {
                      return (
                        <p
                          key={skillSentence}
                          className="subTitle skills-text"
                          style={{ color: theme.secondaryText }}
                        >
                          {skillSentence}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={skill.title} className="skills-main-div">
              <div className="skills-text-div">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                >
                  <h1 className="skills-heading" style={{ color: theme.accentColor }}>
                    {skill.title}
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                >
                  <SoftwareSkill logos={skill.softwareSkills} />
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2 }}
                  viewport={{ once: true }}
                >
                  <div>
                    {skill.skills.map((skillSentence) => {
                      return (
                        <p
                          key={skillSentence}
                          className="subTitle skills-text"
                          style={{ color: theme.secondaryText }}
                        >
                          {skillSentence}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 2 }}
                viewport={{ once: true }}
              >
                <div className="skills-image-div">
                  <GetSkillSvg fileName={skill.fileName} theme={theme} />
                </div>
              </motion.div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default SkillSection;
