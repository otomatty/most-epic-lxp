import { styled } from "solid-styled-components";

export const HeaderContainer = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007bff;
  color: white;
`;

export const Logo = styled("div")`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

export const Nav = styled("nav")`
  display: flex;
  gap: 15px;
`;

export const NavItem = styled("div")`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
