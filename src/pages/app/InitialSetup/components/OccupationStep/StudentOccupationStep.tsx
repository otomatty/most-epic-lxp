import { Component, createSignal } from "solid-js";
import {
  OccupationStepContainer,
  RadioButtonGroup,
  FadeInContainer,
} from "./OccupationStep.styled";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import RadioButton from "../../../../../components/common/RadioButton/RadioButton";

interface StudentOccupationStepProps {
  birthdate: string;
  isStudent: boolean;
  setIsStudent: (value: boolean) => void;
  setIsSelected: (value: boolean) => void;
}

const StudentOccupationStep: Component<StudentOccupationStepProps> = ({
  birthdate,
  isStudent,
  setIsStudent,
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

  const birthdateMessage = `${new Date(birthdate).getMonth() + 1}月${new Date(
    birthdate
  ).getDate()}日生まれですね！`;

  const today = new Date();
  const isBirthday =
    today.getMonth() === new Date(birthdate).getMonth() &&
    today.getDate() === new Date(birthdate).getDate();

  const messages = isBirthday
    ? [birthdateMessage, "誕生日おめでとうございます！", "今は学生ですか？"]
    : [birthdateMessage, "今は学生ですか？"];

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
            <RadioButton
              id="student-yes"
              name="isStudent"
              value="yes"
              label="はい"
              checked={isStudent}
              onChange={() => {
                setIsStudent(true);
                setIsSelected(true);
              }}
            />
            <RadioButton
              id="student-no"
              name="isStudent"
              value="no"
              label="いいえ"
              checked={!isStudent}
              onChange={() => {
                setIsStudent(false);
                setIsSelected(true);
              }}
            />
          </RadioButtonGroup>
        </FadeInContainer>
      )}
    </OccupationStepContainer>
  );
};

export default StudentOccupationStep;
