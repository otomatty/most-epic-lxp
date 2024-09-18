import { styled } from "solid-styled-components";

export const FeaturesSectionContainer = styled("section")`
  padding: 4rem 2rem;
  background-color: #ffffff;
`;

export const FeaturesList = styled("div")`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const FeatureItem = styled("div")`
  flex-basis: 45%;
  margin-bottom: 2rem;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureEmoji = styled("div")`
  font-size: 3rem;
  margin-bottom: 1rem;
`;
