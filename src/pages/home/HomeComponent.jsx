/**
 * Home Page
 *
 * Composes the landing page from container sections:
 * Header, evidence-led hero, selected projects, work details, and footer.
 *
 * Props: { theme }
 */
import Header from "../../components/header/Header";
import Greeting from "../../containers/greeting/Greeting";
import FeaturedProjects from "../../containers/FeaturedProjects/FeaturedProjects";
import HomeDetails from "../../containers/HomeDetails/HomeDetails";
import Footer from "../../components/footer/Footer";
import LazyGitHubPreview from "../../components/github/LazyGitHubPreview";
import CareerProgression from "../../components/CareerProgression/CareerProgression";
import Architecture from "../../components/Architecture/Architecture";
import ProfessionalWork, { MetricsStrip } from "../../components/ProfessionalWork/ProfessionalWork";

function Home(props) {
  return (
    <div>
      <Header />
      <main id="main-content">
        <Greeting theme={props.theme} />
        <ProfessionalWork theme={props.theme} />
        <FeaturedProjects theme={props.theme} />
        <MetricsStrip theme={props.theme} />
        <Architecture theme={props.theme} />
        <CareerProgression theme={props.theme} />
        <LazyGitHubPreview />
        <HomeDetails theme={props.theme} />
      </main>
      <Footer theme={props.theme} />
    </div>
  );
}

export default Home;
