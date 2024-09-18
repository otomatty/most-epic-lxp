import { styled } from "solid-styled-components";

export const LearningExperienceSectionContainer = styled("section")`
  padding: 4rem 2rem;
  background-color: #f0f4f8;
`;

export const ExperienceDescription = styled("p")`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 2rem auto 0;
  line-height: 1.6;
  text-align: center;
`;

export const ExperienceList = styled("ul")`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const ExperienceItem = styled("li")`
  flex-basis: 45%;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;

  span {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;
