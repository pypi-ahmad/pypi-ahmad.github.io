/**
 * Home Page
 *
 * Composes the landing page from container sections:
 * Header, evidence-led hero, selected projects, work details, and footer.
 *
 * Props: { theme }
 */
import React from "react";
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import FeaturedProjects from "../../containers/FeaturedProjects/FeaturedProjects";
import HomeDetails from "../../containers/HomeDetails/HomeDetails";
import Footer from "../../components/footer/Footer";

function Home(props) {
  return (
    <div>
      <Header />
      <main id="main-content">
        <Greeting theme={props.theme} />
        <FeaturedProjects theme={props.theme} />
        <HomeDetails theme={props.theme} />
      </main>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Home;
