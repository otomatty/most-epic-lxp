import { Component } from "solid-js";
import { FooterContainer, FooterText } from "./Footer.styled";

const Footer: Component = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2023 LXP. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
