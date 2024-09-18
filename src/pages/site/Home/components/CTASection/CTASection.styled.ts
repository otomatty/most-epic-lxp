import { styled } from "solid-styled-components";

export const CTASectionContainer = styled("section")`
  padding: 4rem 2rem;
  background-color: #f0f4f8;
  text-align: center;
`;

export const CTADescription = styled("p")`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 1rem auto;
  line-height: 1.6;
`;

export const CTAButton = styled("button")`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
