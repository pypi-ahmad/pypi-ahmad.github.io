/**
 * Home Page
 *
 * Composes the landing page from container sections:
 * Header → Greeting hero → SystemShowcase → SystemThinking → Skills → Footer
 *
 * Props: { theme, setTheme }
 */
import React from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import Skills from "../../containers/skills/Skills";
import SystemShowcase from "../../containers/SystemShowcase/SystemShowcase";
import SystemThinking from "../../containers/SystemThinking/SystemThinking";
import Footer from "../../components/footer/Footer";

function Home(props) {
  return (
    <div>
      <Header theme={props.theme} setTheme={props.setTheme} />
      <Greeting theme={props.theme} />
      <SystemShowcase theme={props.theme} />
      <SystemThinking theme={props.theme} />
      <Skills theme={props.theme} />
      <Footer theme={props.theme} />
    </div>
  );
}

export default Home;
