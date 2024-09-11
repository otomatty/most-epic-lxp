import { Component, createSignal } from "solid-js";
import {
  BirthdateStepContainer,
  BirthdateInput,
  ToggleContainer,
  ToggleLabel,
  FadeInContainer,
} from "./BirthdateStep.styled";
import ToggleSwitch from "../../../../../components/common/ToggleSwitch/ToggleSwitch";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";

interface BirthdateStepProps {
  birthdate: string;
  setBirthdate: (value: string) => void;
  setIsSelected: (value: boolean) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  name: string;
}

const BirthdateStep: Component<BirthdateStepProps> = ({
  birthdate,
  setBirthdate,
  setIsSelected,
  isPublic,
  setIsPublic,
  name,
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
    }, 500); // 500msのタイムラグを追加
  };

  const handleInputChange = (e: Event) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setBirthdate(value);
    setIsSelected(!!value);
  };

  const handleToggleChange = (checked: boolean) => {
    setIsPublic(checked);
  };

  setTimeout(() => {
    if (!skip()) {
      setShowForm(true);
    }
  }, 6000);

  return (
    <BirthdateStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={[
          `ようこそ${name}さん！`,
          "次にあなたの誕生日を教えていただけますか？",
        ]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <BirthdateInput
            type="date"
            value={birthdate}
            onInput={handleInputChange}
            min="1930-01-01"
            max="9999-12-31"
            required
          />
          <ToggleContainer>
            <ToggleLabel>生年月日を公開する</ToggleLabel>
            <ToggleSwitch checked={isPublic} onChange={handleToggleChange} />
          </ToggleContainer>
        </FadeInContainer>
      )}
    </BirthdateStepContainer>
  );
};

export default BirthdateStep;
