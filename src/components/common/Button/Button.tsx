import { Component } from "solid-js";
import { ButtonStyled } from "./Button.styled";

interface ButtonProps {
  onClick: () => void;
  children: any;
  disabled?: boolean;
}

const Button: Component<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
