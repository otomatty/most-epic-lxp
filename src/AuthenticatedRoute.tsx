// src/AuthenticatedRoute.tsx
import { useNavigate } from "@solidjs/router";
import { useAuthState } from "./hooks/useAuthState";
import { Show } from "solid-js";

export default function AuthenticatedRoute(props: { children: any }) {
  const [user] = useAuthState();
  const navigate = useNavigate();

  if (!user()) {
    navigate("/login", { replace: true });
    return null;
  }

  return <Show when={user()}>{props.children}</Show>;
}
