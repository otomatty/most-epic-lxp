import { Component } from "solid-js";
import { LegalContainer, Section } from "./Legal.styled";

const Legal: Component = () => {
  return (
    <LegalContainer>
      <h1>利用規約・プライバシーポリシー</h1>
      <Section>
        <h2>利用規約</h2>
        <p>ここに利用規約の内容が入ります。</p>
      </Section>
      <Section>
        <h2>プライバシーポリシー</h2>
        <p>ここにプライバシーポリシーの内容が入ります。</p>
      </Section>
    </LegalContainer>
  );
};

export default Legal;
