import { Component } from "solid-js";
import { BlogContainer, BlogPost } from "./Blog.styled";

const Blog: Component = () => {
  return (
    <BlogContainer>
      <h1>ブログ</h1>
      <BlogPost>
        <h2>最新の学習方法</h2>
        <p>ここでは最新の学習方法について紹介します。</p>
      </BlogPost>
      <BlogPost>
        <h2>効果的な時間管理術</h2>
        <p>学習における効果的な時間管理術について解説します。</p>
      </BlogPost>
    </BlogContainer>
  );
};

export default Blog;
