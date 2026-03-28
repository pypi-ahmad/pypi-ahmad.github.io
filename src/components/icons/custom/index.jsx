import React from "react";

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  width: "1em",
  height: "1em",
  "aria-hidden": "true",
  focusable: "false",
};

export function AzureMachineLearningIcon() {
  return (
    <svg {...baseProps}>
      <circle cx="6" cy="7" r="1.5" />
      <circle cx="18" cy="7" r="1.5" />
      <circle cx="6" cy="17" r="1.5" />
      <circle cx="18" cy="17" r="1.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M7.5 7.8 10.5 10.8M16.5 7.8 13.5 10.8M7.5 16.2l3-3M16.5 16.2l-3-3" />
      <path d="M10 18h4" />
    </svg>
  );
}

export function AzureBlobStorageIcon() {
  return (
    <svg {...baseProps}>
      <rect x="4" y="14" width="16" height="5" rx="1.5" />
      <rect x="7" y="9" width="5" height="4" rx="1" />
      <rect x="13" y="5" width="4" height="4" rx="1" />
      <path d="M9.5 14v-1M15 14v-5" />
    </svg>
  );
}

export function AzureCognitiveServicesIcon() {
  return (
    <svg {...baseProps}>
      <path d="M9 6.5A4.5 4.5 0 0 0 9 17.5h1.2M15 6.5A4.5 4.5 0 0 1 15 17.5h-1.2" />
      <path d="M10.2 8.5h3.6M10.2 15.5h3.6M12 8.5v7" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="10" r="1" />
      <circle cx="15" cy="14" r="1" />
      <path d="M10 12h4M12 12l2-2M12 12l2 2" />
    </svg>
  );
}

export function AzureDocumentIntelligenceIcon() {
  return (
    <svg {...baseProps}>
      <path d="M8 4.5h6l3 3V19a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V6A1.5 1.5 0 0 1 8 4.5Z" />
      <path d="M14 4.5V8h3.5" />
      <circle cx="11" cy="12.5" r="2.2" />
      <path d="m12.7 14.2 1.8 1.8M9.4 9.8h3.2" />
    </svg>
  );
}

export function AzureKeyVaultIcon() {
  return (
    <svg {...baseProps}>
      <path d="M12 4.5 17.5 7v4.2c0 4-2.4 7.1-5.5 8.3-3.1-1.2-5.5-4.3-5.5-8.3V7L12 4.5Z" />
      <circle cx="11" cy="12" r="1.5" />
      <path d="M12.5 12h2.5m-1 0v1.5" />
    </svg>
  );
}

export function AmazonSageMakerIcon() {
  return (
    <svg {...baseProps}>
      <path d="M12 5.5a4.5 4.5 0 0 1 3.8 6.8c-.5.8-1.2 1.4-1.8 2v1.2h-4v-1.2c-.7-.6-1.3-1.2-1.8-2A4.5 4.5 0 0 1 12 5.5Z" />
      <path d="M10 18h4M10.5 20h3" />
      <circle cx="8" cy="9" r="1" />
      <circle cx="16" cy="9" r="1" />
      <path d="M9 9h2M13 9h2M12 9v2.5" />
    </svg>
  );
}

export function DeltaLakeIcon() {
  return (
    <svg {...baseProps}>
      <path d="M4 8c1.4 1.1 2.8 1.1 4.2 0S11 6.9 12.4 8s2.8 1.1 4.2 0S19.4 6.9 20.8 8" />
      <path d="M4 12c1.4 1.1 2.8 1.1 4.2 0s2.8-1.1 4.2 0 2.8 1.1 4.2 0 2.8-1.1 4.2 0" />
      <path d="M4 16c1.4 1.1 2.8 1.1 4.2 0s2.8-1.1 4.2 0 2.8 1.1 4.2 0 2.8-1.1 4.2 0" />
    </svg>
  );
}

export function RestApisIcon() {
  return (
    <svg {...baseProps}>
      <path d="m8 8-3 4 3 4M16 8l3 4-3 4M13 7l-2 10" />
      <circle cx="5" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </svg>
  );
}

export const customSkillIcons = {
  AzureMachineLearningIcon,
  AzureBlobStorageIcon,
  AzureCognitiveServicesIcon,
  AzureDocumentIntelligenceIcon,
  AzureKeyVaultIcon,
  AmazonSageMakerIcon,
  DeltaLakeIcon,
  RestApisIcon,
};
