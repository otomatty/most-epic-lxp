import { Component, createSignal, createEffect } from "solid-js";
import {
  ToggleSwitchContainer,
  ToggleSwitchInput,
  ToggleSwitchLabel,
} from "./ToggleSwitch.styled";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: Component<ToggleSwitchProps> = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = createSignal(checked);

  createEffect(() => {
    setIsChecked(checked);
  });

  const handleChange = () => {
    const newChecked = !isChecked();
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <ToggleSwitchContainer>
      <ToggleSwitchInput
        type="checkbox"
        checked={isChecked()}
        onChange={handleChange}
      />
      <ToggleSwitchLabel onClick={handleChange} />
    </ToggleSwitchContainer>
  );
};

export default ToggleSwitch;
