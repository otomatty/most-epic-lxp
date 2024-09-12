import { Component, createSignal } from "solid-js";
import {
  LearningGoalStepContainer,
  FadeInContainer,
} from "./LearningGoalStep.styled";
import { learningGoalOptions } from "../../../../../data/initialSetupData";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import GridSelector from "../../../../../components/app/GridSelector/GridSelector";

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

  const handleItemSelect = (itemId: string) => {
    setLearningGoal(itemId);
    setIsSelected(true);
  };

  return (
    <LearningGoalStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={["次は学ぶ目的を教えてください"]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <GridSelector
            items={learningGoalOptions.map((option) => ({
              id: option.value,
              emoji: "", // 絵文字がない場合は空文字列を使用
              text: option.label,
            }))}
            columns={2} // 2列で表示
            multiSelect={false} // 単一選択
            selectedItems={learningGoal ? [learningGoal] : []}
            onItemSelect={handleItemSelect}
          />
        </FadeInContainer>
      )}
    </LearningGoalStepContainer>
  );
};

export default LearningGoalStep;
