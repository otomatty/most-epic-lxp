// src/hooks/useAuthState.ts
import { createSignal, onCleanup } from "solid-js";
import { auth } from "./../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuthState() {
  const [user, setUser] = createSignal<User | null>(null);

  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
  });

  onCleanup(() => unsubscribe());

  return [user];
}
