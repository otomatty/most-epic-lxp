import { Component, createSignal } from "solid-js";
import {
  LearningStyleStepContainer,
  FadeInContainer,
} from "./LearningStyleStep.styled";
import { learningStyleOptions } from "../../../../../data/initialSetupData";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import GridSelector from "../../../../../components/app/GridSelector/GridSelector";

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
    setLearningStyle(itemId);
    setIsSelected(true);
  };

  return (
    <LearningStyleStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={["次はあなたの学習スタイルを教えてください"]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <GridSelector
            items={learningStyleOptions.map((option) => ({
              id: option.value,
              emoji: "", // 絵文字がない場合は空文字列を使用
              text: option.label,
            }))}
            columns={2} // 2列で表示
            multiSelect={false} // 単一選択
            selectedItems={learningStyle ? [learningStyle] : []}
            onItemSelect={handleItemSelect}
          />
        </FadeInContainer>
      )}
    </LearningStyleStepContainer>
  );
};

export default LearningStyleStep;
