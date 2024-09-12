import { Component } from "solid-js";
import {
  RadioButtonContainer,
  RadioInput,
  RadioLabel,
} from "./RadioButton.styled";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: Component<RadioButtonProps> = (props) => {
  return (
    <RadioButtonContainer>
      <RadioInput
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={() => props.onChange(props.value)}
      />
      <RadioLabel for={props.id}>{props.label}</RadioLabel>
    </RadioButtonContainer>
  );
};

export default RadioButton;
