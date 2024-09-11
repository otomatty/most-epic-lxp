import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider, firestore } from "../../../firebase/config";
import { createOrUpdateUser } from "../../../services/userService";
import { doc, getDoc } from "firebase/firestore";
import { LoginContainer } from "./Login.styled";

const Login: Component = () => {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isSignUp, setIsSignUp] = createSignal(false);

  const handleEmailLogin = async (e: Event) => {
    e.preventDefault();
    try {
      let result;
      if (isSignUp()) {
        result = await createUserWithEmailAndPassword(
          auth,
          email(),
          password()
        );
      } else {
        result = await signInWithEmailAndPassword(auth, email(), password());
      }
      await createOrUpdateUser(result.user);
      await checkInitialSetup(result.user.uid);
    } catch (error) {
      console.error("Email login failed:", error);
      alert(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createOrUpdateUser(result.user);
      await checkInitialSetup(result.user.uid);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Googleログインに失敗しました。");
    }
  };

  const checkInitialSetup = async (uid: string) => {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (!userData.Jobs || userData.Jobs.length === 0) {
        navigate("/webapp/initial-setup");
      } else {
        navigate("/webapp/dashboard");
      }
    }
  };

  return (
    <LoginContainer>
      <h1>{isSignUp() ? "新規登録" : "ログイン"}</h1>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <button type="submit">{isSignUp() ? "登録" : "ログイン"}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp())}>
        {isSignUp() ? "ログインに切り替え" : "新規登録に切り替え"}
      </button>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
      <button onClick={() => navigate("/reset-password")}>
        パスワードを忘れた場合
      </button>
    </LoginContainer>
  );
};

export default Login;
