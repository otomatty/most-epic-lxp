import { Component, createSignal, createEffect, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/config";

const ProtectedRoute: Component<{ component: Component }> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = createSignal<boolean | null>(null);

  createEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  });

  return (
    <Show when={isLoggedIn() !== null}>
      {isLoggedIn() ? props.component : <Navigate href="/login" />}
    </Show>
  );
};

export default ProtectedRoute;
