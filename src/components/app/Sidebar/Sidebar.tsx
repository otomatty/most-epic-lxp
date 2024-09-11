import { Component } from "solid-js";
import { SidebarContainer } from "./Sidebar.styles";
import UserInfo from "../../app/UserInfo/UserInfo";
import Navigation from "../../app/Navigation/Navigation";
import LogoutButton from "../LogoutButton/LogoutButton";

interface SidebarProps {
  onNavigate?: () => Promise<void>;
}

const Sidebar: Component<SidebarProps> = (props) => {
  return (
    <SidebarContainer>
      <UserInfo />
      <Navigation onNavigate={props.onNavigate} />
      <LogoutButton />
    </SidebarContainer>
  );
};

export default Sidebar;
