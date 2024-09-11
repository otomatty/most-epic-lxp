import { styled } from "solid-styled-components";

export const HomeContainer = styled("div")`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Header = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const MainContent = styled("main")`
  text-align: center;
  padding: 40px 0;
`;

export const FeatureList = styled("div")`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 40px 0;
`;

export const FeatureItem = styled("div")`
  flex-basis: 30%;
  margin-bottom: 20px;
`;

export const CTAButton = styled("button")`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Footer = styled("footer")`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #eee;
`;
