/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to true if you want to use the splash screen.
  useCustomCursor: true, // Change this to false if you want the good'ol cursor
  // GA4 Measurement ID format: G-XXXXXXXXXX
  googleTrackingID: "",
};

//Home Page
const greeting = {
  title: "Hello.",
  title2: "Ahmad",
  logo_name: "ahmad.m()",
  nickname: "ahmad / dataintuitionist",
  full_name: "Ahmad Mujtaba",
  subTitle:
    "GenAI Engineer | Data Scientist. Delivering enterprise-grade AI solutions.",
  resumeLink:
    "Resume.pdf",
  coverLetterLink:
    "Cover.pdf",
  mail: "mailto:ahmad.iiitk@gmail.com",
};

const socialMediaLinks = {
  /* Your Social Media Link */
  github: "https://github.com/pypi-ahmad",
  githubDesc: "Check out my latest code and open-source projects.",
  linkedin: "https://www.linkedin.com/in/ahmad-mle/",
  linkedinDesc: "Connect for professional updates and networking.",
  gmail: "ahmad.iiitk@gmail.com",
  gmailDesc: "Feel free to drop me an email anytime.",
  gitlab: " ",
  facebook: " ",
  twitter: " ",
  instagram: " ",
  telegram: "https://t.me/dataintuitionist",
  telegramDesc: "Message me directly for quick chats.",
  discord: "https://discord.com/users/dataintuitionist",
  discordDesc: "Join the conversation on tech and dev topics.",
};

const skills = {
  data: [
    {
      title: "Generative AI & LLMs",
      fileName: "FullStackImg",
      skills: [
        "⚡ Architecting Reason-Driven IDP pipelines with Gemini & GPT models",
        "⚡ Building Autonomous Computer Using Agents with RAG orchestration",
        "⚡ Developing Enterprise Chatbots using AWS Lex and Azure OpenAI",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: {
            color: "#3776AB",
          },
        },
        {
          skillName: "TensorFlow",
          fontAwesomeClassname: "simple-icons:tensorflow",
          style: {
            color: "#FF6F00",
          },
        },
        {
          skillName: "PySpark",
          fontAwesomeClassname: "simple-icons:apachespark",
          style: {
            color: "#E25A1C",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#2496ED",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: {
            color: "#0078D4",
          },
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "simple-icons:git",
          style: {
            color: "#F05032",
          },
        },
      ],
    },
    {
      title: "Data Science & Analytics",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Predictive Modeling for Warranty Analytics and Classification",
        "⚡ Computer Vision systems (PaddleOCR, CNNs) for Document Understanding",
        "⚡ Advanced ETL pipelines on Databricks (Medallion Architecture)",
      ],
      softwareSkills: [
        {
          skillName: "Scikit-Learn",
          fontAwesomeClassname: "simple-icons:scikitlearn",
          style: {
            color: "#F7931E",
          },
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "simple-icons:pandas",
          style: {
            color: "#150458",
          },
        },
        {
          skillName: "Databricks",
          fontAwesomeClassname: "simple-icons:databricks",
          style: {
            color: "#FF3621",
          },
        },
      ],
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "Indian Institute of Information Technology (IIIT) Kurnool",
      subtitle: "M.Tech in Data Analytics and Decision Sciences",
      logo_path: "iiitk_logo.svg",
      alt_name: "IIIT Kurnool",
      duration: "Oct 2020 - Jun 2022",
      descriptions: [
        "⚡ Relevant Coursework: Machine Learning, Deep Learning, NLP, Computer Vision, Statistics, Probability & Discrete Math.",
      ],
      website_link: "http://iiitk.ac.in/",
    },
    {
      title: "Maulana Azad National Urdu University",
      subtitle: "B.Tech in Computer Science Engineering",
      logo_path: "manuu_logo.svg",
      alt_name: "MANUU",
      duration: "Aug 2015 - Jun 2019",
      descriptions: [
        "⚡ Relevant Coursework: Data Structures & Algorithms, Engineering Mathematics, Web Development.",
      ],
      website_link: "https://manuu.edu.in/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "Machine Learning Specialization",
      subtitle: "DeepLearning.AI via Coursera",
      logo_path: "stanford_logo.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/2T5GNSDSV29S",
      alt_name: "DeepLearning.AI",
      color_code: "#8C151599",
    },
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "I have worked with major enterprises like Deloitte and Cognizant, delivering scalable AI solutions in Healthcare and Automotive domains.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "GenAI Engineer | Data Scientist",
          company: "Deloitte US-India",
          company_url: "https://www2.deloitte.com/",
          logo_path: "deloitte_logo.svg",
          duration: "July 2025 - Present",
          location: "Gurugram, India",
          descriptions: [
            "Architected High-Precision IDP Pipeline using PaddleOCR + LLM reasoning for unstructured insurance policies.",
            "Improved extraction accuracy from ~90% to 99% using Gemini-3-Pro and Canonical Comparison loops.",
            "Built autonomous Computer-Using Agent platform on AWS using Docker + headless Linux + streaming UI.",
            "Implemented Milvus-based RAG to improve agent reliability from 38% to ~80%.",
            "Optimized vision ingestion pipeline using compressed JPEG artifacts to reduce latency and token cost.",
            "Developed Playwright MCP Agent using AX Tree parsing, reducing context usage by ~40%.",
            "Built scalable ETL frameworks on Databricks (PySpark) with complex schema reconciliation.",
          ],
          color: "#000000",
        },
        {
          title: "Associate Data Scientist",
          company: "Cognizant Technology Solutions",
          company_url: "https://www.cognizant.com/",
          logo_path: "cognizant_logo.svg",
          duration: "Sep 2022 - May 2025",
          location: "Noida, India",
          descriptions: [
            "Built Random Forest models for warranty analytics on Azure Databricks.",
            "Developed enterprise chatbots using AWS Lex + Azure OpenAI.",
            "Optimized cloud applications on Azure and AWS.",
            "Designed Power BI dashboards for KPI tracking.",
            "Led cross-team deployments using GitLab and Azure pipelines.",
          ],
          color: "#0033a0",
        },
        {
          title: "Machine Learning Engineer Intern",
          company: "AiEnsured",
          company_url: "https://aiensured.com/",
          logo_path: "aiensured_logo.svg",
          duration: "Jul 2021 - Aug 2021",
          location: "Remote, India",
          descriptions: [
            "Developed object detection systems using CNNs.",
            "Improved model performance using feature engineering and classical ML.",
          ],
          color: "#4285F4",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My methodologies include Reasoning-Driven IDP, Agentic Workflows, and Enterprise RAG systems.",
  avatar_image_path: "projects_image.svg",
};

