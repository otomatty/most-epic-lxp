import { styled } from "solid-styled-components";

export const InitialSetupContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const InitialSetupForm = styled("form")`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  gap: 1rem;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const InitialSetupSelect = styled("select")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const InitialSetupButton = styled("button")`
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

export const BackButton = styled("button")`
  background: none;
  border: none;
  color: #007bff;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: #0056b3;
  }
`;

export const ProgressBarContainer = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-bottom: 20px;
`;

export const ProgressBar = styled("div")`
  flex-grow: 1;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
`;

export const Progress = styled("div")<{ progress: number }>`
  height: 100%;
  background-color: #007bff;
  width: ${(props) => props.progress}%;
  transition: width 0.3s;
`;
