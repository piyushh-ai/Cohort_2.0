import "../styles/global.scss";
import WelcomeNavbar from "../components/WelcomeNavbar/WelcomeNavbar";
import WelcomeHero from "../components/WelcomeHero/WelcomeHero";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import BuilderSection from "../components/BuilderSection/BuilderSection";
import WelcomeFooter from "../components/WelcomeFooter/WelcomeFooter";

const Welcome = () => {
  return (
    <div className="welcome-page">
      <WelcomeNavbar />
      <WelcomeHero />
      <FeaturesSection />
      <HowItWorks />
      <BuilderSection />
      <WelcomeFooter />
    </div>
  );
};

export default Welcome;