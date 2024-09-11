import { Component, useContext } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { NavContainer, NavItem } from "./Navigation.styles";
import { StudyRoomContext } from "../../../contexts/StudyRoomContext";

interface NavigationProps {
  onNavigate?: () => Promise<void>;
}

const Navigation: Component<NavigationProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isInStudyRoom } = useContext(StudyRoomContext);

  const handleNavigation = async (e: MouseEvent, href: string) => {
    if (isInStudyRoom()) {
      e.preventDefault();
      if (window.confirm("自習室を退出しますか？")) {
        if (props.onNavigate) {
          await props.onNavigate();
        }
        navigate(href);
      }
    }
  };

  return (
    <NavContainer>
      <NavItem
        href="/webapp/dashboard"
        onClick={(e) => handleNavigation(e, "/dashboard")}
        active={location.pathname === "/dashboard"}
      >
        ダッシュボード
      </NavItem>
      <NavItem
        href="/webapp/learning-records"
        onClick={(e) => handleNavigation(e, "/learning-records")}
        active={location.pathname === "/learning-records"}
      >
        学習記録
      </NavItem>
      <NavItem
        href="/webapp/communities"
        onClick={(e) => handleNavigation(e, "/communities")}
        active={location.pathname === "/communities"}
      >
        コミュニティ
      </NavItem>
      <NavItem
        href="/webapp/settings"
        onClick={(e) => handleNavigation(e, "/settings")}
        active={location.pathname === "/settings"}
      >
        設定
      </NavItem>
      <NavItem
        href="/webapp/profile"
        onClick={(e) => handleNavigation(e, "/profile")}
        active={location.pathname === "/profile"}
      >
        プロフィール
      </NavItem>
    </NavContainer>
  );
};

export default Navigation;