const projects = {
  data: [
    {
      name: "AI-Powered Policy Ingestion",
      url: "#",
      description:
        "High-Precision IDP Pipeline for unstructured insurance policies. Uses PaddleOCR for layout-aware extraction and Gemini-3-Pro/GPT for semantic reasoning. Achieved 99% accuracy via canonical comparison loops.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "PaddleOCR",
          iconifyClass: "simple-icons:paddlepaddle",
        },
        {
          name: "Gemini",
          iconifyClass: "simple-icons:google",
        },
      ],
    },
    {
      name: "Autonomous Business Agent",
      url: "#",
      description:
        "Computer-Using Agent (CUA) orchestration using RAG + Milvus. Improved task success from ~38% to ~80% by retrieving SOPs to ground agent reasoning. Deployed on AWS with a headless Linux Docker environment.",
      languages: [
        {
          name: "OpenAI",
          iconifyClass: "simple-icons:openai",
        },
        {
          name: "Milvus",
          iconifyClass: "simple-icons:milvus",
        },
        {
          name: "Docker",
          iconifyClass: "simple-icons:docker",
        },
      ],
    },
    {
      name: "Enterprise Data Consolidation",
      url: "#",
      description:
        "Scalable ETL Frameworks on Databricks using PySpark. Handled complex schema mapping, primary key reconciliation, and multi-table inner joins for consolidated analytics.",
      languages: [
        {
          name: "PySpark",
          iconifyClass: "simple-icons:apachespark",
        },
        {
          name: "Databricks",
          iconifyClass: "simple-icons:databricks",
        },
      ],
    },
    {
      name: "B2B Reordering Chatbot",
      url: "#",
      description:
        "Conversational AI assistant using AWS Lex and Azure OpenAI. Parses unstructured orders and automates reordering via AWS Lambda.",
      languages: [
        {
          name: "AWS Lex",
          iconifyClass: "simple-icons:amazonaws",
        },
        {
          name: "Azure OpenAI",
          iconifyClass: "simple-icons:microsoftazure",
        },
      ],
    },
    {
      name: "Warranty Claims Automation",
      url: "#",
      description:
        "Predictive modeling using Random Forest on Azure Databricks. Improved decision recall for automotive warranty claims.",
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Scikit-learn",
          iconifyClass: "simple-icons:scikitlearn",
        },
      ],
    },
  ],
};

const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "contact_image.png",
    description:
      "I am available for opportunities in GenAI and Data Science. Feel free to reach out via email or LinkedIn.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I document my learning journey and technical deep dives. Check out my latest articles.",
    link: "https://medium.com/@ahmad.iiitk", // Placeholder based on email
    avatar_image_path: "blogs_image.svg",
  },
};

const skillsPageData = {
  title: "Technical Expertise",
  subtitle:
    "Full-stack AI/ML capabilities spanning generative AI, data engineering, and cloud infrastructure",
  skills: [
    {
      title: "Generative AI & LLMs",
      skills: [
        "Agentic Workflows (CUA)",
        "MCP",
        "VLA",
        "RAG (Milvus / Vector DBs)",
        "IDP",
        "Prompt Engineering (CoT, ReAct)",
        "Azure OpenAI, Gemini",
        "LangChain, LangGraph",
        "AWS Lex, LUIS, CLU",
      ],
    },
    {
      title: "Machine Learning & Data Science",
      skills: [
        "Regression, Classification, Clustering",
        "Computer Vision (CNN, PaddleOCR, AX Trees)",
        "NLP (Transformers, LSTM, RNN)",
        "XGBoost, Random Forest",
        "Feature Engineering, EDA",
      ],
    },
    {
      title: "Data Engineering",
      skills: [
        "Azure Databricks (PySpark)",
        "ETL/ELT Pipelines",
        "Medallion Architecture",
        "Data Modeling",
        "SQL Server, S3",
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        "Azure Services",
        "AWS Services",
        "Docker",
        "CI/CD",
        "Git/GitLab",
        "Power BI",
      ],
    },
    {
      title: "Libraries & Tools",
      skills: [
        "Python, SQL",
        "Scikit-learn",
        "TensorFlow",
        "Pandas, NumPy",
        "Matplotlib, Seaborn",
        "Spark MLlib",
      ],
    },
    {
      title: "Domain & Soft Skills",
      skills: [
        "Automotive, FMCG, Manufacturing",
        "Warranty Analytics",
        "B2B Reordering",
        "Problem Solving",
        "Cross-Functional Collaboration",
        "Time Zone Management",
      ],
    },
  ],
};

export {
  settings,
  greeting,
  socialMediaLinks,
  skills,
  degrees,
  certifications,
  experience,
  projectsHeader,
  projects,
  contactPageData,
  skillsPageData,
};
