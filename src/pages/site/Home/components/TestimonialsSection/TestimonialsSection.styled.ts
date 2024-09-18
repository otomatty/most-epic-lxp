import { styled } from "solid-styled-components";

export const TestimonialsSectionContainer = styled("section")`
  padding: 4rem 2rem;
  background-color: #f0f4f8;
`;

export const TestimonialsList = styled("div")`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const TestimonialItem = styled("div")`
  flex-basis: 30%;
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TestimonialQuote = styled("p")`
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
`;
