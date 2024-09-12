import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {
  HomeContainer,
  Header,
  MainContent,
  FeatureList,
  FeatureItem,
  CTAButton,
  Footer,
} from "./Home.styled";

const Home: Component = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <HomeContainer>
      <Header>
        <h1>LXP - 学習体験プラットフォーム</h1>
        {/* <CTAButton onClick={handleLogin}>ログイン</CTAButton> 削除 */}
      </Header>
      <MainContent>
        <h2>効果的な学習をサポートする革新的なプラットフォーム</h2>
        <p>
          LXPは、あなたの学習をより効果的に、より楽しくする革新的なプラットフォームです。
          自分のペースで学び、他の学習者とつながり、実践的なスキルを身につけましょう。
        </p>
        <FeatureList>
          <FeatureItem>
            <h3>パーソナライズされた学習体験</h3>
            <p>
              あなたの目標と進捗に合わせて、最適な学習コンテンツを提供します。
            </p>
          </FeatureItem>
          <FeatureItem>
            <h3>オンライン自習室</h3>
            <p>
              他の学習者と一緒に集中して学習できる、バーチャルな自習環境を提供します。
            </p>
          </FeatureItem>
          <FeatureItem>
            <h3>進捗トラッキング</h3>
            <p>
              学習の進捗を可視化し、モチベーションを維持するのに役立ちます。
            </p>
          </FeatureItem>
        </FeatureList>
        <CTAButton onClick={handleLogin}>今すぐ始める</CTAButton>
      </MainContent>
      <Footer>
        <p>&copy; 2023 LXP. All rights reserved.</p>
      </Footer>
    </HomeContainer>
  );
};

export default Home;
