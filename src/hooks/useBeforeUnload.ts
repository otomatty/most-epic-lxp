import { onCleanup } from "solid-js";

export function useBeforeUnload(message: string) {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = message;
    return message;
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  onCleanup(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });
}
