import { Component } from "solid-js";
import {
  LearningStyleStepContainer,
  LearningStyleStepSelect,
} from "./LearningStyleStep.styled";
import { learningStyleOptions } from "../../../../../data/initialSetupData";

interface LearningStyleStepProps {
  learningStyle: string;
  setLearningStyle: (value: string) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const LearningStyleStep: Component<LearningStyleStepProps> = ({
  learningStyle,
  setLearningStyle,
  isSelected,
  setIsSelected,
}) => {
  const handleSelect = (e: Event) => {
    const value = (e.currentTarget as HTMLSelectElement).value;
    setLearningStyle(value);
    setIsSelected(!!value);
  };

  return (
    <LearningStyleStepContainer>
      <LearningStyleStepSelect
        value={learningStyle}
        onInput={handleSelect}
        required
      >
        <option value="">選択してください</option>
        {learningStyleOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </LearningStyleStepSelect>
    </LearningStyleStepContainer>
  );
};

export default LearningStyleStep;
