/**
 * Home Page
 *
 * Composes the landing page from container sections:
 * Header → Greeting hero → FeaturedProjects → SystemThinking → Skills → Footer
 *
 * Props: { theme }
 */
import React from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import Skills from "../../containers/skills/Skills";
import FeaturedProjects from "../../containers/FeaturedProjects/FeaturedProjects";
import SystemThinking from "../../containers/SystemThinking/SystemThinking";
import Footer from "../../components/footer/Footer";

function Home(props) {
  return (
    <div>
      <Header />
      <main id="main-content">
        <Greeting theme={props.theme} />
        <FeaturedProjects theme={props.theme} />
        <SystemThinking theme={props.theme} />
        <Skills theme={props.theme} />
      </main>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Home;
