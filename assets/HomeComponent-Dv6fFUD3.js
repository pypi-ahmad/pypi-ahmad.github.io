const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GitHubPreview-Mm-vuosF.js","assets/github-BBqlgPmo.js","assets/index-D8vNP8HU.js","assets/index-BA77KerG.css","assets/github-BCukmDVp.css"])))=>i.map(i=>d[i]);
import{c as e,i as t,n,o as r,r as i,s as a,t as o,u as s}from"./Footer-CIP7EJFo.js";import{n as c,r as l,t as u}from"./homePage-B8lNLcuv.js";import{t as d}from"./socialMedia-HEoc1It-.js";import{n as f,t as p}from"./ProjectDiagrams-BLkoLFaU.js";import{C as m,S as h,a as g,g as _,o as v,x as y}from"./index-D8vNP8HU.js";import{t as b}from"./CareerProgression-DKa6Eepf.js";import{t as x}from"./ProjectCard-9frHg4p_.js";var S=v();function C({theme:e}){var o;return(0,S.jsx)(`section`,{id:`greeting`,className:`greet-main`,"aria-labelledby":`home-title`,style:{background:n(e.heroGradient,e.heroPattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.heroRadius,boxShadow:i(`0 2px 8px ${e.shadowColor}`,e.panelGlow)},children:(0,S.jsxs)(`div`,{className:`hero-copy`,children:[(0,S.jsx)(`div`,{className:`hero-atmosphere`,"aria-hidden":`true`}),(0,S.jsx)(s.p,{...t(0,!0),className:`hero-eyebrow`,style:{color:e.secondaryText},children:l.hero.eyebrow}),(0,S.jsx)(`h1`,{id:`home-title`,className:`greeting-text`,style:{color:e.text,fontFamily:e.accentFontFamily,letterSpacing:e.accentLetterSpacing,transition:a},children:l.hero.title}),(0,S.jsx)(s.p,{...t(1,!0),className:`greeting-text-p`,style:{color:e.secondaryText,transition:a},children:l.hero.introduction}),(0,S.jsxs)(s.div,{...t(2,!0),className:`hero-actions`,children:[(0,S.jsx)(_,{className:`button`,to:`/contact`,style:{background:e.accentGradient,color:e.accentText,borderColor:e.borderColor,borderRadius:e.controlRadius,transition:r},children:`Contact me`}),(0,S.jsx)(`a`,{className:`button button-secondary`,href:`#professional-work`,style:{color:e.text,borderColor:e.borderSoft,borderRadius:e.controlRadius,transition:r},children:`View professional work`}),((o=d.github)==null?void 0:o.trim())&&(0,S.jsx)(`a`,{className:`button button-secondary`,href:d.github.trim(),style:{color:e.text,borderColor:e.borderSoft,borderRadius:e.controlRadius},children:`View GitHub profile`})]})]})})}var w=g.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding-block-start: var(--section-spacing);
  text-align: start;
`,T=g(s.h2)`
  color: ${e=>e.theme.text};
  font-size: var(--section-title-size);
  margin: 0 0 var(--stack-lg);
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: var(--section-title-size);
  }
