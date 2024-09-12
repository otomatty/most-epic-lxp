import { Component, createSignal } from "solid-js";
import {
  ConfirmationStepContainer,
  FadeInContainer,
  ConfirmationItem,
  ConfirmationLabel,
  ConfirmationValue,
  ConfirmButton,
} from "./ConfirmationStep.styled";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";

interface ConfirmationStepProps {
  name: string;
  birthdate: string;
  privacyLevel: string;
  occupation: string;
  interests: string[];
  learningGoal: string;
  learningStyle: string;
  learningTime: string;
  device: string;
  onConfirm: () => void;
}

const ConfirmationStep: Component<ConfirmationStepProps> = (props) => {
  const [showForm, setShowForm] = createSignal(false);
  const [skip, setSkip] = createSignal(false);

  const skipAllAnimations = () => {
    setSkip(true);
    setShowForm(true);
  };

  const handleComplete = () => {
    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  return (
    <ConfirmationStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={["入力内容を確認してください"]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <ConfirmationItem>
            <ConfirmationLabel>名前:</ConfirmationLabel>
            <ConfirmationValue>{props.name}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>生年月日:</ConfirmationLabel>
            <ConfirmationValue>{props.birthdate}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>生年月日の公開範囲:</ConfirmationLabel>
            <ConfirmationValue>{props.privacyLevel}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>職業:</ConfirmationLabel>
            <ConfirmationValue>{props.occupation}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>興味:</ConfirmationLabel>
            <ConfirmationValue>{props.interests.join(", ")}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>学習目的:</ConfirmationLabel>
            <ConfirmationValue>{props.learningGoal}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>学習スタイル:</ConfirmationLabel>
            <ConfirmationValue>{props.learningStyle}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>学習時間:</ConfirmationLabel>
            <ConfirmationValue>{props.learningTime}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmationItem>
            <ConfirmationLabel>使用デバイス:</ConfirmationLabel>
            <ConfirmationValue>{props.device}</ConfirmationValue>
          </ConfirmationItem>
          <ConfirmButton onClick={props.onConfirm}>確認</ConfirmButton>
        </FadeInContainer>
      )}
    </ConfirmationStepContainer>
  );
};

export default ConfirmationStep;
