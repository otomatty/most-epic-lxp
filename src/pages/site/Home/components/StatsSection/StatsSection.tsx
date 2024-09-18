import { Component } from "solid-js";
import {
  StatsSectionContainer,
  StatsList,
  StatItem,
  StatEmoji,
} from "./StatsSection.styled";

const StatsSection: Component = () => {
  return (
    <StatsSectionContainer>
      <h2>LXPの実績 📈</h2>
      <StatsList>
        <StatItem>
          <StatEmoji>👥</StatEmoji>
          <h3>100,000+</h3>
          <p>アクティブユーザー</p>
        </StatItem>
        <StatItem>
          <StatEmoji>⏱️</StatEmoji>
          <h3>1,000,000+</h3>
          <p>総学習時間</p>
        </StatItem>
        <StatItem>
          <StatEmoji>😊</StatEmoji>
          <h3>95%</h3>
          <p>ユーザー満足度</p>
        </StatItem>
        <StatItem>
          <StatEmoji>🌍</StatEmoji>
          <h3>50+</h3>
          <p>対応言語数</p>
        </StatItem>
      </StatsList>
    </StatsSectionContainer>
  );
};

export default StatsSection;
