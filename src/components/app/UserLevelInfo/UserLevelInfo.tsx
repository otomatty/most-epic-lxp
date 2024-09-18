import { Component, createSignal, createEffect } from "solid-js";
import { useAuthState } from "../../../hooks/useAuthState";
import { getUserData } from "../../../services/userService";
import {
  UserLevelInfoContainer,
  LevelDisplay,
  XpBar,
  XpFill,
  XpText,
} from "./UserLevelInfo.styled";

const UserLevelInfo: Component = () => {
  const { user } = useAuthState();
  const [userLevel, setUserLevel] = createSignal(1);
  const [userXp, setUserXp] = createSignal(0);
  const [xpToNextLevel, setXpToNextLevel] = createSignal(100);

  createEffect(async () => {
    const currentUser = user();
    if (currentUser && currentUser.uid) {
      try {
        const userData = await getUserData(currentUser.uid);
        if (userData) {
          setUserLevel(userData.userLevel || 1);
          setUserXp(userData.userXp || 0);
          setXpToNextLevel(calculateXpToNextLevel(userData.userLevel || 1));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  });

  const calculateXpToNextLevel = (level: number) => {
    // この計算式は仮のものです。実際のゲームバランスに合わせて調整してください。
    return level * 100;
  };

  const xpProgress = () => (userXp() / xpToNextLevel()) * 100;

  return (
    <UserLevelInfoContainer>
      <LevelDisplay>レベル {userLevel()}</LevelDisplay>
      <XpBar>
        <XpFill style={{ width: `${xpProgress()}%` }} />
      </XpBar>
      <XpText>
        {userXp()} / {xpToNextLevel()} XP
      </XpText>
    </UserLevelInfoContainer>
  );
};

export default UserLevelInfo;
