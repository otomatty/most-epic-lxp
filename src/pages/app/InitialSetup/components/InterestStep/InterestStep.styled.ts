import { styled, keyframes } from "solid-styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const InterestStepContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const FadeInContainer = styled("div")`
  animation: ${fadeIn} 1s ease-in-out;
  width: 100%;
`;

export const InterestCardContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 100%;
`;

export const InterestCard = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border-color: #007bff;
    background-color: #e6f2ff;
  }
`;

export const CardEmoji = styled("span")`
  font-size: 36px;
  margin-bottom: 8px;
`;

export const CardTitle = styled("span")`
  font-size: 14px;
  text-align: center;
`;

export const CheckMark = styled("span")`
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #007bff;
  font-size: 18px;
`;
