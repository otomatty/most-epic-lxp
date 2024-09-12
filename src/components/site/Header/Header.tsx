import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { HeaderContainer, Nav, NavItem, Logo } from "./Header.styled";
import { CTAButton } from "../../../pages/site/Home/Home.styled"; // 追加

const Header: Component = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")}>LXP</Logo>
      <Nav>
        <NavItem onClick={() => navigate("/features")}>機能紹介</NavItem>
        <NavItem onClick={() => navigate("/pricing")}>料金プラン</NavItem>
        <NavItem onClick={() => navigate("/testimonials")}>お客様の声</NavItem>
        <NavItem onClick={() => navigate("/download")}>ダウンロード</NavItem>
        <NavItem onClick={() => navigate("/faq")}>FAQ</NavItem>
        <NavItem onClick={() => navigate("/blog")}>ブログ</NavItem>
        <NavItem onClick={() => navigate("/support")}>サポート</NavItem>
        <NavItem onClick={() => navigate("/about")}>会社概要</NavItem>
        <NavItem onClick={() => navigate("/legal")}>利用規約</NavItem>
      </Nav>
      <CTAButton onClick={handleLogin}>ログイン</CTAButton> {/* 追加 */}
    </HeaderContainer>
  );
};

export default Header;
