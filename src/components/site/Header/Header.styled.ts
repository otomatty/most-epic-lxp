import { styled } from "solid-styled-components";

export const HeaderContainer = styled("header")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white; /* 背景色を白に変更 */
  color: #007bff; /* テキスト色を変更 */
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
