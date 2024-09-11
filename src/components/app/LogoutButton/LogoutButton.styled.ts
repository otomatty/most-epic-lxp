import { styled } from "solid-styled-components";

export const LogoutButtonStyled = styled("button")`
  background-color: #ff4b5c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1f3a;
  }
`;
