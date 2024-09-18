import { styled } from "solid-styled-components";

export const FAQSectionContainer = styled("section")`
  padding: 4rem 2rem;
  background-color: #ffffff;
`;

export const FAQList = styled("div")`
  max-width: 800px;
  margin: 2rem auto 0;
`;

export const FAQItem = styled("div")`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Question = styled("h3")`
  margin-bottom: 0.5rem;
  color: #333;
`;

export const Answer = styled("p")`
  margin-left: 1rem;
  color: #666;
`;
