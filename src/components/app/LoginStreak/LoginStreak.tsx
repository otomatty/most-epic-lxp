import { Component, createSignal, createEffect } from "solid-js";
import { useAuthState } from "../../../hooks/useAuthState";
import { getUserData } from "../../../services/userService";
import {
  StreakContainer,
  StreakCount,
  StreakLabel,
} from "./LoginStreak.styled";

const LoginStreak: Component = () => {
  const { user } = useAuthState();
  const [loginStreak, setLoginStreak] = createSignal(0);

  createEffect(async () => {
    const currentUser = user();
    if (currentUser && currentUser.uid) {
      try {
        const userData = await getUserData(currentUser.uid);
        if (userData) {
          setLoginStreak(userData.loginStreak || 0);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  });

  return (
    <StreakContainer>
      <StreakCount>{loginStreak()}日</StreakCount>
      <StreakLabel>連続ログイン</StreakLabel>
    </StreakContainer>
  );
};

export default LoginStreak;
