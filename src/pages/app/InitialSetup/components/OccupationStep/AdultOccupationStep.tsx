import { Component, createSignal } from "solid-js";
import {
  OccupationStepContainer,
  RadioButtonGroup,
  OccupationInput,
  FadeInContainer,
} from "./OccupationStep.styled";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import RadioButton from "../../../../../components/common/RadioButton/RadioButton";

interface AdultOccupationStepProps {
  birthdate: string;
  occupation: string;
  setOccupation: (value: string) => void;
  setIsSelected: (value: boolean) => void;
}

const occupationOptions = [
  "会社員（正社員）",
  "会社員（契約社員・派遣社員）",
  "公務員",
  "自営業",
  "フリーランス",
  "パート・アルバイト",
  "専業主婦・主夫",
  "学生",
  "無職",
  "その他",
];

const AdultOccupationStep: Component<AdultOccupationStepProps> = ({
  birthdate,
  occupation,
  setOccupation,
  setIsSelected,
}) => {
  const [showForm, setShowForm] = createSignal(false);
  const [skip, setSkip] = createSignal(false);
  const [showOtherInput, setShowOtherInput] = createSignal(false);

  const skipAllAnimations = () => {
    setSkip(true);
    setShowForm(true);
  };

  const handleComplete = () => {
    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  const handleRadioChange = (value: string) => {
    setOccupation(value);
    setShowOtherInput(value === "その他");
    setIsSelected(true);
  };

  const handleInputChange = (e: Event) => {
    setOccupation((e.currentTarget as HTMLInputElement).value);
    setIsSelected(true);
  };

  const birthdateMessage = `${new Date(birthdate).getMonth() + 1}月${new Date(
    birthdate
  ).getDate()}日生まれですね！`;

  const today = new Date();
  const isBirthday =
    today.getMonth() === new Date(birthdate).getMonth() &&
    today.getDate() === new Date(birthdate).getDate();

  const messages = isBirthday
    ? [
        birthdateMessage,
        "誕生日おめでとうございます！",
        "ご職業は何をされていますか？",
      ]
    : [birthdateMessage, "ご職業は何をされていますか？"];

  return (
    <OccupationStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={messages}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <RadioButtonGroup>
            {occupationOptions.map((option) => (
              <RadioButton
                id={option}
                name="occupation"
                value={option}
                label={option}
                checked={occupation === option}
                onChange={handleRadioChange}
              />
            ))}
          </RadioButtonGroup>
          {showOtherInput() && (
            <OccupationInput
              type="text"
              value={occupation === "その他" ? "" : occupation}
              onInput={handleInputChange}
              placeholder="具体的な職業を入力してください"
              required
            />
          )}
        </FadeInContainer>
      )}
    </OccupationStepContainer>
  );
};

export default AdultOccupationStep;