`,E=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
  gap: var(--section-gap-tight);

  > :first-child { grid-column: 1 / -1; }

`,D=g(_)`
  display: inline-flex;
  margin-top: 2rem;
  padding: 0.9rem 1.5rem;
  border-radius: ${e=>e.theme.controlRadius};
  background: ${e=>e.theme.accentGradient};
  color: ${e=>e.theme.accentText};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${e=>e.theme.accentText};
    transform: translateY(-2px);
  }
`;function O({theme:e}){return(0,S.jsxs)(w,{id:`selected-work`,"aria-labelledby":`selected-work-title`,children:[(0,S.jsx)(T,{id:`selected-work-title`,theme:e,...t(),children:`Personal projects & experiments`}),(0,S.jsx)(E,{children:f.filter(e=>!e.homeFeature&&!e.projectsPageOnly).map((e,t)=>(0,S.jsx)(x,{repo:e,caseStudy:!0,revealIndex:t},e.id))}),(0,S.jsx)(D,{className:`motion-action`,theme:e,to:`/projects`,children:`View projects`})]})}var k=m(h(),1);function A({project:e,label:t,code:n}){let[r,i]=(0,k.useState)(``);async function a(){try{await navigator.clipboard.writeText(n),i(`Copied.`)}catch{i(`Copy unavailable. Select and copy the command below.`)}}return(0,S.jsxs)(`div`,{className:`featured-tool__command`,children:[(0,S.jsxs)(`div`,{className:`featured-tool__command-heading`,children:[(0,S.jsx)(`span`,{children:t}),(0,S.jsx)(`button`,{type:`button`,onClick:a,"aria-label":`Copy ${e}: ${t}`,children:`Copy`})]}),(0,S.jsx)(`pre`,{children:(0,S.jsx)(`code`,{children:n})}),(0,S.jsx)(`p`,{className:`featured-tool__copy-status`,role:`status`,children:r})]})}function j(){return(0,S.jsxs)(`section`,{id:`featured-tools`,className:`featured-tools`,"aria-labelledby":`featured-tools-title`,children:[(0,S.jsxs)(`header`,{className:`featured-tools__heading`,children:[(0,S.jsx)(`p`,{children:`Open-source software`}),(0,S.jsx)(`h2`,{id:`featured-tools-title`,children:`Featured document tools`}),(0,S.jsx)(`p`,{children:`Two applications you can install with uv and use on your own documents.`})]}),f.filter(e=>e.homeFeature).map((e,n)=>{let r=e.homeFeature;return(0,k.createElement)(s.article,{...t(n),className:`featured-tool`,key:e.id,"aria-labelledby":`home-${e.id}`},(0,S.jsxs)(`div`,{className:`featured-tool__body`,children:[(0,S.jsxs)(`div`,{className:`featured-tool__overview`,children:[(0,S.jsx)(`p`,{className:`featured-tool__category`,children:e.category}),(0,S.jsx)(`h3`,{id:`home-${e.id}`,children:e.name}),(0,S.jsx)(`p`,{className:`featured-tool__tagline`,children:r.tagline}),(0,S.jsx)(`p`,{children:r.introduction}),(0,S.jsx)(`h4`,{children:`Use it on your documents`}),(0,S.jsx)(`p`,{children:r.usage}),(0,S.jsxs)(`div`,{className:`featured-tool__links`,children:[(0,S.jsxs)(`a`,{href:r.readmeUrl,target:`_blank`,rel:`noopener noreferrer`,children:[`Read `,e.name,` README`]}),(0,S.jsxs)(`a`,{href:e.repositories[0].url,target:`_blank`,rel:`noopener noreferrer`,children:[`View `,e.name,` on GitHub`]}),(0,S.jsx)(_,{to:`/projects#${e.id}`,"aria-label":`Read ${e.name} case study`,children:`Read case study`})]})]}),(0,S.jsxs)(`section`,{className:`featured-tool__setup`,"aria-label":`${e.name} installation and usage`,children:[(0,S.jsxs)(`div`,{className:`featured-tool__setup-heading`,children:[(0,S.jsx)(`h4`,{children:`Install and try`}),(0,S.jsx)(`span`,{children:r.version})]}),(0,S.jsxs)(`p`,{children:[r.requirements,` `,(0,S.jsx)(`a`,{href:`https://docs.astral.sh/uv/getting-started/installation/`,target:`_blank`,rel:`noopener noreferrer`,children:`Install uv`}),`.`]}),r.installationNote?(0,S.jsx)(`p`,{children:r.installationNote}):null,r.commands.map(t=>(0,S.jsx)(A,{project:e.name,...t},t.label))]})]}),(0,S.jsxs)(`div`,{className:`featured-tool__diagram`,children:[(0,S.jsx)(p,{project:e}),r.diagramCollectionLabel?(0,S.jsx)(_,{to:`/projects#${e.id}`,children:r.diagramCollectionLabel}):null]}))})]})}var M=g.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding-block-start: var(--section-spacing);
`,N=g(s.div)`
  max-width: 820px;
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1rem;
    font-size: var(--section-title-size);
  }

  p {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    line-height: 1.7;
  }
