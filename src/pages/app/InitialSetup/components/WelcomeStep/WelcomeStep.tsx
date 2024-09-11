import { Component, createSignal } from "solid-js";
import {
  WelcomeStepContainer,
  StartButton,
  FadeInContainer,
} from "./WelcomeStep.styled";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";

interface WelcomeStepProps {
  handleNextStep: () => void;
}

const WelcomeStep: Component<WelcomeStepProps> = ({ handleNextStep }) => {
  const [showButton, setShowButton] = createSignal(false);
  const [skip, setSkip] = createSignal(false);
  const [showFadeIn, setShowFadeIn] = createSignal(false);

  const skipAllAnimations = () => {
    setSkip(true);
    setShowButton(true);
    setShowFadeIn(true);
  };

  const handleComplete = () => {
    setTimeout(() => {
      setShowFadeIn(true);
    }, 500); // 500msのタイムラグを追加
  };

  return (
    <WelcomeStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={[
          "Me-LXPへようこそ！",
          "これからあなたの学習をサポートするためにいくつか質問をします",
          "あなたについて教えてください",
        ]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />

      {showFadeIn() && (
        <FadeInContainer>
          <StartButton type="button" onClick={handleNextStep}>
            回答を始める
          </StartButton>
        </FadeInContainer>
      )}
    </WelcomeStepContainer>
  );
};

export default WelcomeStep;
