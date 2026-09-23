const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GitHubPreview-BHX9cmDi.js","assets/github-DUajUF41.js","assets/index-4MBo43iS.js","assets/index-BA77KerG.css","assets/github-BCukmDVp.css"])))=>i.map(i=>d[i]);
import{c as e,i as t,n,o as r,r as i,s as a,t as o,u as s}from"./Footer-ChckizxA.js";import{n as c,r as l,t as u}from"./homePage-B8lNLcuv.js";import{t as d}from"./socialMedia-HEoc1It-.js";import{t as f}from"./caseStudies-C0UDzCo2.js";import{C as p,S as m,a as h,g,o as _,x as v}from"./index-4MBo43iS.js";import{t as y}from"./CareerProgression-CdMEfCnh.js";import{t as b}from"./ProjectCard-Cj24Dlg8.js";var x=_();function S({theme:e}){var o;return(0,x.jsx)(`section`,{id:`greeting`,className:`greet-main`,"aria-labelledby":`home-title`,style:{background:n(e.heroGradient,e.heroPattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.heroRadius,boxShadow:i(`0 2px 8px ${e.shadowColor}`,e.panelGlow)},children:(0,x.jsxs)(`div`,{className:`hero-copy`,children:[(0,x.jsx)(`div`,{className:`hero-atmosphere`,"aria-hidden":`true`}),(0,x.jsx)(s.p,{...t(0,!0),className:`hero-eyebrow`,style:{color:e.secondaryText},children:l.hero.eyebrow}),(0,x.jsx)(`h1`,{id:`home-title`,className:`greeting-text`,style:{color:e.text,fontFamily:e.accentFontFamily,letterSpacing:e.accentLetterSpacing,transition:a},children:l.hero.title}),(0,x.jsx)(s.p,{...t(1,!0),className:`greeting-text-p`,style:{color:e.secondaryText,transition:a},children:l.hero.introduction}),(0,x.jsxs)(s.div,{...t(2,!0),className:`hero-actions`,children:[(0,x.jsx)(g,{className:`button`,to:`/contact`,style:{background:e.accentGradient,color:e.accentText,borderColor:e.borderColor,borderRadius:e.controlRadius,transition:r},children:`Contact me`}),(0,x.jsx)(`a`,{className:`button button-secondary`,href:`#professional-work`,style:{color:e.text,borderColor:e.borderSoft,borderRadius:e.controlRadius,transition:r},children:`View professional work`}),((o=d.github)==null?void 0:o.trim())&&(0,x.jsx)(`a`,{className:`button button-secondary`,href:d.github.trim(),style:{color:e.text,borderColor:e.borderSoft,borderRadius:e.controlRadius},children:`View GitHub profile`})]})]})})}var C=h.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding-block-start: var(--section-spacing);
  text-align: start;
`,w=h(s.h2)`
  color: ${e=>e.theme.text};
  font-size: var(--section-title-size);
  margin: 0 0 var(--stack-lg);
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: var(--section-title-size);
  }
