import { Component, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { auth, firestore } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import {
  InitialSetupContainer,
  InitialSetupForm,
  ProgressBarContainer,
  ProgressBar,
  Progress,
  InitialSetupButton,
  BackButton,
} from "./InitialSetup.styled";
import WelcomeStep from "./components/WelcomeStep/WelcomeStep";
import NameStep from "./components/NameStep/NameStep";
import BirthdateStep from "./components/BirthdateStep/BirthdateStep";
import StudentOccupationStep from "./components/OccupationStep/StudentOccupationStep";
import AdultOccupationStep from "./components/OccupationStep/AdultOccupationStep";
import InterestStep from "./components/InterestStep/InterestStep";
import LearningGoalStep from "./components/LearningGoalStep/LearningGoalStep";
import LearningStyleStep from "./components/LearningStyleStep/LearningStyleStep";
import LearningTimeStep from "./components/LearningTimeStep/LearningTimeStep";
import DeviceStep from "./components/DeviceStep/DeviceStep";
import ConfirmationStep from "./components/ConfirmationStep/ConfirmationStep";

const InitialSetup: Component = () => {
  const [step, setStep] = createSignal(0);
  const [name, setName] = createSignal("");
  const [birthdate, setBirthdate] = createSignal("");
  const [isPublic, setIsPublic] = createSignal(false);
  const [occupation, setOccupation] = createSignal("");
  const [isStudent, setIsStudent] = createSignal(false);
  const [interests, setInterests] = createSignal<string[]>([]);
  const [learningGoal, setLearningGoal] = createSignal("");
  const [learningStyle, setLearningStyle] = createSignal("");
  const [learningTime, setLearningTime] = createSignal("");
  const [device, setDevice] = createSignal("");
  const [isSelected, setIsSelected] = createSignal(false);
  const [progress, setProgress] = createSignal(0);
  const navigate = useNavigate();
  const [isMinor, setIsMinor] = createSignal(false);
  const [privacyLevel, setPrivacyLevel] = createSignal("private"); // デフォルトを "private" に設定

  const user = auth.currentUser;
  const googleName = user?.displayName || null;

  createEffect(() => {
    const birthYear = new Date(birthdate()).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    setIsMinor(age <= 18);
  });

  createEffect(() => {
    setProgress((step() / 10) * 100); // 10ステップに変更
  });

  const handleNextStep = () => {
    if (step() === 1 && !name()) {
      return; // 名前が設定されていない場合は次のステップに進まない
    }
    setStep(step() + 1);
    setIsSelected(false);
  };

  const handlePreviousStep = () => {
    setStep(step() - 1);
    setIsSelected(true);
  };

  const handleInitialSetup = async (e: Event) => {
    e.preventDefault();
    if (user) {
      try {
        await updateDoc(doc(firestore, "users", user.uid), {
          name: name(),
          birthdate: birthdate(),
          isPublic: isPublic(),
          occupation: occupation(),
          isStudent: isStudent(),
          interests: interests(),
          learningGoal: learningGoal(),
          learningStyle: learningStyle(),
          learningTime: learningTime(),
          device: device(),
        });
        setProgress(100);
        setTimeout(() => {
          alert("初期設定が完了しました。");
          navigate("/webapp/dashboard");
        }, 500); // 0.5秒後に遷移
      } catch (error) {
        console.error("初期設定に失敗しました:", error);
        alert("初期設定失敗しました。");
      }
    }
  };

  const handleConfirm = async () => {
    if (user) {
      try {
        await updateDoc(doc(firestore, "users", user.uid), {
          name: name(),
          birthdate: birthdate(),
          privacyLevel: privacyLevel(),
          occupation: occupation(),
          isStudent: isStudent(),
          interests: interests(),
          learningGoal: learningGoal(),
          learningStyle: learningStyle(),
          learningTime: learningTime(),
          device: device(),
        });
        setProgress(100);
        setTimeout(() => {
          alert("初期設定が完了しました。");
          navigate("/webapp/dashboard");
        }, 500); // 0.5秒後に遷移
      } catch (error) {
        console.error("初期設定に失敗しました:", error);
        alert("初期設定に失敗しました。");
      }
    }
  };

  return (
    <InitialSetupContainer>
      {step() > 0 && (
        <ProgressBarContainer>
          {step() > 1 && (
            <BackButton type="button" onClick={handlePreviousStep}>
              ←
            </BackButton>
          )}
          <ProgressBar>
            <Progress progress={progress()} />
          </ProgressBar>
        </ProgressBarContainer>
      )}
      <InitialSetupForm onSubmit={(e) => e.preventDefault()}>
        {step() === 0 && <WelcomeStep handleNextStep={handleNextStep} />}
        {step() === 1 && (
          <NameStep
            name={name()}
            setName={setName}
            setIsSelected={setIsSelected}
            googleName={googleName}
          />
        )}
        {step() === 2 && (
          <BirthdateStep
            birthdate={birthdate()}
            setBirthdate={setBirthdate}
            setIsSelected={setIsSelected}
            privacyLevel={privacyLevel()}
            setPrivacyLevel={setPrivacyLevel}
            name={name()}
          />
        )}
        {step() === 3 && isMinor() ? (
          <StudentOccupationStep
            birthdate={birthdate()}
            isStudent={isStudent()}
            setIsStudent={setIsStudent}
            setIsSelected={setIsSelected}
          />
        ) : step() === 3 ? (
          <AdultOccupationStep
            birthdate={birthdate()}
            occupation={occupation()}
            setOccupation={setOccupation}
            setIsSelected={setIsSelected}
          />
        ) : null}
        {step() === 4 && (
          <InterestStep
            interests={interests()}
            setInterests={setInterests}
            isSelected={isSelected()}
            setIsSelected={setIsSelected}
            occupation={occupation()}
            isStudent={isStudent()}
          />
        )}
        {step() === 5 && (
          <LearningGoalStep
            learningGoal={learningGoal()}
            setLearningGoal={setLearningGoal}
            isSelected={isSelected()}
            setIsSelected={setIsSelected}
          />
        )}
        {step() === 6 && (
          <LearningStyleStep
            learningStyle={learningStyle()}
            setLearningStyle={setLearningStyle}
            isSelected={isSelected()}
            setIsSelected={setIsSelected}
          />
        )}
        {step() === 7 && (
          <LearningTimeStep
            learningTime={learningTime()}
            setLearningTime={setLearningTime}
            isSelected={isSelected()}
            setIsSelected={setIsSelected}
          />
        )}
        {step() === 8 && (
          <DeviceStep
            device={device()}
            setDevice={setDevice}
            isSelected={isSelected()}
            setIsSelected={setIsSelected}
          />
        )}
        {step() === 9 && (
          <ConfirmationStep
            name={name()}
            birthdate={birthdate()}
            privacyLevel={privacyLevel()}
            occupation={occupation()}
            interests={interests()}
            learningGoal={learningGoal()}
            learningStyle={learningStyle()}
            learningTime={learningTime()}
            device={device()}
            onConfirm={handleConfirm}
          />
        )}
        {step() < 9 && step() > 0 && (
          <InitialSetupButton
            type="button"
            onClick={handleNextStep}
            disabled={!isSelected() && step() > 1}
          >
            次へ
          </InitialSetupButton>
        )}
      </InitialSetupForm>
    </InitialSetupContainer>
  );
};

export default InitialSetup;
