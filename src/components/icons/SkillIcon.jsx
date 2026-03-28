import React from "react";
import { customSkillIcons } from "./custom";

function SkillIcon({ skill, className = "" }) {
  const CustomIcon = skill.customIcon ? customSkillIcons[skill.customIcon] : null;

  if (CustomIcon) {
    return (
      <span
        className={className}
        style={{
          ...skill.style,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        <CustomIcon />
      </span>
    );
  }

  return (
    <span
      className={className}
      data-icon={skill.fontAwesomeClassname}
      style={skill.style}
      data-inline="false"
      aria-hidden="true"
    ></span>
  );
}

export default SkillIcon;
