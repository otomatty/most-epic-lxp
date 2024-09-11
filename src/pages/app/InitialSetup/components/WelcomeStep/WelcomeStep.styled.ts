import { styled, keyframes } from "solid-styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const WelcomeStepContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 左寄せ */
  width: 100%;
`;

export const StartButton = styled("button")`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

export const FadeInContainer = styled("div")`
  animation: ${fadeIn} 1s ease-in-out; /* フェードインアニメーション */
`;
