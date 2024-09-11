import { styled, createGlobalStyles } from "solid-styled-components";

export const GlobalStyle = createGlobalStyles`
  :root {
    --primary-color: #007bff;
    --secondary-color: #28a745;
    --tertiary-color: #ffc107;
    --quaternary-color: #dc3545;
    --quinary-color: #17a2b8;
  }

  body {
    background-color: #f0f0f0;
    color: #333;
    font-family: Arial, sans-serif;
  }

  button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--primary-color-hover);
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
`;

export const LayoutContainer = styled("div")`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled("main")`
  flex: 1;
  padding: 20px;
`;
