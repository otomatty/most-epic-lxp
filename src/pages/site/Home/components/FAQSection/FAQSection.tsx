import { Component } from "solid-js";
import {
  FAQSectionContainer,
  FAQList,
  FAQItem,
  Question,
  Answer,
} from "./FAQSection.styled";

const FAQSection: Component = () => {
  return (
    <FAQSectionContainer>
      <h2>よくある質問 🤔</h2>
      <FAQList>
        <FAQItem>
          <Question>Q: LXPは無料で利用できますか？</Question>
          <Answer>
            A:
            基本機能は無料で利用できます。プレミアム機能は有料プランでご利用いただけます。詳細は料金プランをご確認ください。
          </Answer>
        </FAQItem>
        <FAQItem>
          <Question>Q: どのような学習コンテンツがありますか？</Question>
          <Answer>
            A:
            プログラミング、語学、ビジネススキル、デザイン、マーケティングなど、幅広い分野のコンテンツをご用意しています。常に最新のトピックを追加しています。
          </Answer>
        </FAQItem>
        <FAQItem>
          <Question>Q: モバイルでも利用できますか？</Question>
          <Answer>
            A:
            はい、スマートフォンやタブレットでもご利用いただけます。iOS、Android両方に対応したアプリを提供しています。
          </Answer>
        </FAQItem>
        <FAQItem>
          <Question>Q: 企業や教育機関向けのプランはありますか？</Question>
          <Answer>
            A:
            はい、法人向けの特別プランをご用意しています。カスタマイズされた学習環境や管理機能を提供します。詳細はお問い合わせください。
          </Answer>
        </FAQItem>
      </FAQList>
    </FAQSectionContainer>
  );
};

export default FAQSection;
