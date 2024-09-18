import { Component } from "solid-js";
import {
  LearningExperienceSectionContainer,
  ExperienceDescription,
  ExperienceList,
  ExperienceItem,
} from "./LearningExperienceSection.styled";

const LearningExperienceSection: Component = () => {
  return (
    <LearningExperienceSectionContainer>
      <h2>あなたの学習体験 🌈</h2>
      <ExperienceDescription>
        LXPでは、自分のペースで学習を進めることができます。
        インタラクティブな教材、実践的な演習、そして他の学習者とのコラボレーションを通じて、
        効果的かつ楽しく学ぶことができます。
      </ExperienceDescription>
      <ExperienceList>
        <ExperienceItem>
          <span>📚</span> 豊富な学習リソース
        </ExperienceItem>
        <ExperienceItem>
          <span>🤖</span> AIによる個別フィードバック
        </ExperienceItem>
        <ExperienceItem>
          <span>👨‍👩‍👧‍👦</span> コミュニティサポート
        </ExperienceItem>
        <ExperienceItem>
          <span>🏋️‍♀️</span> 実践的な演習
        </ExperienceItem>
      </ExperienceList>
    </LearningExperienceSectionContainer>
  );
};

export default LearningExperienceSection;
