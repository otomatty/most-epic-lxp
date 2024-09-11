import { Component } from "solid-js";
import { AboutContainer, TeamMember } from "./About.styled";

const About: Component = () => {
  return (
    <AboutContainer>
      <h1>会社概要</h1>
      <p>
        私たちは、学習をより効果的にするためのプラットフォームを提供しています。
      </p>
      <h2>開発チーム</h2>
      <TeamMember>
        <h3>山田 太郎</h3>
        <p>CEO</p>
      </TeamMember>
      <TeamMember>
        <h3>鈴木 花子</h3>
        <p>CTO</p>
      </TeamMember>
    </AboutContainer>
  );
};

export default About;
