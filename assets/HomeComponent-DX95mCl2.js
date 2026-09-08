import{a as e,i as t,l as n,n as r,o as i,r as a,s as o,t as s}from"./Footer-DgkwkPzR.js";import{t as c}from"./homePage-DBkAVS6j.js";import{_ as l,a as u,c as d,o as f,p}from"./index-gZXt0h1g.js";import{t as m}from"./ProjectCard-BNoL3qYx.js";l();var h=f();function g({theme:r}){return(0,h.jsxs)(n.section,{id:`greeting`,className:`greet-main`,"aria-labelledby":`home-title`,initial:{opacity:0,y:24},animate:{opacity:1,y:0},transition:{duration:.6},style:{background:a(r.heroGradient,r.heroPattern),border:`${r.panelBorderWidth} ${r.panelBorderStyle} ${r.borderSoft}`,borderRadius:r.heroRadius,boxShadow:t(`0 28px 80px ${r.shadowColor}`,r.panelGlow)},children:[(0,h.jsxs)(`div`,{className:`hero-copy`,children:[(0,h.jsx)(`p`,{className:`hero-eyebrow`,style:{color:r.accentSolid},children:c.hero.eyebrow}),(0,h.jsx)(`h1`,{id:`home-title`,className:`greeting-text`,style:{color:r.text,fontFamily:r.accentFontFamily,letterSpacing:r.accentLetterSpacing,transition:o},children:c.hero.title}),(0,h.jsx)(`p`,{className:`greeting-text-p`,style:{color:r.secondaryText,transition:o},children:c.hero.introduction}),(0,h.jsxs)(`div`,{className:`hero-actions`,"aria-label":`Portfolio actions`,children:[(0,h.jsx)(`a`,{className:`button`,href:`#selected-work`,style:{background:r.accentGradient,color:r.accentText,borderColor:r.borderColor,borderRadius:r.controlRadius,transition:i},children:`View selected work`}),(0,h.jsx)(p,{className:`button button-secondary`,to:`/contact`,style:{color:r.text,borderColor:r.borderSoft,borderRadius:r.controlRadius,transition:i},children:`Contact me`})]})]}),(0,h.jsxs)(`div`,{className:`outcomes`,"aria-labelledby":`outcomes-title`,children:[(0,h.jsxs)(`div`,{className:`section-heading-row`,children:[(0,h.jsx)(`h2`,{id:`outcomes-title`,style:{color:r.text},children:`Evidence from internal work`}),(0,h.jsx)(`p`,{style:{color:r.secondaryText},children:`These are team and system results from internal evaluations. Contribution notes identify the parts I worked on.`})]}),(0,h.jsx)(`ul`,{className:`outcome-grid`,children:c.outcomes.map(n=>(0,h.jsxs)(`li`,{className:`outcome-card`,style:{background:a(r.cardBackgroundAlt,r.surfacePattern),border:`${r.panelBorderWidth} ${r.panelBorderStyle} ${r.borderSoft}`,borderRadius:r.surfaceRadius,boxShadow:t(`0 18px 40px ${r.shadowColor}`,r.panelGlow),transition:e},children:[(0,h.jsx)(`strong`,{style:{color:r.accentSolid},children:n.metric}),(0,h.jsx)(`h3`,{style:{color:r.text},children:n.label}),(0,h.jsx)(`p`,{style:{color:r.secondaryText},children:n.context}),(0,h.jsx)(`p`,{className:`contribution`,style:{color:r.secondaryText},children:n.contribution})]},n.label))})]})]})}var _=u.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
  text-align: center;
`,v=u(n.h2)`
  color: ${e=>e.theme.text};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,y=u.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap-tight);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,b=u(p)`
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
`;function x({theme:e}){return(0,h.jsxs)(_,{id:`selected-work`,"aria-labelledby":`selected-work-title`,children:[(0,h.jsx)(v,{id:`selected-work-title`,theme:e,initial:{opacity:0,y:-20},whileInView:{opacity:1,y:0},transition:{duration:.5},viewport:{once:!0},children:`Selected work`}),(0,h.jsx)(y,{children:d.data.slice(0,4).map(t=>(0,h.jsx)(m,{repo:t,theme:e},t.url))}),(0,h.jsx)(b,{theme:e,to:`/projects`,children:`See all projects`})]})}var S=u.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
`,C=u.div`
  max-width: 820px;
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 4vw, 3rem);
  }

  p {
    margin: 0;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    line-height: 1.7;
  }
`,w=u.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`,T=u.article`
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`,E=u.div`
  display: flex;
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
`,D=u(p)`
  flex: 0 0 auto;
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
`;function O({theme:e}){return(0,h.jsxs)(S,{"aria-labelledby":`method-title`,children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(`h2`,{id:`method-title`,style:{color:e.text},children:`How I work`}),(0,h.jsx)(`p`,{style:{color:e.secondaryText},children:c.method})]}),(0,h.jsx)(w,{"aria-label":`Applied AI work areas`,children:c.workAreas.map(n=>(0,h.jsxs)(T,{style:{background:a(e.cardBackgroundAlt,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius,boxShadow:t(`0 16px 32px ${e.shadowColor}`,e.panelGlow)},children:[(0,h.jsx)(`h3`,{style:{color:e.accentSolid},children:n.title}),(0,h.jsx)(`p`,{style:{color:e.secondaryText},children:n.description})]},n.title))}),(0,h.jsxs)(E,{style:{background:a(e.accentSoft,e.surfacePattern),border:`${e.panelBorderWidth} ${e.panelBorderStyle} ${e.borderSoft}`,borderRadius:e.surfaceRadius},children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`h2`,{style:{color:e.text},children:c.closing.title}),(0,h.jsx)(`p`,{style:{color:e.secondaryText},children:c.closing.description})]}),(0,h.jsx)(D,{theme:e,to:`/contact`,children:`Contact me`})]})]})}function k(e){return(0,h.jsxs)(`div`,{children:[(0,h.jsx)(r,{}),(0,h.jsxs)(`main`,{id:`main-content`,children:[(0,h.jsx)(g,{theme:e.theme}),(0,h.jsx)(x,{theme:e.theme}),(0,h.jsx)(O,{theme:e.theme})]}),(0,h.jsx)(s,{theme:e.theme})]})}export{k as default};