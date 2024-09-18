import { Component } from "solid-js";
import { HomeContainer, Header, Footer } from "./Home.styled";
import HeroSection from "./components/HeroSection/HeroSection";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import LearningExperienceSection from "./components/LearningExperienceSection/LearningExperienceSection";
import StatsSection from "./components/StatsSection/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import FAQSection from "./components/FAQSection/FAQSection";
import CTASection from "./components/CTASection/CTASection";

const Home: Component = () => {
  return (
    <HomeContainer>
      <Header>
        <h1>LXP - 学習体験プラットフォーム</h1>
      </Header>

      <HeroSection />
      <FeaturesSection />
      <LearningExperienceSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />

      <Footer>
        <p>&copy; 2023 LXP. All rights reserved.</p>
      </Footer>
    </HomeContainer>
  );
};

export default Home;
