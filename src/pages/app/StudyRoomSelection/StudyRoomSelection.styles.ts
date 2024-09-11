import { styled } from "solid-styled-components";

export const StudyRoomSelectionPage = styled("div")`
  display: flex;
  height: 100vh;
`;

export const StudyRoomList = styled("div")`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const StudyRoomItem = styled("div")`
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const CreateRoomButton = styled("button")`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
