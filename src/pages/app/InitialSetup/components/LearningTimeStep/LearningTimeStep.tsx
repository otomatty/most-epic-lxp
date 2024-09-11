import { Component } from "solid-js";
import {
  LearningTimeStepContainer,
  LearningTimeStepSelect,
} from "./LearningTimeStep.styled";
import { learningTimeOptions } from "../../../../../data/initialSetupData";

interface LearningTimeStepProps {
  learningTime: string;
  setLearningTime: (value: string) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const LearningTimeStep: Component<LearningTimeStepProps> = ({
  learningTime,
  setLearningTime,
  isSelected,
  setIsSelected,
}) => {
  const handleSelect = (e: Event) => {
    const value = (e.currentTarget as HTMLSelectElement).value;
    setLearningTime(value);
    setIsSelected(!!value);
  };

  return (
    <LearningTimeStepContainer>
      <LearningTimeStepSelect
        value={learningTime}
        onInput={handleSelect}
        required
      >
        <option value="">選択してください</option>
        {learningTimeOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </LearningTimeStepSelect>
    </LearningTimeStepContainer>
  );
};

export default LearningTimeStep;
