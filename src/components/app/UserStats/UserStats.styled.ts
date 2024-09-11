import { styled } from "solid-styled-components";

export const UserStatsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const StatItem = styled("div")`
  margin: 10px 0;
  font-size: 16px;

  strong {
    font-weight: bold;
  }
`;
