import { styled } from "solid-styled-components";

export const LearningGoalStepContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const LearningGoalStepLabel = styled("label")`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const LearningGoalStepSelect = styled("select")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
`;

export const LearningGoalStepButton = styled("button")`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
