import { Component } from "solid-js";
import {
  LearningGoalStepContainer,
  LearningGoalStepSelect,
} from "./LearningGoalStep.styled";
import { learningGoalOptions } from "../../../../../data/initialSetupData";

interface LearningGoalStepProps {
  learningGoal: string;
  setLearningGoal: (value: string) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const LearningGoalStep: Component<LearningGoalStepProps> = ({
  learningGoal,
  setLearningGoal,
  isSelected,
  setIsSelected,
}) => {
  const handleSelect = (e: Event) => {
    const value = (e.currentTarget as HTMLSelectElement).value;
    setLearningGoal(value);
    setIsSelected(!!value);
  };

  return (
    <LearningGoalStepContainer>
      <LearningGoalStepSelect
        value={learningGoal}
        onInput={handleSelect}
        required
      >
        <option value="">選択してください</option>
        {learningGoalOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </LearningGoalStepSelect>
    </LearningGoalStepContainer>
  );
};

export default LearningGoalStep;
