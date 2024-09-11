import { styled } from "solid-styled-components";

export const LoginContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginForm = styled("form")`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
`;

export const GoogleButton = styled("button")`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #357ae8;
  }
`;
