import { Component } from "solid-js";
import { TestimonialsContainer, Testimonial } from "./Testimonials.styled";

const Testimonials: Component = () => {
  return (
    <TestimonialsContainer>
      <h1>導入事例・お客様の声</h1>
      <Testimonial>
        <p>「このアプリのおかげで学習が楽しくなりました！」 - ユーザーA</p>
      </Testimonial>
      <Testimonial>
        <p>「非常に使いやすく、効果的です。」 - ユーザーB</p>
      </Testimonial>
    </TestimonialsContainer>
  );
};

export default Testimonials;
