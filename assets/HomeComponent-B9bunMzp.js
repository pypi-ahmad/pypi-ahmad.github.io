import{a as e,c as t,i as n,n as r,r as i,s as a,t as o,u as s}from"./Footer-DtvPxGTX.js";import{t as c}from"./homePage-DBkAVS6j.js";import{_ as l,a as u,c as d,o as f,p,v as m}from"./index-BZHrdGFS.js";import{t as h}from"./ProjectCard-OUbtE5No.js";var g=m(l(),1),_=f();function v({theme:r}){return(0,_.jsxs)(`section`,{id:`greeting`,className:`greet-main`,"aria-labelledby":`home-title`,style:{background:i(r.heroGradient,r.heroPattern),border:`${r.panelBorderWidth} ${r.panelBorderStyle} ${r.borderSoft}`,borderRadius:r.heroRadius,boxShadow:n(`0 28px 80px ${r.shadowColor}`,r.panelGlow)},children:[(0,_.jsxs)(`div`,{className:`hero-copy`,children:[(0,_.jsx)(`div`,{className:`hero-atmosphere`,"aria-hidden":`true`}),(0,_.jsx)(s.p,{...e(0,!0),className:`hero-eyebrow`,style:{color:r.accentSolid},children:c.hero.eyebrow}),(0,_.jsx)(`h1`,{id:`home-title`,className:`greeting-text`,style:{color:r.text,fontFamily:r.accentFontFamily,letterSpacing:r.accentLetterSpacing,transition:t},children:c.hero.title}),(0,_.jsx)(s.p,{...e(1,!0),className:`greeting-text-p`,style:{color:r.secondaryText,transition:t},children:c.hero.introduction}),(0,_.jsxs)(s.div,{...e(2,!0),className:`hero-actions`,"aria-label":`Portfolio actions`,children:[(0,_.jsx)(`a`,{className:`button`,href:`#selected-work`,style:{background:r.accentGradient,color:r.accentText,borderColor:r.borderColor,borderRadius:r.controlRadius,transition:a},children:`View selected work`}),(0,_.jsx)(p,{className:`button button-secondary`,to:`/contact`,style:{color:r.text,borderColor:r.borderSoft,borderRadius:r.controlRadius,transition:a},children:`Contact me`})]})]}),(0,_.jsxs)(`div`,{className:`outcomes`,"aria-labelledby":`outcomes-title`,children:[(0,_.jsxs)(s.div,{...e(),className:`section-heading-row`,children:[(0,_.jsx)(`h2`,{id:`outcomes-title`,style:{color:r.text},children:`Evidence from internal work`}),(0,_.jsx)(`p`,{style:{color:r.secondaryText},children:`These are team and system results from internal evaluations. Contribution notes identify the parts I worked on.`})]}),(0,_.jsx)(`ul`,{className:`outcome-grid`,children:c.outcomes.map((a,o)=>(0,g.createElement)(s.li,{...e(o),key:a.label,className:`outcome-card`,style:{background:i(r.cardBackgroundAlt,r.surfacePattern),border:`${r.panelBorderWidth} ${r.panelBorderStyle} ${r.borderSoft}`,borderRadius:r.surfaceRadius,boxShadow:n(`0 18px 40px ${r.shadowColor}`,r.panelGlow),transition:t}},(0,_.jsx)(`strong`,{style:{color:r.text},children:a.metric}),(0,_.jsx)(`h3`,{style:{color:r.text},children:a.label}),(0,_.jsx)(`p`,{style:{color:r.secondaryText},children:a.context}),(0,_.jsx)(`p`,{className:`contribution`,style:{color:r.secondaryText},children:a.contribution})))})]})]})}var y=u.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
  text-align: center;
`,b=u(s.h2)`
  color: ${e=>e.theme.text};
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`,x=u.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap-tight);

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,S=u(p)`
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
`;function C({theme:t}){return(0,_.jsxs)(y,{id:`selected-work`,"aria-labelledby":`selected-work-title`,children:[(0,_.jsx)(b,{id:`selected-work-title`,theme:t,...e(),children:`Selected work`}),(0,_.jsx)(x,{children:d.data.slice(0,4).map((e,n)=>(0,_.jsx)(h,{repo:e,theme:t,revealIndex:n},e.url))}),(0,_.jsx)(S,{className:`motion-action`,theme:t,to:`/projects`,children:`See all projects`})]})}var w=u.section`
  width: min(var(--container-max-width), calc(100% - (var(--page-gutter) * 2)));
  margin: 0 auto;
  padding: var(--section-spacing) 0;
`,T=u(s.div)`
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
`,E=u.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`,D=u(s.article)`
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    line-height: 1.55;
  }
`,O=u(s.div)`
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
`,k=u(p)`
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
`;function A({theme:t}){return(0,_.jsxs)(w,{"aria-labelledby":`method-title`,children:[(0,_.jsxs)(T,{...e(),children:[(0,_.jsx)(`h2`,{id:`method-title`,style:{color:t.text},children:`How I work`}),(0,_.jsx)(`p`,{style:{color:t.secondaryText},children:c.method})]}),(0,_.jsx)(E,{"aria-label":`Applied AI work areas`,children:c.workAreas.map((r,a)=>(0,g.createElement)(D,{...e(a),key:r.title,style:{background:i(t.cardBackgroundAlt,t.surfacePattern),border:`${t.panelBorderWidth} ${t.panelBorderStyle} ${t.borderSoft}`,borderRadius:t.surfaceRadius,boxShadow:n(`0 16px 32px ${t.shadowColor}`,t.panelGlow)}},(0,_.jsx)(`h3`,{style:{color:t.text},children:r.title}),(0,_.jsx)(`p`,{style:{color:t.secondaryText},children:r.description})))}),(0,_.jsxs)(O,{...e(),style:{background:i(t.accentSoft,t.surfacePattern),border:`${t.panelBorderWidth} ${t.panelBorderStyle} ${t.borderSoft}`,borderRadius:t.surfaceRadius},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h2`,{style:{color:t.text},children:c.closing.title}),(0,_.jsx)(`p`,{style:{color:t.secondaryText},children:c.closing.description})]}),(0,_.jsx)(k,{className:`motion-action`,theme:t,to:`/contact`,children:`Contact me`})]})]})}function j(e){return(0,_.jsxs)(`div`,{children:[(0,_.jsx)(r,{}),(0,_.jsxs)(`main`,{id:`main-content`,children:[(0,_.jsx)(v,{theme:e.theme}),(0,_.jsx)(C,{theme:e.theme}),(0,_.jsx)(A,{theme:e.theme})]}),(0,_.jsx)(o,{theme:e.theme})]})}export{j as default};