`,P=g.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,F=g(s.article)`
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`,I=g(s.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
  padding: clamp(1.4rem, 4vw, 2.2rem);

  h2 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.5rem, 3vw, 2rem);
  }

  p {
    max-width: 680px;
    margin: 0;
    line-height: 1.6;
  }

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`,L=g(_)`
  flex: 0 1 auto;
  padding: 0.8rem 1.25rem;
  border-radius: ${e=>e.theme.controlRadius};
  background: ${e=>e.theme.accentGradient};
  color: ${e=>e.theme.accentText};
  font-weight: 700;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid var(--accent-solid);
    outline-offset: 3px;
  }
`;function R({theme:e}){return(0,S.jsxs)(M,{"aria-labelledby":`method-title`,children:[(0,S.jsxs)(N,{...t(),children:[(0,S.jsx)(`h2`,{id:`method-title`,style:{color:e.text},children:`How I work`}),(0,S.jsx)(`p`,{style:{color:e.secondaryText},children:l.method})]}),(0,S.jsx)(P,{children:l.workAreas.map((r,a)=>(0,k.createElement)(F,{...t(a),key:r.title,style:{background:n(e.cardBackgroundAlt,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius,boxShadow:i(`0 2px 8px ${e.shadowColor}`,e.panelGlow)}},(0,S.jsx)(`h3`,{style:{color:e.text},children:r.title}),(0,S.jsx)(`p`,{style:{color:e.secondaryText},children:r.description})))}),(0,S.jsxs)(I,{...t(),style:{background:n(e.accentSoft,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius},children:[(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`h2`,{style:{color:e.text},children:l.closing.title}),(0,S.jsx)(`p`,{style:{color:e.secondaryText},children:l.closing.description})]}),(0,S.jsx)(L,{className:`motion-action`,theme:e,to:`/contact`,children:`Contact me`})]})]})}var z=(0,k.lazy)(()=>y(()=>import(`./GitHubPreview-Mm-vuosF.js`),__vite__mapDeps([0,1,2,3,4])));function B(){let e=(0,k.useRef)(null),[t,n]=(0,k.useState)(!1);return(0,k.useEffect)(()=>{if(!(`IntersectionObserver`in window)){n(!0);return}let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(n(!0),t.disconnect())},{rootMargin:`300px`});return t.observe(e.current),()=>t.disconnect()},[]),(0,S.jsx)(`div`,{id:`github-overview`,ref:e,style:{minHeight:`12rem`},children:t&&(0,S.jsx)(k.Suspense,{fallback:(0,S.jsx)(`p`,{role:`status`,children:`Loading GitHub overview…`}),children:(0,S.jsx)(z,{})})})}var V=[{id:`prior-authorization`,title:`Prior-authorization document processing`,subtitle:`Document classification, grouped extraction, and validation for healthcare operations.`,systemLabel:`Azure Databricks orchestration`,paths:[{label:`Eligible-document path`,steps:[`Fax documents`,`Type and urgency classification`,`Eligible authorization documents`,`Azure Content Understanding Markdown`,`Grouped Azure OpenAI extraction`,`Validation and business rules`,`Structured output or review outcome`]}],notes:[`Extraction covers 117 fields across seven related groups. Confidence-aware four-pass extraction and retries support extraction and validation; individual passes are not shown.`,`Other document categories follow separate routing.`,`System outputs include RPA-ready CSV/JSON and annotated PDFs; their individual generation paths are not shown.`]},{id:`computer-use`,title:`Computer-use and multi-agent reasoning`,subtitle:`Retrieved knowledge and browser observations supply context for agent reasoning.`,paths:[{label:`Retrieved knowledge`,steps:[`Milvus retrieval`,`Reranking`,`Retrieved context`]},{label:`Browser observations`,steps:[`Playwright MCP`,`Accessibility-tree snapshots and compressed-vision context`]}],convergence:`Agent reasoning`,notes:[`Both context paths feed agent reasoning. The workflow also uses failure-aware routing, whose control flow is not shown here.`]},{id:`warranty-processing`,title:`Warranty classification and NLP processing`,subtitle:`Separate standard claim scoring from NLP processing and offloaded data work.`,systemLabel:`Incoming claims → routing`,paths:[{label:`Structured claims`,steps:[`Random Forest classifier`,`Classification result`]},{label:`Complex / free-text claims`,steps:[`FastAPI NLP service`],branches:[{label:`NLP call from FastAPI`,steps:[`Azure CLU`]},{label:`Separate processing offload from FastAPI`,steps:[`Azure Blob Storage`,`Azure Functions`,`Validation, transformation, and persistence`]}]}],notes:[`Azure CLU calls remain in FastAPI; only the offloaded processing moves through Blob Storage to Functions.`,`Analytics and drift dashboards monitor the system. Intake acknowledgement is not processing completion.`]}];function H({steps:e,label:t}){return(0,S.jsx)(`ol`,{className:`architecture-steps`,"aria-label":t,children:e.map((e,t)=>(0,S.jsxs)(`li`,{children:[t>0?(0,S.jsx)(`svg`,{className:`architecture-arrow`,"aria-hidden":`true`,width:`16`,height:`20`,viewBox:`0 0 16 20`,children:(0,S.jsx)(`path`,{d:`M8 2v15m-5-5 5 5 5-5`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}):null,(0,S.jsx)(`span`,{className:`architecture-node`,children:e})]},e))})}function U({theme:e}){return(0,S.jsxs)(`section`,{id:`architecture`,className:`architecture-section`,"aria-labelledby":`architecture-title`,style:{color:e.secondaryText},children:[(0,S.jsx)(`p`,{className:`architecture-eyebrow`,style:{color:e.secondaryText},children:`Architecture`}),(0,S.jsx)(`h2`,{id:`architecture-title`,style:{color:e.text},children:`How the systems are put together`}),(0,S.jsx)(`p`,{className:`architecture-intro`,children:`Three professional systems, with detailed decisions and results on the Experience page.`}),(0,S.jsx)(`div`,{className:`architecture-grid`,children:V.map((n,r)=>(0,k.createElement)(s.article,{...t(r),key:n.id,className:`architecture-card`,"aria-labelledby":`architecture-${n.id}`,style:{background:e.cardBackgroundAlt,borderColor:e.borderSoft}},(0,S.jsx)(`h3`,{id:`architecture-${n.id}`,style:{color:e.text},children:n.title}),(0,S.jsx)(`p`,{children:n.subtitle}),n.systemLabel?(0,S.jsx)(`p`,{className:`architecture-system`,style:{color:e.text},children:n.systemLabel}):null,(0,S.jsx)(`div`,{className:`architecture-paths`,children:n.paths.map(t=>{var r;return(0,S.jsxs)(`div`,{className:`architecture-path`,children:[(0,S.jsx)(`h4`,{style:{color:e.text},children:t.label}),(0,S.jsx)(H,{steps:t.steps,label:`${n.title}: ${t.label}`}),(r=t.branches)==null?void 0:r.map(t=>(0,S.jsxs)(`div`,{className:`architecture-branch`,children:[(0,S.jsx)(`h5`,{style:{color:e.text},children:t.label}),(0,S.jsx)(H,{steps:t.steps,label:t.label})]},t.label))]},t.label)})}),n.convergence?(0,S.jsxs)(`p`,{className:`architecture-convergence`,style:{color:e.text},children:[`Both context paths feed: `,(0,S.jsx)(`strong`,{children:n.convergence})]}):null,(0,S.jsx)(`ul`,{className:`architecture-notes`,children:n.notes.map(e=>(0,S.jsx)(`li`,{children:e},e))}),(0,S.jsx)(_,{className:`architecture-link`,to:`/experience#${n.id}`,"aria-label":`Read ${n.title} engineering story`,children:`Read project story`})))}),(0,S.jsx)(`p`,{className:`architecture-scope`,children:`Simplified architecture views; internal infrastructure and client-specific rules are omitted.`})]})}function W({theme:e}){return(0,S.jsxs)(`section`,{className:`metrics-section`,"aria-label":`Professional results`,style:{color:e.secondaryText},children:[(0,S.jsx)(`ul`,{className:`metrics-strip`,style:{background:e.evidenceSurface,borderColor:e.evidenceBorder},children:c.map(t=>(0,S.jsx)(`li`,{children:(0,S.jsxs)(_,{to:t.href,"aria-label":`${t.label}: ${t.value}. Read the project story.`,children:[(0,S.jsx)(`strong`,{style:{color:e.evidenceText},children:t.value}),(0,S.jsx)(`span`,{className:`metric-label`,style:{color:e.accentSolid},children:t.label}),(0,S.jsx)(`span`,{className:`metric-context`,style:{color:e.secondaryText},children:t.context})]})},t.label))}),(0,S.jsx)(`p`,{className:`metrics-disclosure`,children:`Reported team and system results from internal employer evaluations. Project stories explain the scope and my contributions.`})]})}function G({theme:e}){return(0,S.jsxs)(`section`,{id:`professional-work`,className:`professional-section`,"aria-labelledby":`professional-work-title`,style:{color:e.secondaryText},children:[(0,S.jsx)(`p`,{className:`professional-eyebrow`,style:{color:e.secondaryText},children:`Selected professional work`}),(0,S.jsx)(`h2`,{id:`professional-work-title`,style:{color:e.text},children:`Featured professional projects`}),(0,S.jsx)(`p`,{children:`Three projects spanning production machine learning, document AI, and agentic workflows.`}),(0,S.jsx)(_,{className:`professional-link`,to:`/experience`,children:`View all professional work`}),(0,S.jsx)(`div`,{className:`professional-grid`,children:u.map((n,r)=>(0,k.createElement)(s.article,{...t(r),key:n.id,"aria-labelledby":`professional-${n.id}`,style:{background:e.cardBackgroundAlt,borderColor:e.borderSoft}},(0,S.jsx)(`p`,{className:`professional-company`,children:n.company}),(0,S.jsx)(`h3`,{id:`professional-${n.id}`,style:{color:e.text},children:n.title}),(0,S.jsx)(`p`,{children:n.summary}),(0,S.jsx)(`h4`,{style:{color:e.text},children:`My contribution`}),(0,S.jsx)(`p`,{children:n.contribution}),(0,S.jsx)(_,{className:`professional-link`,to:`/experience#${n.id}`,"aria-label":`Read ${n.title} professional story`,children:`Read project story`})))})]})}function K(t){return(0,S.jsxs)(`div`,{children:[(0,S.jsx)(e,{}),(0,S.jsxs)(`main`,{id:`main-content`,children:[(0,S.jsx)(C,{theme:t.theme}),(0,S.jsx)(G,{theme:t.theme}),(0,S.jsx)(j,{}),(0,S.jsx)(O,{theme:t.theme}),(0,S.jsx)(W,{theme:t.theme}),(0,S.jsx)(U,{theme:t.theme}),(0,S.jsx)(b,{theme:t.theme}),(0,S.jsx)(B,{}),(0,S.jsx)(R,{theme:t.theme})]}),(0,S.jsx)(o,{theme:t.theme})]})}export{K as default};