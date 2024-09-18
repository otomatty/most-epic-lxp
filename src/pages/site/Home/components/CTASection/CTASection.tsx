import { Component } from "solid-js";
import {
  CTASectionContainer,
  CTAButton,
  CTADescription,
} from "./CTASection.styled";

const CTASection: Component = () => {
  return (
    <CTASectionContainer>
      <h2>今すぐ始めましょう 🚀</h2>
      <CTADescription>
        LXPで効果的な学習を始めませんか？無料トライアルで14日間すべての機能を体験できます。
      </CTADescription>
      <CTAButton
        onClick={() => {
          /* ログイン処理 */
        }}
      >
        無料トライアルを始める
      </CTAButton>
      <p>クレジットカード不要・いつでもキャンセル可能</p>
    </CTASectionContainer>
  );
};

export default CTASection;
