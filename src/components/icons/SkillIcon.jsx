import React from "react";
import {
  SiAmazonaws,
  SiAmazoncloudwatch,
  SiAmazons3,
  SiApachespark,
  SiAwslambda,
  SiDatabricks,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGitlab,
  SiJupyter,
  SiMicrosoftazure,
  SiMicrosoftsqlserver,
  SiMilvus,
  SiNumpy,
  SiOpenai,
  SiPaddlepaddle,
  SiPandas,
  SiPlaywright,
  SiPowerbi,
  SiPydantic,
  SiPython,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import { customSkillIcons } from "./custom";

const iconComponents = {
  "simple-icons:amazonaws": SiAmazonaws,
  "simple-icons:amazoncloudwatch": SiAmazoncloudwatch,
  "simple-icons:amazons3": SiAmazons3,
  "simple-icons:anthropic": customSkillIcons.AnthropicIcon,
  "simple-icons:apachespark": SiApachespark,
  "simple-icons:awslambda": SiAwslambda,
  "simple-icons:databricks": SiDatabricks,
  "simple-icons:docker": SiDocker,
  "simple-icons:fastapi": SiFastapi,
  "simple-icons:git": SiGit,
  "simple-icons:gitlab": SiGitlab,
  "simple-icons:googlegemini": customSkillIcons.GeminiIcon,
  "simple-icons:jupyter": SiJupyter,
  "simple-icons:langchain": customSkillIcons.LangChainIcon,
  "simple-icons:langgraph": customSkillIcons.LangGraphIcon,
  "simple-icons:microsoftazure": SiMicrosoftazure,
  "simple-icons:microsoftsqlserver": SiMicrosoftsqlserver,
  "simple-icons:milvus": SiMilvus,
  "simple-icons:modelcontextprotocol": customSkillIcons.ModelContextProtocolIcon,
  "simple-icons:numpy": SiNumpy,
  "simple-icons:openai": SiOpenai,
  "simple-icons:paddlepaddle": SiPaddlepaddle,
  "simple-icons:pandas": SiPandas,
  "simple-icons:playwright": SiPlaywright,
  "simple-icons:powerbi": SiPowerbi,
  "simple-icons:pydantic": SiPydantic,
  "simple-icons:python": SiPython,
  "simple-icons:scikitlearn": SiScikitlearn,
  "simple-icons:tensorflow": SiTensorflow,
};

function resolveIcon(skill) {
  const customKey = skill.customIcon;
  if (customKey && customSkillIcons[customKey]) {
    return customSkillIcons[customKey];
  }

  return iconComponents[skill.fontAwesomeClassname] || customSkillIcons.RestApisIcon;
}

function SkillIcon({ skill, className = "" }) {
  const IconComponent = resolveIcon(skill);

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
      <IconComponent />
    </span>
  );
}

export default SkillIcon;
