import { Component, createSignal, Setter } from "solid-js";
import { InterestStepContainer, FadeInContainer } from "./InterestStep.styled";
import {
  adultInterestOptions,
  studentInterestOptions,
  InterestOption,
} from "../../../../../data/initialSetupData";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import GridSelector from "../../../../../components/app/GridSelector/GridSelector";

interface InterestStepProps {
  interests: string[];
  setInterests: Setter<string[]>;
  isSelected: boolean; // この行を追加
  setIsSelected: Setter<boolean>;
  occupation: string;
  isStudent: boolean;
}

const InterestStep: Component<InterestStepProps> = ({
  interests,
  setInterests,
  setIsSelected,
  occupation,
  isStudent,
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

  const toggleInterest = (itemId: string) => {
    console.log("Toggling interest:", itemId);
    setInterests((prevInterests) => {
      const updatedInterests = prevInterests.includes(itemId)
        ? prevInterests.filter((i) => i !== itemId)
        : [...prevInterests, itemId];
      console.log("Updated interests:", updatedInterests);
      setIsSelected(updatedInterests.length > 0);
      return updatedInterests;
    });
  };

  const getMessage = () => {
    if (isStudent) {
      return "これから一緒に頑張りましょう！";
    } else {
      return `${occupation}ですね！`;
    }
  };

  const interestOptions: InterestOption[] = isStudent
    ? studentInterestOptions
    : adultInterestOptions;

  console.log("Current interests:", interests); // デバッグ用

  return (
    <InterestStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={[
          getMessage(),
          "次に興味のあるテーマを選んでください",
          "3つまで選択できます",
        ]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <GridSelector
            items={interestOptions.map((option) => ({
              id: option.id,
              emoji: option.emoji,
              text: option.label,
            }))}
            columns={3}
            multiSelect={true}
            maxSelections={3} // 最大選択数を3に設定
            selectedItems={interests}
            onItemSelect={toggleInterest}
          />
        </FadeInContainer>
      )}
    </InterestStepContainer>
  );
};

export default InterestStep;
