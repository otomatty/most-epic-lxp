import { Component, createSignal } from "solid-js";
import { DeviceStepContainer, FadeInContainer } from "./DeviceStep.styled";
import { deviceOptions } from "../../../../../data/initialSetupData";
import AnimatedMessage from "../../../../../components/common/AnimatedMessage/AnimatedMessage";
import GridSelector from "../../../../../components/app/GridSelector/GridSelector";

interface DeviceStepProps {
  device: string;
  setDevice: (value: string) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

const DeviceStep: Component<DeviceStepProps> = ({
  device,
  setDevice,
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
    setDevice(itemId);
    setIsSelected(true);
  };

  return (
    <DeviceStepContainer onClick={skipAllAnimations}>
      <AnimatedMessage
        messages={["主に使用するデバイスを教えてください"]}
        delay={0}
        skipAll={skipAllAnimations}
        onComplete={handleComplete}
      />
      {showForm() && (
        <FadeInContainer>
          <GridSelector
            items={deviceOptions.map((option) => ({
              id: option.value,
              emoji: "", // 絵文字がない場合は空文字列を使用
              text: option.label,
            }))}
            columns={2} // 2列で表示
            multiSelect={false} // 単一選択
            selectedItems={device ? [device] : []}
            onItemSelect={handleItemSelect}
          />
        </FadeInContainer>
      )}
    </DeviceStepContainer>
  );
};

export default DeviceStep;
