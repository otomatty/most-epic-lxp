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
import OccupationStep from "./components/OccupationStep/OccupationStep";
import InterestStep from "./components/InterestStep/InterestStep";
import LearningGoalStep from "./components/LearningGoalStep/LearningGoalStep";
import LearningStyleStep from "./components/LearningStyleStep/LearningStyleStep";
import LearningTimeStep from "./components/LearningTimeStep/LearningTimeStep";
import DeviceStep from "./components/DeviceStep/DeviceStep";

const InitialSetup: Component = () => {
  const [step, setStep] = createSignal(0);
  const [name, setName] = createSignal("");
  const [birthdate, setBirthdate] = createSignal("");
  const [isPublic, setIsPublic] = createSignal(false);
  const [occupation, setOccupation] = createSignal("");
  const [isStudent, setIsStudent] = createSignal(false);
  const [interest, setInterest] = createSignal("");
  const [learningGoal, setLearningGoal] = createSignal("");
  const [learningStyle, setLearningStyle] = createSignal("");
  const [learningTime, setLearningTime] = createSignal("");
  const [device, setDevice] = createSignal("");
  const [isSelected, setIsSelected] = createSignal(false);
  const [progress, setProgress] = createSignal(0);
  const navigate = useNavigate();

  const user = auth.currentUser;
  const googleName = user?.displayName || null;

  createEffect(() => {
    setProgress((step() / 9) * 100);
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
          interest: interest(),
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
      <InitialSetupForm onSubmit={handleInitialSetup}>
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
            isPublic={isPublic()}
            setIsPublic={setIsPublic}
            name={name()}
          />
        )}
        {step() === 3 && (
          <OccupationStep
            birthdate={birthdate()}
            occupation={occupation()}
            setOccupation={setOccupation}
            isStudent={isStudent()}
            setIsStudent={setIsStudent}
            setIsSelected={setIsSelected}
          />
        )}
        {step() === 4 && (
          <InterestStep
            interest={interest()}
            setInterest={setInterest}
            isSelected={isSelected()}
            setIsSelected={setIsSelected}
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
        {step() < 8 && step() > 0 && (
          <InitialSetupButton
            type="button"
            onClick={handleNextStep}
            disabled={!isSelected() && step() > 1}
          >
            次へ
          </InitialSetupButton>
        )}
        {step() === 8 && (
          <InitialSetupButton type="submit" disabled={!isSelected()}>
            設定
          </InitialSetupButton>
        )}
      </InitialSetupForm>
    </InitialSetupContainer>
  );
};

export default InitialSetup;
