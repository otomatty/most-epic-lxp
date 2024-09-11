import { Component } from "solid-js";
import {
  SupportContainer,
  ContactForm,
  FormField,
  SubmitButton,
} from "./Support.styled";

const Support: Component = () => {
  return (
    <SupportContainer>
      <h1>サポート・お問い合わせ</h1>
      <ContactForm>
        <FormField>
          <label>お名前</label>
          <input type="text" />
        </FormField>
        <FormField>
          <label>メールアドレス</label>
          <input type="email" />
        </FormField>
        <FormField>
          <label>お問い合わせ内容</label>
          <textarea></textarea>
        </FormField>
        <SubmitButton>送信</SubmitButton>
      </ContactForm>
    </SupportContainer>
  );
};

export default Support;
