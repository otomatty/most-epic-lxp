import { Component } from "solid-js";
import {
  InterestStepContainer,
  InterestStepSelect,
} from "./InterestStep.styled";
import { interestOptions } from "../../../../../data/initialSetupData";

interface InterestStepProps {
  interest: string;
  setInterest: (value: string) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const InterestStep: Component<InterestStepProps> = ({
  interest,
  setInterest,
  isSelected,
  setIsSelected,
}) => {
  const handleSelect = (e: Event) => {
    const value = (e.currentTarget as HTMLSelectElement).value;
    setInterest(value);
    setIsSelected(!!value);
  };

  return (
    <InterestStepContainer>
      <InterestStepSelect value={interest} onInput={handleSelect} required>
        <option value="">選択してください</option>
        {interestOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </InterestStepSelect>
    </InterestStepContainer>
  );
};

export default InterestStep;
