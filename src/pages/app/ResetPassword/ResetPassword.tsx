import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { resetPassword } from "../../../services/userService";
import {
  ResetPasswordContainer,
  ResetPasswordForm,
  ResetButton,
} from "./ResetPassword.styled";

const ResetPassword: Component = () => {
  const [email, setEmail] = createSignal("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: Event) => {
    e.preventDefault();
    await resetPassword(email());
    navigate("/login");
  };

  return (
    <ResetPasswordContainer>
      <h1>パスワードリセット</h1>
      <ResetPasswordForm onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <ResetButton type="submit">リセット</ResetButton>
      </ResetPasswordForm>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
