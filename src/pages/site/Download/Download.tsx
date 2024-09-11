import { Component } from "solid-js";
import { DownloadContainer, CTAButton } from "./Download.styled";

const Download: Component = () => {
  return (
    <DownloadContainer>
      <h1>アプリのダウンロード</h1>
      <p>今すぐアプリをダウンロードして、学習を始めましょう。</p>
      <CTAButton>ダウンロード</CTAButton>
    </DownloadContainer>
  );
};

export default Download;
