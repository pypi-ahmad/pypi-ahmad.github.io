import React from "react";
import { DiMsqlServer } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import {
  SiApachespark,
  SiDatabricks,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGitlab,
  SiJupyter,
  SiMilvus,
  SiNumpy,
  SiPaddlepaddle,
  SiPandas,
  SiPydantic,
  SiPython,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import {
  TbBrandAzure,
  TbBrandOpenai,
  TbBrowser,
  TbChartHistogram,
  TbCloud,
  TbLambda,
} from "react-icons/tb";
import { customSkillIcons } from "./custom";

const iconComponents = {
  "simple-icons:amazonaws": FaAws,
  "simple-icons:amazoncloudwatch": TbCloud,
  "simple-icons:amazons3": FaAws,
  "simple-icons:anthropic": customSkillIcons.AnthropicIcon,
  "simple-icons:apachespark": SiApachespark,
  "simple-icons:awslambda": TbLambda,
  "simple-icons:databricks": SiDatabricks,
  "simple-icons:docker": SiDocker,
  "simple-icons:fastapi": SiFastapi,
  "simple-icons:git": SiGit,
  "simple-icons:gitlab": SiGitlab,
  "simple-icons:googlegemini": customSkillIcons.GeminiIcon,
  "simple-icons:jupyter": SiJupyter,
  "simple-icons:langchain": customSkillIcons.LangChainIcon,
  "simple-icons:langgraph": customSkillIcons.LangGraphIcon,
  "simple-icons:microsoftazure": TbBrandAzure,
  "simple-icons:microsoftsqlserver": DiMsqlServer,
  "simple-icons:milvus": SiMilvus,
  "simple-icons:modelcontextprotocol": customSkillIcons.ModelContextProtocolIcon,
  "simple-icons:numpy": SiNumpy,
  "simple-icons:openai": TbBrandOpenai,
  "simple-icons:paddlepaddle": SiPaddlepaddle,
  "simple-icons:pandas": SiPandas,
  "simple-icons:playwright": TbBrowser,
  "simple-icons:powerbi": TbChartHistogram,
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
