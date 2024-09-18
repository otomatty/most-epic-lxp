import { styled } from "solid-styled-components";

export const StatsSectionContainer = styled("section")`
  padding: 4rem 2rem;
  background-color: #ffffff;
`;

export const StatsList = styled("div")`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const StatItem = styled("div")`
  flex-basis: 22%;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StatEmoji = styled("div")`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;
