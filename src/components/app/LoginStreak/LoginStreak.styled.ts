import { styled } from "solid-styled-components";

export const StreakContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StreakCount = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
`;

export const StreakLabel = styled.span`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;
