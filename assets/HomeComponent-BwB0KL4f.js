const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GitHubPreview-DZoeu1ut.js","assets/github-CeuG3pMh.js","assets/index-q5bhfiny.js","assets/index-aid9FN2j.css","assets/github-BXBETsN9.css"])))=>i.map(i=>d[i]);
import{c as e,i as t,n,o as r,r as i,s as a,t as o,u as s}from"./Footer-B4Gdfj0b.js";import{t as c}from"./homePage-1cMurcJm.js";import{t as l}from"./socialMedia-Bod-c_nK.js";import{a as u,b as d,c as f,o as p,p as m,v as h,y as g}from"./index-q5bhfiny.js";import{t as _}from"./ProjectCard-CvMHdooN.js";var v=p(),y=d(g(),1);function b({theme:e}){var o;return(0,v.jsxs)(`section`,{id:`greeting`,className:`greet-main`,"aria-labelledby":`home-title`,style:{background:n(e.heroGradient,e.heroPattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.heroRadius,boxShadow:i(`0 28px 80px ${e.shadowColor}`,e.panelGlow)},children:[(0,v.jsxs)(`div`,{className:`hero-copy`,children:[(0,v.jsx)(`div`,{className:`hero-atmosphere`,"aria-hidden":`true`}),(0,v.jsx)(s.p,{...t(0,!0),className:`hero-eyebrow`,style:{color:e.accentSolid},children:c.hero.eyebrow}),(0,v.jsx)(`h1`,{id:`home-title`,className:`greeting-text`,style:{color:e.text,fontFamily:e.accentFontFamily,letterSpacing:e.accentLetterSpacing,transition:a},children:c.hero.title}),(0,v.jsx)(s.p,{...t(1,!0),className:`greeting-text-p`,style:{color:e.secondaryText,transition:a},children:c.hero.introduction}),(0,v.jsxs)(s.div,{...t(2,!0),className:`hero-actions`,"aria-label":`Portfolio actions`,children:[(0,v.jsx)(m,{className:`button`,to:`/contact`,style:{background:e.accentGradient,color:e.accentText,borderColor:e.borderColor,borderRadius:e.controlRadius,transition:r},children:`Discuss a project`}),(0,v.jsx)(`a`,{className:`button button-secondary`,href:`#selected-work`,style:{color:e.text,borderColor:e.borderSoft,borderRadius:e.controlRadius,transition:r},children:`View selected work`}),((o=l.github)==null?void 0:o.trim())&&(0,v.jsx)(`a`,{className:`button button-secondary`,href:l.github.trim(),style:{color:e.text,borderColor:e.borderSoft,borderRadius:e.controlRadius},children:`View GitHub`})]})]}),(0,v.jsxs)(`div`,{className:`outcomes`,"aria-labelledby":`outcomes-title`,children:[(0,v.jsxs)(s.div,{...t(),className:`section-heading-row`,children:[(0,v.jsx)(`h2`,{id:`outcomes-title`,style:{color:e.text},children:`Evidence from internal work`}),(0,v.jsx)(`p`,{style:{color:e.secondaryText},children:`These are team and system results from internal evaluations. Contribution notes identify the parts I worked on.`})]}),(0,v.jsx)(`ul`,{className:`outcome-grid`,children:c.outcomes.map((r,o)=>(0,y.createElement)(s.li,{...t(o),key:r.label,className:`outcome-card`,style:{background:n(e.cardBackgroundAlt,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius,boxShadow:i(`0 18px 40px ${e.shadowColor}`,e.panelGlow),transition:a}},(0,v.jsx)(`strong`,{style:{color:e.text},children:r.metric}),(0,v.jsx)(`h3`,{style:{color:e.text},children:r.label}),(0,v.jsx)(`p`,{style:{color:e.secondaryText},children:r.context}),(0,v.jsx)(`p`,{className:`contribution`,style:{color:e.secondaryText},children:r.contribution})))})]})]})}var x=u.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
  text-align: center;
`,S=u(s.h2)`
  color: ${e=>e.theme.text};
  font-size: var(--section-title-size);
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: var(--section-title-size);
  }
`,C=u.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap-tight);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,w=u(m)`
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
`;function T({theme:e}){return(0,v.jsxs)(x,{id:`selected-work`,"aria-labelledby":`selected-work-title`,children:[(0,v.jsx)(S,{id:`selected-work-title`,theme:e,...t(),children:`Selected work`}),(0,v.jsx)(C,{children:f.data.slice(0,4).map((t,n)=>(0,v.jsx)(_,{repo:t,theme:e,revealIndex:n},t.url))}),(0,v.jsx)(w,{className:`motion-action`,theme:e,to:`/projects`,children:`See all projects`})]})}var E=u.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
`,D=u(s.div)`
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
`,O=u.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,k=u(s.article)`
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`,A=u(s.div)`
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
`,j=u(m)`
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
`;function M({theme:e}){return(0,v.jsxs)(E,{"aria-labelledby":`method-title`,children:[(0,v.jsxs)(D,{...t(),children:[(0,v.jsx)(`h2`,{id:`method-title`,style:{color:e.text},children:`How I work`}),(0,v.jsx)(`p`,{style:{color:e.secondaryText},children:c.method})]}),(0,v.jsx)(O,{"aria-label":`Applied AI work areas`,children:c.workAreas.map((r,a)=>(0,y.createElement)(k,{...t(a),key:r.title,style:{background:n(e.cardBackgroundAlt,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius,boxShadow:i(`0 16px 32px ${e.shadowColor}`,e.panelGlow)}},(0,v.jsx)(`h3`,{style:{color:e.text},children:r.title}),(0,v.jsx)(`p`,{style:{color:e.secondaryText},children:r.description})))}),(0,v.jsxs)(A,{...t(),style:{background:n(e.accentSoft,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius},children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h2`,{style:{color:e.text},children:c.closing.title}),(0,v.jsx)(`p`,{style:{color:e.secondaryText},children:c.closing.description})]}),(0,v.jsx)(j,{className:`motion-action`,theme:e,to:`/contact`,children:`Discuss a project`})]})]})}var N=(0,y.lazy)(()=>h(()=>import(`./GitHubPreview-DZoeu1ut.js`),__vite__mapDeps([0,1,2,3,4])));function P(){let e=(0,y.useRef)(null),[t,n]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{if(!(`IntersectionObserver`in window)){n(!0);return}let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(n(!0),t.disconnect())},{rootMargin:`300px`});return t.observe(e.current),()=>t.disconnect()},[]),(0,v.jsx)(`div`,{id:`github-overview`,ref:e,style:{minHeight:`12rem`},children:t&&(0,v.jsx)(y.Suspense,{fallback:(0,v.jsx)(`p`,{role:`status`,children:`Loading GitHub overview…`}),children:(0,v.jsx)(N,{})})})}function F(t){return(0,v.jsxs)(`div`,{children:[(0,v.jsx)(e,{}),(0,v.jsxs)(`main`,{id:`main-content`,children:[(0,v.jsx)(b,{theme:t.theme}),(0,v.jsx)(T,{theme:t.theme}),(0,v.jsx)(P,{}),(0,v.jsx)(M,{theme:t.theme})]}),(0,v.jsx)(o,{theme:t.theme})]})}export{F as default};