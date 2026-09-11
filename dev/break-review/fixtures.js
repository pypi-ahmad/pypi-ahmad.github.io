// Fixtures stay independent of portfolio data so stress cases never become public career claims.
const sentence = "A sample engineering workflow prepares documents, checks results, and presents evidence for review.";
const longText = `${sentence} ${sentence} ${sentence}`;
const unbroken = "DocumentProcessing".repeat(4);
const lengths = [
  ["Empty strings", ""],
  ["One word", "Review"],
  ["Typical content", "Document review workflow"],
  ["Several sentences", longText],
  ["Unbroken 72-character string", unbroken],
];

const project = {
  name: "Document review workflow",
  category: "Document AI",
  description: sentence,
  url: "https://example.com/project",
};

const certificate = {
  title: "Document review foundations",
  subtitle: "Example training provider",
  summary: sentence,
  completionDate: "September 12, 2026",
  certificateLink: "https://example.com/credential",
  pdfLink: "https://example.com/certificate.pdf",
  highlights: ["Extraction", "Validation", "Evaluation"],
};

const experience = {
  title: "Applied AI engineer",
  company: "Example organization",
  companyUrl: "https://example.com/organization",
  logoPath: "iiitk_logo.svg",
  duration: "September 2024 – September 2026",
  location: "Remote",
  descriptions: [sentence, "Reviewed model outputs.", "Documented evaluation methods."],
};

const featured = {
  ...experience,
  systemContext: [sentence],
  contributions: ["Prepared the evaluation workflow.", "Reviewed outputs and documented limitations."],
  outcomes: Array.from({ length: 5 }, (_, index) => ({
    metric: `${index + 1} runs`,
    label: `Fixture measure ${index + 1}`,
    context: "Synthetic fixture, not a portfolio claim.",
  })),
  disclosureNote: "All data on this page is synthetic. Images are existing local assets used only to exercise the component.",
};

const channels = [
  ["Email", null],
  ["LinkedIn", "linkedin"],
  ["GitHub", "github"],
  ["Portfolio", "portfolio"],
  ["X (Twitter)", "twitter"],
  ["WhatsApp", "whatsapp"],
  ["Telegram", "telegram"],
  ["Instagram", "instagram"],
  ["Facebook", "facebook"],
  ["Discord", null],
];

export const contactItems = channels.map(([label, image], index) => ({
  key: `fixture-channel-${index}`,
  label,
  href: index === 0 ? "mailto:fixture@example.com" : "https://example.com/contact",
  description: sentence,
  openInNewTab: index !== 0,
  ...(image ? { iconSrc: `/contacts-icons/${image}.png` } : {}),
  invertOnDark: image === "github" || image === "portfolio",
}));

const containerCases = props => [
  { label: "320px container", width: 320, props },
  { label: "Squeezed by a grid sibling (640px row)", squeezed: true, props },
  { label: "Very wide 1152px container", width: 1152, props },
];

export const reports = {
  project: {
    title: "ProjectCard",
    scope: "Accepts project text, URL, numbering and priority; renders a linked card used on Home, Skills and Projects.",
    omitted: "No repeated-item, loading, error or disabled props. Locale-shape cases are omitted because content is authored in code.",
    scenarios: [
      ...lengths.map(([label, text]) => ({ label, width: 320, props: { repo: { ...project, name: text, category: text, description: text } } })),
      { label: "Typical priority card with index", props: { repo: project, index: 13, priority: true } },
      { label: "No optional category or index", props: { repo: { ...project, category: "" } } },
      ...containerCases({ repo: project, index: 1 }),
    ],
  },
  certification: {
    title: "CertificationCard",
    scope: "Accepts credential text, optional badge/date/topics and links; renders a credential card used on Education.",
    omitted: "No loading, error or disabled props. Locale-shape cases are omitted because content is authored in code. Topic counts are synthetic capacity fixtures.",
    scenarios: [
      ...lengths.map(([label, text]) => ({ label, width: 320, props: { certificate: { ...certificate, title: text, subtitle: text, summary: text } } })),
      ...[0, 1, 3, 30].map(count => ({ label: `${count} course topics`, props: { certificate: { ...certificate, highlights: Array.from({ length: count }, (_, index) => `Topic ${index + 1}: document evaluation`) } } })),
      { label: "Badge and issued date", width: 320, props: { certificate: { ...certificate, badgeImagePath: "/images/certifications/claude-certified-associate-foundations.png", dateLabel: "Issued" } } },
      { label: "Optional date, summary and topics absent", props: { certificate: { title: certificate.title, subtitle: certificate.subtitle, certificateLink: certificate.certificateLink } } },
      { label: "PDF action only", props: { certificate: { ...certificate, certificateLink: "" } } },
      { label: "No available actions", props: { certificate: { ...certificate, certificateLink: "", pdfLink: "" } } },
      ...containerCases({ certificate }),
    ],
  },
  experience: {
    title: "ExperienceCard",
    scope: "Accepts employer identity, dates and descriptions or featured context/contributions/outcomes; renders a role card used on Experience.",
    omitted: "No loading, error or disabled props. Locale-shape cases are omitted because content is authored in code. Large lists are synthetic capacity fixtures.",
    scenarios: [
      ...lengths.map(([label, text]) => ({ label, width: 320, props: { experience: { ...experience, title: text, company: text, descriptions: [text] } } })),
      ...[0, 1, 3, 30].map(count => ({ label: `${count} role descriptions`, props: { experience: { ...experience, descriptions: Array.from({ length: count }, (_, index) => `Task ${index + 1}: ${sentence}`) } } })),
      ...[0, 1, 5, 50].map(count => ({ label: `Featured role with ${count} outcomes`, width: 1152, props: { experience: { ...featured, outcomes: Array.from({ length: count }, (_, index) => ({ ...featured.outcomes[index % 5], label: `Fixture measure ${index + 1}` })) } } })),
      { label: "Featured role with empty context and contribution lists", props: { experience: { ...featured, systemContext: [], contributions: [] } } },
      { label: "Featured role with 30 context and contribution items", width: 1152, props: { experience: { ...featured, systemContext: Array.from({ length: 30 }, (_, index) => `Context ${index + 1}: ${sentence}`), contributions: Array.from({ length: 30 }, (_, index) => `Contribution ${index + 1}: ${sentence}`) } } },
      ...containerCases({ experience: featured }),
    ],
  },
  contact: {
    title: "ContactLinksList",
    scope: "Accepts optional channel items with labels, descriptions, icons and destinations; renders the contact-card list used on Contact.",
    omitted: "Channel labels are fixed in the builder, so only descriptions vary. No loading, error or disabled props. Locale-shape cases are omitted. The production builder caps channels at ten, so a 100-channel fixture is excluded.",
    scenarios: [
      ...lengths.map(([label, text]) => ({ label: `${label} in a description`, width: 320, props: { items: [{ ...contactItems[0], description: text }] } })),
      ...[0, 1, 10].map(count => ({ label: `${count} channels`, props: { items: contactItems.slice(0, count) } })),
      { label: "Image and vector icons", props: { items: [contactItems[0], contactItems[2], contactItems[9]] } },
      ...containerCases({ items: contactItems }),
    ],
  },
};
