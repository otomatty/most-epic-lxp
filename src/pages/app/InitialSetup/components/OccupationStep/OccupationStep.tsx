import { Component, createSignal, createEffect } from "solid-js";
import {
  OccupationStepContainer,
  OccupationInput,
  FadeInContainer,
} from "./OccupationStep.styled";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";

interface OccupationStepProps {
  birthdate: string;
  occupation: string;
  setOccupation: (value: string) => void;
  isStudent: boolean;
  setIsStudent: (value: boolean) => void;
  setIsSelected: (value: boolean) => void;
}

const OccupationStep: Component<OccupationStepProps> = ({
  birthdate,
  occupation,
  setOccupation,
  isStudent,
  setIsStudent,
  setIsSelected,
}) => {
  const [showForm, setShowForm] = createSignal(false);
  const [skip, setSkip] = createSignal(false);
  const [isMinor, setIsMinor] = createSignal(false);

  const skipAllAnimations = () => {
    setSkip(true);
    setShowForm(true);
  };

  const handleComplete = () => {
    setTimeout(() => {
      setShowForm(true);
    }, 500); // 500msのタイムラグを追加
  };

  const handleInputChange = (e: Event) => {
    setOccupation((e.currentTarget as HTMLInputElement).value);
    setIsSelected(true);
  };

  const handleToggleChange = (e: Event) => {
    setIsStudent((e.currentTarget as HTMLInputElement).checked);
    setIsSelected(true);
  };

  createEffect(() => {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    setIsMinor(age <= 18);
  });

  return (
    <OccupationStepContainer onClick={skipAllAnimations}>
      {isMinor() ? (
        <AnimatedMessage
          messages={["学生ですか？"]}
          delay={0}
          skipAll={skipAllAnimations}
          onComplete={handleComplete}
        />
      ) : (
        <AnimatedMessage
          messages={["次に、あなたの職業を教えてください"]}
          delay={0}
          skipAll={skipAllAnimations}
          onComplete={handleComplete}
        />
      )}
      {showForm() && (
        <FadeInContainer>
          {isMinor() ? (
            <div>
              <input
                type="checkbox"
                checked={isStudent}
                onChange={handleToggleChange}
              />
              はい
              <input
                type="checkbox"
                checked={!isStudent}
                onChange={() => {
                  setIsStudent(false);
                  setIsSelected(true);
                }}
              />
              いいえ
            </div>
          ) : (
            <OccupationInput
              type="text"
              value={occupation}
              onInput={handleInputChange}
              required
            />
          )}
        </FadeInContainer>
      )}
    </OccupationStepContainer>
  );
};

export default OccupationStep;
