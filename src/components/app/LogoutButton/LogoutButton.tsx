import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { logout } from "../../../services/userService";
import { LogoutButtonStyled } from "./LogoutButton.styled";

const LogoutButton: Component = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <LogoutButtonStyled onClick={handleLogout}>ログアウト</LogoutButtonStyled>
  );
};

export default LogoutButton;
