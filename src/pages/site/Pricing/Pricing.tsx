import { Component } from "solid-js";
import { PricingContainer, Plan } from "./Pricing.styled";

const Pricing: Component = () => {
  return (
    <PricingContainer>
      <h1>料金プラン</h1>
      <Plan>
        <h2>無料プラン</h2>
        <p>基本的な機能を無料で利用できます。</p>
      </Plan>
      <Plan>
        <h2>有料プラン</h2>
        <p>追加機能やサポートを含むプレミアムプランです。</p>
      </Plan>
    </PricingContainer>
  );
};

export default Pricing;
