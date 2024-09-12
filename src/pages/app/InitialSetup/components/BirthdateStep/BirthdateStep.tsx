import { Component, createSignal } from "solid-js";
import {
  BirthdateStepContainer,
  BirthdateInput,
  RadioButtonGroup,
  FadeInContainer,
} from "./BirthdateStep.styled";
import RadioButton from "../../../../../components/common/RadioButton/RadioButton";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";

interface BirthdateStepProps {
  birthdate: string;
  setBirthdate: (value: string) => void;
  setIsSelected: (value: boolean) => void;
  privacyLevel: string;
  setPrivacyLevel: (value: string) => void;
  name: string;
}

const BirthdateStep: Component<BirthdateStepProps> = ({
  birthdate,
  setBirthdate,
  setIsSelected,
  privacyLevel,
  setPrivacyLevel,
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
    }, 500);
  };

  const handleInputChange = (e: Event) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setBirthdate(value);
    setIsSelected(!!value);
  };

  const handlePrivacyChange = (value: string) => {
    setPrivacyLevel(value);
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
          "誕生日の公開範囲も選択してください",
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
          <RadioButtonGroup>
            <RadioButton
              id="public"
              name="privacyLevel"
              value="public"
              label="一般公開"
              checked={privacyLevel === "public"}
              onChange={handlePrivacyChange}
            />
            <RadioButton
              id="followers"
              name="privacyLevel"
              value="followers"
              label="フォロワー限定公開"
              checked={privacyLevel === "followers"}
              onChange={handlePrivacyChange}
            />
            <RadioButton
              id="friends"
              name="privacyLevel"
              value="friends"
              label="フレンド限定公開"
              checked={privacyLevel === "friends"}
              onChange={handlePrivacyChange}
            />
            <RadioButton
              id="private"
              name="privacyLevel"
              value="private"
              label="公開しない"
              checked={privacyLevel === "private"}
              onChange={handlePrivacyChange}
            />
          </RadioButtonGroup>
        </FadeInContainer>
      )}
    </BirthdateStepContainer>
  );
};

export default BirthdateStep;
