import { styled, keyframes } from "solid-styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const OccupationStepContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const OccupationInput = styled("input")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
`;

export const FadeInContainer = styled("div")`
  animation: ${fadeIn} 1s ease-in-out;
  width: 100%;
`;

export const ButtonGroup = styled("div")`
  display: flex;
  gap: 10px;
`;

export const SelectButton = styled("button")`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &.selected {
    background-color: #0056b3;
  }
`;

export const RadioButtonGroup = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const RadioButton = styled("input")`
  margin-right: 10px;
`;

export const RadioLabel = styled("label")`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;
