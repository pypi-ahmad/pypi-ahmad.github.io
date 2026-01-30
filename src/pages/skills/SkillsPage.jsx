import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Fade } from "react-reveal";
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
        <Fade bottom duration={2000} distance="40px">
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
        </Fade>

        <div className="skills-card-div">
            {skillsPageData.skills.map((section, index) => (
                <Fade bottom duration={2000} distance="40px" key={index}>
                    <SkillSection section={section} theme={theme} />
                </Fade>
            ))}
        </div>
      </div>
      <Footer theme={props.theme} />
    </div>
  );
}

export default SkillsPage;
