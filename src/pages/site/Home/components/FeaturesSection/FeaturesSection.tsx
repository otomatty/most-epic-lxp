import { Component } from "solid-js";
import {
  FeaturesSectionContainer,
  FeaturesList,
  FeatureItem,
  FeatureEmoji,
} from "./FeaturesSection.styled";

const FeaturesSection: Component = () => {
  return (
    <FeaturesSectionContainer>
      <h2>主な特徴 🌟</h2>
      <FeaturesList>
        <FeatureItem>
          <FeatureEmoji>🎯</FeatureEmoji>
          <h3>パーソナライズされた学習体験</h3>
          <p>
            AIがあなたの学習スタイルを分析し、最適な学習コンテンツと進度を提案します。
          </p>
        </FeatureItem>
        <FeatureItem>
          <FeatureEmoji>👥</FeatureEmoji>
          <h3>オンライン自習室</h3>
          <p>
            他の学習者と一緒に集中して学習できる、バーチャルな自習環境を提供します。モチベーション維持に効果的です。
          </p>
        </FeatureItem>
        <FeatureItem>
          <FeatureEmoji>📊</FeatureEmoji>
          <h3>進捗トラッキング</h3>
          <p>
            学習の進捗をグラフやチャートで可視化し、目標達成をサポートします。
          </p>
        </FeatureItem>
        <FeatureItem>
          <FeatureEmoji>🏆</FeatureEmoji>
          <h3>ゲーミフィケーション</h3>
          <p>
            ポイントやバッジ、ランキングシステムで楽しみながら学習を継続できます。
          </p>
        </FeatureItem>
      </FeaturesList>
    </FeaturesSectionContainer>
  );
};

export default FeaturesSection;
