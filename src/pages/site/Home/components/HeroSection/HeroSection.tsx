import { Component } from "solid-js";
import {
  HeroSectionContainer,
  HeroTitle,
  HeroDescription,
  HeroEmoji,
} from "./HeroSection.styled";

const HeroSection: Component = () => {
  return (
    <HeroSectionContainer>
      <HeroEmoji>🚀</HeroEmoji>
      <HeroTitle>効果的な学習をサポートする革新的なプラットフォーム</HeroTitle>
      <HeroDescription>
        LXPは、あなたの学習をより効果的に、より楽しくする革新的なプラットフォームです。
        自分のペースで学び、他の学習者とつながり、実践的なスキルを身につけましょう。
        AI技術を活用した個別最適化された学習体験があなたを待っています！
      </HeroDescription>
    </HeroSectionContainer>
  );
};

export default HeroSection;
