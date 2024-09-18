import { Component } from "solid-js";
import {
  TestimonialsSectionContainer,
  TestimonialsList,
  TestimonialItem,
  TestimonialQuote,
} from "./TestimonialsSection.styled";

const TestimonialsSection: Component = () => {
  return (
    <TestimonialsSectionContainer>
      <h2>利用者の声 💬</h2>
      <TestimonialsList>
        <TestimonialItem>
          <TestimonialQuote>
            "LXPのおかげで、効率的に学習を進めることができました。AIによる個別アドバイスが特に役立ちました！"
          </TestimonialQuote>
          <cite>- 田中さん（28歳、エンジニア）</cite>
        </TestimonialItem>
        <TestimonialItem>
          <TestimonialQuote>
            "他の学習者と一緒に学ぶことで、モチベーションが上がりました。オンライン自習室は素晴らしいアイデアです。"
          </TestimonialQuote>
          <cite>- 佐藤さん（22歳、大学生）</cite>
        </TestimonialItem>
        <TestimonialItem>
          <TestimonialQuote>
            "パーソナライズされた学習体験が素晴らしかったです。自分のペースで学べるのが最高です。"
          </TestimonialQuote>
          <cite>- 鈴木さん（35歳、フリーランス）</cite>
        </TestimonialItem>
      </TestimonialsList>
    </TestimonialsSectionContainer>
  );
};

export default TestimonialsSection;
