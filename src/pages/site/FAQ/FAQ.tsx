import { Component } from "solid-js";
import { FAQContainer, Question, Answer } from "./FAQ.styled";

const FAQ: Component = () => {
  return (
    <FAQContainer>
      <h1>よくある質問</h1>
      <Question>Q: このアプリは無料ですか？</Question>
      <Answer>A: はい、基本的な機能は無料で利用できます。</Answer>
      <Question>Q: サポートはどのように受けられますか？</Question>
      <Answer>A: サポートページからお問い合わせください。</Answer>
    </FAQContainer>
  );
};

export default FAQ;
