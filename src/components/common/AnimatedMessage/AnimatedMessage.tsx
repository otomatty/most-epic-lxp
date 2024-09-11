import { Component, createSignal, onMount, createEffect } from "solid-js";
import { MessageContainer, Cursor } from "./AnimatedMessage.styled";

interface AnimatedMessageProps {
  messages: string[];
  delay: number;
  keepCursor?: boolean; // カーソルを表示したままにするかどうかのフラグ
  onComplete?: () => void; // アニメーション完了時のコールバック
  skipAll?: () => void; // 全てのアニメーションをスキップするための関数
}

const AnimatedMessage: Component<AnimatedMessageProps> = ({
  messages,
  delay,
  keepCursor = false,
  onComplete,
  skipAll,
}) => {
  const [displayedMessage, setDisplayedMessage] = createSignal("");
  const [showCursor, setShowCursor] = createSignal(false);
  let interval: NodeJS.Timeout;

  const skipAnimation = () => {
    clearInterval(interval);
    setDisplayedMessage(messages.join("\n"));
    if (!keepCursor) {
      setShowCursor(false);
    }
    if (skipAll) {
      skipAll();
    }
    if (onComplete) {
      onComplete();
    }
  };

  const startAnimation = () => {
    setDisplayedMessage("");
    setShowCursor(true);
    let index = 0;
    const fullMessage = messages.join("\n");
    interval = setInterval(() => {
      setDisplayedMessage(fullMessage.slice(0, index + 1));
      index++;
      if (index === fullMessage.length) {
        clearInterval(interval);
        if (!keepCursor) {
          setShowCursor(false);
        }
        if (onComplete) {
          onComplete();
        }
      }
    }, 100);
  };

  createEffect(() => {
    console.log("Messages changed:", messages);
    setTimeout(startAnimation, delay);
  });

  return (
    <MessageContainer onClick={skipAnimation}>
      {displayedMessage()
        .split("\n")
        .map((line, i, arr) => (
          <div style={{ display: "inline" }}>
            {line}
            {showCursor() && i === arr.length - 1 && <Cursor />}
            {i < arr.length - 1 && <br />}
          </div>
        ))}
    </MessageContainer>
  );
};

export default AnimatedMessage;
