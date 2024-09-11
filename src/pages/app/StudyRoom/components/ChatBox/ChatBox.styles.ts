import { styled } from "solid-styled-components";

export const ChatContainer = styled("div")`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

export const MessageList = styled("div")`
  height: 300px;
  overflow-y: auto;
  padding: 10px;
`;

export const MessageItem = styled("div")`
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

export const InputContainer = styled("form")`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;

  input {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
