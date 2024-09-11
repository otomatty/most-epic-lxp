import { styled } from "solid-styled-components";

export const ResetPasswordContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ResetPasswordForm = styled("form")`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
`;

export const ResetButton = styled("button")`
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
`;
