import { Component } from "solid-js";
import { DeviceStepContainer, DeviceStepSelect } from "./DeviceStep.styled";
import { deviceOptions } from "../../../../../data/initialSetupData";

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
  const handleSelect = (e: Event) => {
    const value = (e.currentTarget as HTMLSelectElement).value;
    setDevice(value);
    setIsSelected(!!value);
  };

  return (
    <DeviceStepContainer>
      <DeviceStepSelect value={device} onInput={handleSelect} required>
        <option value="">選択してください</option>
        {deviceOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </DeviceStepSelect>
    </DeviceStepContainer>
  );
};

export default DeviceStep;
