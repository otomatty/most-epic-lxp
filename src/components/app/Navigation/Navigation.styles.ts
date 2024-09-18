import { styled } from "solid-styled-components";
import { A } from "@solidjs/router";

interface NavItemProps {
  active: boolean;
}

export const NavContainer = styled("nav")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
`;

export const NavItem = styled(A)<NavItemProps>`
  text-decoration: none;
  color: ${(props) => (props.active ? "#007bff" : "#333")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
