import React from "react";
import "./ProjectLanguages.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ProjectLanguages(props) {
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
                  >
                    <span
                      className="iconify"
                      data-icon={logo.iconifyClass}
                      style={logo.color ? { color: logo.color } : {}}
                      data-inline="false"
                    ></span>
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
