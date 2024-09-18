import { styled } from "solid-styled-components";

export const UserLevelInfoContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const LevelDisplay = styled.h3`
  font-size: 1.2em;
  margin-bottom: 8px;
`;

export const XpBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

export const XpFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
`;

export const XpText = styled.p`
  font-size: 0.9em;
  color: #666;
  margin-top: 4px;
`;
