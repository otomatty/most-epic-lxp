import { styled } from "solid-styled-components";

export const PopupContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const XpAmount = styled.h2`
  font-size: 24px;
  margin: 0 0 8px 0;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 4px 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
