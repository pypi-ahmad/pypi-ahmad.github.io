import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { skillsPageData } from "../../portfolio";
import "./SkillsPage.css";

const SkillSection = ({ section, theme }) => {
  return (
    <div 
        className="skill-section" 
        style={{ 
            backgroundColor: theme.imageDark, 
            boxShadow: `0 5px 15px ${theme.imageDark === "#333" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
        }}
    >
      <h3 className="skill-section-title" style={{ color: theme.text }}>{section.title}</h3>
      <div className="skills-list">
        {section.skills.map((skill, index) => (
           <div 
                key={index} 
                className="skill-tag" 
                style={{ 
                    border: `1px solid ${theme.text}`, 
                    color: theme.secondaryText 
                }}
            >
             {skill}
           </div>
        ))}
      </div>
    </div>
  );
};

function SkillsPage(props) {
  const theme = props.theme;
  return (
    <div className="skills-main">
      <Header theme={theme} setTheme={props.setTheme} />
      <div className="basic-skills">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="skills-heading-div">
            <div className="skills-heading-text-div">
              <h1 className="skills-heading-text" style={{ color: theme.text }}>
                {skillsPageData.title}
              </h1>
              <p
                className="skills-header-detail-text subTitle"
                style={{ color: theme.secondaryText }}
              >
                {skillsPageData.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="skills-card-div">
            {skillsPageData.skills.map((section, index) => (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  key={index}
                >
                    <SkillSection section={section} theme={theme} />
                </motion.div>
            ))}
        </div>
      </div>
      <Footer theme={props.theme} />
    </div>
  );
}

export default SkillsPage;