`,T=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr));
  gap: var(--section-gap-tight);

  > :first-child { grid-column: 1 / -1; }

`,E=h(g)`
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
`;function D({theme:e}){return(0,x.jsxs)(C,{id:`selected-work`,"aria-labelledby":`selected-work-title`,children:[(0,x.jsx)(w,{id:`selected-work-title`,theme:e,...t(),children:`Personal projects & experiments`}),(0,x.jsx)(T,{children:f.filter(e=>!e.homeFeature).map((e,t)=>(0,x.jsx)(b,{repo:e,caseStudy:!0,revealIndex:t},e.id))}),(0,x.jsx)(E,{className:`motion-action`,theme:e,to:`/projects`,children:`View projects`})]})}var O=p(m(),1);function k({project:e,label:t,code:n}){let[r,i]=(0,O.useState)(``);async function a(){try{await navigator.clipboard.writeText(n),i(`Copied.`)}catch{i(`Copy unavailable. Select and copy the command below.`)}}return(0,x.jsxs)(`div`,{className:`featured-tool__command`,children:[(0,x.jsxs)(`div`,{className:`featured-tool__command-heading`,children:[(0,x.jsx)(`span`,{children:t}),(0,x.jsx)(`button`,{type:`button`,onClick:a,"aria-label":`Copy ${e}: ${t}`,children:`Copy`})]}),(0,x.jsx)(`pre`,{children:(0,x.jsx)(`code`,{children:n})}),(0,x.jsx)(`p`,{className:`featured-tool__copy-status`,role:`status`,children:r})]})}function A(){return(0,x.jsxs)(`section`,{id:`featured-tools`,className:`featured-tools`,"aria-labelledby":`featured-tools-title`,children:[(0,x.jsxs)(`header`,{className:`featured-tools__heading`,children:[(0,x.jsx)(`p`,{children:`Open-source software`}),(0,x.jsx)(`h2`,{id:`featured-tools-title`,children:`Featured document tools`}),(0,x.jsx)(`p`,{children:`Two applications you can install with uv and use on your own documents.`})]}),f.filter(e=>e.homeFeature).map((e,n)=>{let r=e.homeFeature,i=e.diagrams[0];return(0,O.createElement)(s.article,{...t(n),className:`featured-tool`,key:e.id,"aria-labelledby":`home-${e.id}`},(0,x.jsxs)(`div`,{className:`featured-tool__body`,children:[(0,x.jsxs)(`div`,{className:`featured-tool__overview`,children:[(0,x.jsx)(`p`,{className:`featured-tool__category`,children:e.category}),(0,x.jsx)(`h3`,{id:`home-${e.id}`,children:e.name}),(0,x.jsx)(`p`,{className:`featured-tool__tagline`,children:r.tagline}),(0,x.jsx)(`p`,{children:r.introduction}),(0,x.jsx)(`h4`,{children:`Use it on your documents`}),(0,x.jsx)(`p`,{children:r.usage}),(0,x.jsxs)(`div`,{className:`featured-tool__links`,children:[(0,x.jsxs)(`a`,{href:r.readmeUrl,target:`_blank`,rel:`noopener noreferrer`,children:[`Read `,e.name,` README`]}),(0,x.jsxs)(`a`,{href:e.repositories[0].url,target:`_blank`,rel:`noopener noreferrer`,children:[`View `,e.name,` on GitHub`]}),(0,x.jsx)(g,{to:`/projects#${e.id}`,"aria-label":`Read ${e.name} case study`,children:`Read case study`})]})]}),(0,x.jsxs)(`section`,{className:`featured-tool__setup`,"aria-label":`${e.name} installation and usage`,children:[(0,x.jsxs)(`div`,{className:`featured-tool__setup-heading`,children:[(0,x.jsx)(`h4`,{children:`Install and try`}),(0,x.jsx)(`span`,{children:r.version})]}),(0,x.jsxs)(`p`,{children:[r.requirements,` `,(0,x.jsx)(`a`,{href:`https://docs.astral.sh/uv/getting-started/installation/`,target:`_blank`,rel:`noopener noreferrer`,children:`Install uv`}),`.`]}),r.installationNote?(0,x.jsx)(`p`,{children:r.installationNote}):null,r.commands.map(t=>(0,x.jsx)(k,{project:e.name,...t},t.label))]})]}),(0,x.jsxs)(`figure`,{className:`featured-tool__diagram`,children:[(0,x.jsx)(`a`,{href:i.src,target:`_blank`,rel:`noopener noreferrer`,"aria-label":`Open ${e.name} diagram at full size`,children:(0,x.jsx)(`img`,{src:i.src,alt:i.alt,width:r.diagramWidth,height:r.diagramHeight,loading:`lazy`,decoding:`async`})}),(0,x.jsxs)(`figcaption`,{children:[i.title,`. Select the diagram to view it at full size.`,r.diagramCollectionLabel?(0,x.jsx)(g,{to:`/projects#${e.id}`,children:r.diagramCollectionLabel}):null]})]}))})]})}var j=h.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding-block-start: var(--section-spacing);
`,M=h(s.div)`
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
`,N=h.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,P=h(s.article)`
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`,F=h(s.div)`
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
`,I=h(g)`
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
`;function L({theme:e}){return(0,x.jsxs)(j,{"aria-labelledby":`method-title`,children:[(0,x.jsxs)(M,{...t(),children:[(0,x.jsx)(`h2`,{id:`method-title`,style:{color:e.text},children:`How I work`}),(0,x.jsx)(`p`,{style:{color:e.secondaryText},children:l.method})]}),(0,x.jsx)(N,{children:l.workAreas.map((r,a)=>(0,O.createElement)(P,{...t(a),key:r.title,style:{background:n(e.cardBackgroundAlt,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius,boxShadow:i(`0 2px 8px ${e.shadowColor}`,e.panelGlow)}},(0,x.jsx)(`h3`,{style:{color:e.text},children:r.title}),(0,x.jsx)(`p`,{style:{color:e.secondaryText},children:r.description})))}),(0,x.jsxs)(F,{...t(),style:{background:n(e.accentSoft,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`h2`,{style:{color:e.text},children:l.closing.title}),(0,x.jsx)(`p`,{style:{color:e.secondaryText},children:l.closing.description})]}),(0,x.jsx)(I,{className:`motion-action`,theme:e,to:`/contact`,children:`Contact me`})]})]})}var R=(0,O.lazy)(()=>v(()=>import(`./GitHubPreview-BHX9cmDi.js`),__vite__mapDeps([0,1,2,3,4])));function z(){let e=(0,O.useRef)(null),[t,n]=(0,O.useState)(!1);return(0,O.useEffect)(()=>{if(!(`IntersectionObserver`in window)){n(!0);return}let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(n(!0),t.disconnect())},{rootMargin:`300px`});return t.observe(e.current),()=>t.disconnect()},[]),(0,x.jsx)(`div`,{id:`github-overview`,ref:e,style:{minHeight:`12rem`},children:t&&(0,x.jsx)(O.Suspense,{fallback:(0,x.jsx)(`p`,{role:`status`,children:`Loading GitHub overview…`}),children:(0,x.jsx)(R,{})})})}var B=[{id:`prior-authorization`,title:`Prior-authorization document processing`,subtitle:`Document classification, grouped extraction, and validation for healthcare operations.`,systemLabel:`Azure Databricks orchestration`,paths:[{label:`Eligible-document path`,steps:[`Fax documents`,`Type and urgency classification`,`Eligible authorization documents`,`Azure Content Understanding Markdown`,`Grouped Azure OpenAI extraction`,`Validation and business rules`,`Structured output or review outcome`]}],notes:[`Extraction covers 117 fields across seven related groups. Confidence-aware four-pass extraction and retries support extraction and validation; individual passes are not shown.`,`Other document categories follow separate routing.`,`System outputs include RPA-ready CSV/JSON and annotated PDFs; their individual generation paths are not shown.`]},{id:`computer-use`,title:`Computer-use and multi-agent reasoning`,subtitle:`Retrieved knowledge and browser observations supply context for agent reasoning.`,paths:[{label:`Retrieved knowledge`,steps:[`Milvus retrieval`,`Reranking`,`Retrieved context`]},{label:`Browser observations`,steps:[`Playwright MCP`,`Accessibility-tree snapshots and compressed-vision context`]}],convergence:`Agent reasoning`,notes:[`Both context paths feed agent reasoning. The workflow also uses failure-aware routing, whose control flow is not shown here.`]},{id:`warranty-processing`,title:`Warranty classification and NLP processing`,subtitle:`Separate standard claim scoring from NLP processing and offloaded data work.`,systemLabel:`Incoming claims → routing`,paths:[{label:`Structured claims`,steps:[`Random Forest classifier`,`Classification result`]},{label:`Complex / free-text claims`,steps:[`FastAPI NLP service`],branches:[{label:`NLP call from FastAPI`,steps:[`Azure CLU`]},{label:`Separate processing offload from FastAPI`,steps:[`Azure Blob Storage`,`Azure Functions`,`Validation, transformation, and persistence`]}]}],notes:[`Azure CLU calls remain in FastAPI; only the offloaded processing moves through Blob Storage to Functions.`,`Analytics and drift dashboards monitor the system. Intake acknowledgement is not processing completion.`]}];function V({steps:e,label:t}){return(0,x.jsx)(`ol`,{className:`architecture-steps`,"aria-label":t,children:e.map((e,t)=>(0,x.jsxs)(`li`,{children:[t>0?(0,x.jsx)(`svg`,{className:`architecture-arrow`,"aria-hidden":`true`,width:`16`,height:`20`,viewBox:`0 0 16 20`,children:(0,x.jsx)(`path`,{d:`M8 2v15m-5-5 5 5 5-5`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`})}):null,(0,x.jsx)(`span`,{className:`architecture-node`,children:e})]},e))})}function H({theme:e}){return(0,x.jsxs)(`section`,{id:`architecture`,className:`architecture-section`,"aria-labelledby":`architecture-title`,style:{color:e.secondaryText},children:[(0,x.jsx)(`p`,{className:`architecture-eyebrow`,style:{color:e.secondaryText},children:`Architecture`}),(0,x.jsx)(`h2`,{id:`architecture-title`,style:{color:e.text},children:`How the systems are put together`}),(0,x.jsx)(`p`,{className:`architecture-intro`,children:`Three professional systems, with detailed decisions and results on the Experience page.`}),(0,x.jsx)(`div`,{className:`architecture-grid`,children:B.map((n,r)=>(0,O.createElement)(s.article,{...t(r),key:n.id,className:`architecture-card`,"aria-labelledby":`architecture-${n.id}`,style:{background:e.cardBackgroundAlt,borderColor:e.borderSoft}},(0,x.jsx)(`h3`,{id:`architecture-${n.id}`,style:{color:e.text},children:n.title}),(0,x.jsx)(`p`,{children:n.subtitle}),n.systemLabel?(0,x.jsx)(`p`,{className:`architecture-system`,style:{color:e.text},children:n.systemLabel}):null,(0,x.jsx)(`div`,{className:`architecture-paths`,children:n.paths.map(t=>{var r;return(0,x.jsxs)(`div`,{className:`architecture-path`,children:[(0,x.jsx)(`h4`,{style:{color:e.text},children:t.label}),(0,x.jsx)(V,{steps:t.steps,label:`${n.title}: ${t.label}`}),(r=t.branches)==null?void 0:r.map(t=>(0,x.jsxs)(`div`,{className:`architecture-branch`,children:[(0,x.jsx)(`h5`,{style:{color:e.text},children:t.label}),(0,x.jsx)(V,{steps:t.steps,label:t.label})]},t.label))]},t.label)})}),n.convergence?(0,x.jsxs)(`p`,{className:`architecture-convergence`,style:{color:e.text},children:[`Both context paths feed: `,(0,x.jsx)(`strong`,{children:n.convergence})]}):null,(0,x.jsx)(`ul`,{className:`architecture-notes`,children:n.notes.map(e=>(0,x.jsx)(`li`,{children:e},e))}),(0,x.jsx)(g,{className:`architecture-link`,to:`/experience#${n.id}`,"aria-label":`Read ${n.title} engineering story`,children:`Read project story`})))}),(0,x.jsx)(`p`,{className:`architecture-scope`,children:`Simplified architecture views; internal infrastructure and client-specific rules are omitted.`})]})}function U({theme:e}){return(0,x.jsxs)(`section`,{className:`metrics-section`,"aria-label":`Professional results`,style:{color:e.secondaryText},children:[(0,x.jsx)(`ul`,{className:`metrics-strip`,style:{background:e.evidenceSurface,borderColor:e.evidenceBorder},children:c.map(t=>(0,x.jsx)(`li`,{children:(0,x.jsxs)(g,{to:t.href,"aria-label":`${t.label}: ${t.value}. Read the project story.`,children:[(0,x.jsx)(`strong`,{style:{color:e.evidenceText},children:t.value}),(0,x.jsx)(`span`,{className:`metric-label`,style:{color:e.accentSolid},children:t.label}),(0,x.jsx)(`span`,{className:`metric-context`,style:{color:e.secondaryText},children:t.context})]})},t.label))}),(0,x.jsx)(`p`,{className:`metrics-disclosure`,children:`Reported team and system results from internal employer evaluations. Project stories explain the scope and my contributions.`})]})}function W({theme:e}){return(0,x.jsxs)(`section`,{id:`professional-work`,className:`professional-section`,"aria-labelledby":`professional-work-title`,style:{color:e.secondaryText},children:[(0,x.jsx)(`p`,{className:`professional-eyebrow`,style:{color:e.secondaryText},children:`Selected professional work`}),(0,x.jsx)(`h2`,{id:`professional-work-title`,style:{color:e.text},children:`Featured professional projects`}),(0,x.jsx)(`p`,{children:`Three projects spanning production machine learning, document AI, and agentic workflows.`}),(0,x.jsx)(g,{className:`professional-link`,to:`/experience`,children:`View all professional work`}),(0,x.jsx)(`div`,{className:`professional-grid`,children:u.map((n,r)=>(0,O.createElement)(s.article,{...t(r),key:n.id,"aria-labelledby":`professional-${n.id}`,style:{background:e.cardBackgroundAlt,borderColor:e.borderSoft}},(0,x.jsx)(`p`,{className:`professional-company`,children:n.company}),(0,x.jsx)(`h3`,{id:`professional-${n.id}`,style:{color:e.text},children:n.title}),(0,x.jsx)(`p`,{children:n.summary}),(0,x.jsx)(`h4`,{style:{color:e.text},children:`My contribution`}),(0,x.jsx)(`p`,{children:n.contribution}),(0,x.jsx)(g,{className:`professional-link`,to:`/experience#${n.id}`,"aria-label":`Read ${n.title} professional story`,children:`Read project story`})))})]})}function G(t){return(0,x.jsxs)(`div`,{children:[(0,x.jsx)(e,{}),(0,x.jsxs)(`main`,{id:`main-content`,children:[(0,x.jsx)(S,{theme:t.theme}),(0,x.jsx)(W,{theme:t.theme}),(0,x.jsx)(A,{}),(0,x.jsx)(D,{theme:t.theme}),(0,x.jsx)(U,{theme:t.theme}),(0,x.jsx)(H,{theme:t.theme}),(0,x.jsx)(y,{theme:t.theme}),(0,x.jsx)(z,{}),(0,x.jsx)(L,{theme:t.theme})]}),(0,x.jsx)(o,{theme:t.theme})]})}export{G as default};