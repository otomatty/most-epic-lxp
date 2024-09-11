import { styled } from "solid-styled-components";

export const ToggleSwitchContainer = styled("div")`
  display: flex;
  align-items: center;
`;

export const ToggleSwitchInput = styled("input")`
  display: none;

  &:checked + label {
    background-color: #007bff;
  }

  &:checked + label::after {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }
`;

export const ToggleSwitchLabel = styled("label")`
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &::after {
    content: "";
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: left 0.3s;
  }
`;
