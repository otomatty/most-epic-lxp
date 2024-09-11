import { Component, createSignal, createEffect } from "solid-js";
import {
  NameStepContainer,
  NameInput,
  FadeInContainer,
} from "./NameStep.styled";
import ToggleSwitch from "../../../../../components/common/ToggleSwitch/ToggleSwitch";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";

interface NameStepProps {
  name: string;
  setName: (value: string) => void;
  setIsSelected: (value: boolean) => void;
  googleName: string | null;
}

const NameStep: Component<NameStepProps> = ({
  name,
  setName,
  setIsSelected,
  googleName,
}) => {
  const [useGoogleName, setUseGoogleName] = createSignal(!!googleName);
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
    setName((e.currentTarget as HTMLInputElement).value);
  };

  const handleToggleChange = (checked: boolean) => {
    setUseGoogleName(checked);
    if (checked && googleName) {
      setName(googleName);
    } else {
      setName("");
    }
  };

  createEffect(() => {
    setIsSelected(!!name);
  });

  createEffect(() => {
    if (useGoogleName() && googleName) {
      setName(googleName);
    }
  });

  return (
    <NameStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={[
          "まずはあなたのことを教えてください",
          "お名前を教えていただけますか？",
        ]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          {googleName && (
            <div>
              <ToggleSwitch
                checked={useGoogleName()}
                onChange={handleToggleChange}
              />
              <span>Googleアカウントの名前を使用する ({googleName})</span>
            </div>
          )}
          <NameInput
            type="text"
            value={useGoogleName() ? googleName || "" : name}
            onInput={handleInputChange}
            disabled={useGoogleName()}
            required
          />
        </FadeInContainer>
      )}
    </NameStepContainer>
  );
};

export default NameStep;
