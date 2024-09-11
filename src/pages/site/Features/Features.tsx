import { Component } from "solid-js";
import { FeaturesContainer, FeatureItem } from "./Features.styled";

const Features: Component = () => {
  return (
    <FeaturesContainer>
      <h1>アプリの主な特徴</h1>
      <FeatureItem>
        <h2>パーソナライズされた学習体験</h2>
        <p>あなたの目標と進捗に合わせて、最適な学習コンテンツを提供します。</p>
      </FeatureItem>
      <FeatureItem>
        <h2>オンライン自習室</h2>
        <p>
          他の学習者と一緒に集中して学習できる、バーチャルな自習環境を提供します。
        </p>
      </FeatureItem>
      <FeatureItem>
        <h2>進捗トラッキング</h2>
        <p>学習の進捗を可視化し、モチベーションを維持するのに役立ちます。</p>
      </FeatureItem>
    </FeaturesContainer>
  );
};

export default Features;
