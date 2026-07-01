/**
 * ProjectLanguages — Language/tech icons with tooltips.
 *
 * Similar to SoftwareSkill but uses `iconifyClass` and `name` keys
 * (project-specific data shape).
 *
 * Props: { logos: Array<{ name, iconifyClass, color?, link }> }
 */
import React from "react";
import "./ProjectLanguages.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { buildThemeBackground, buildThemeShadow } from "../../themeMotion";
import SkillIcon from "../icons/SkillIcon";

function ProjectLanguages(props) {
  const { theme } = props;

  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons-languages">
          {props.logos.map((logo) => {
            return (
              <OverlayTrigger
                key={logo.name}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <strong>{logo.name}</strong>
                  </Tooltip>
                }
              >
                <li
                  className="software-skill-inline-languages"
                  name={logo.skillName}
                >
                  <a
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={
                      theme
                        ? {
                            color: theme.text,
                            background: buildThemeBackground(theme.bodyAlt, theme.surfacePattern),
                            border: `${theme.panelBorderWidth} ${theme.panelBorderStyle} ${theme.borderSoft}`,
                            borderRadius: theme.controlRadius,
                            boxShadow: buildThemeShadow(`0 12px 22px ${theme.shadowColor}`, theme.buttonGlow),
                          }
                        : undefined
                    }
                  >
                    <SkillIcon
                      skill={{
                        fontAwesomeClassname: logo.iconifyClass,
                        style: logo.color ? { color: logo.color } : undefined,
                      }}
                      className="project-language-icon"
                    />
                  </a>
                </li>
              </OverlayTrigger>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProjectLanguages;
