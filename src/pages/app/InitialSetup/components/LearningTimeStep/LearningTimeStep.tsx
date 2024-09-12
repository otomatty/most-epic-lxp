import { Component, createSignal } from "solid-js";
import {
  LearningTimeStepContainer,
  FadeInContainer,
} from "./LearningTimeStep.styled";
import { learningTimeOptions } from "../../../../../data/initialSetupData";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import GridSelector from "../../../../../components/app/GridSelector/GridSelector";

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
    setLearningTime(itemId);
    setIsSelected(true);
  };

  return (
    <LearningTimeStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={["1日の学習時間はどのくらいですか？"]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <GridSelector
            items={learningTimeOptions.map((option) => ({
              id: option.value,
              emoji: "", // 絵文字がない場合は空文字列を使用
              text: option.label,
            }))}
            columns={2} // 2列で表示
            multiSelect={false} // 単一選択
            selectedItems={learningTime ? [learningTime] : []}
            onItemSelect={handleItemSelect}
          />
        </FadeInContainer>
      )}
    </LearningTimeStepContainer>
  );
};

export default LearningTimeStep;
