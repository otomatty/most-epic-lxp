import { styled, keyframes } from "solid-styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NameStepContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 左寄せ */
  width: 100%;
`;

export const NameLabel = styled("label")`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const NameInput = styled("input")`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
`;

export const FadeInContainer = styled("div")`
  animation: ${fadeIn} 1s ease-in-out; /* フェードインアニメーション */
`;
