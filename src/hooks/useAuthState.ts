// src/hooks/useAuthState.ts
import { createSignal, onCleanup } from "solid-js";
import { auth } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { performDailyCheckin } from "../services/userService";

export function useAuthState() {
  const [user, setUser] = createSignal<User | null>(null);
  const [isLoading, setIsLoading] = createSignal(true);
  const [showXpPopup, setShowXpPopup] = createSignal(false);
  const [xpGained, setXpGained] = createSignal(0);

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    setUser(firebaseUser);
    if (firebaseUser) {
      try {
        const xp = await performDailyCheckin(firebaseUser.uid);
        if (xp > 0) {
          setXpGained(xp);
          setShowXpPopup(true);
        }
      } catch (error) {
        console.error("デイリーチェックインに失敗しました:", error);
      }
    }
    setIsLoading(false);
  });

  onCleanup(() => unsubscribe());

  return {
    user,
    isLoading,
    showXpPopup,
    xpGained,
    closeXpPopup: () => setShowXpPopup(false),
  };
}
