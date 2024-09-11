import { Component, JSX } from "solid-js";
import { Container } from "./StudyRoomContainer.styles";

const StudyRoomContainer: Component<{ children: JSX.Element }> = (props) => {
  return <Container>{props.children}</Container>;
};

export default StudyRoomContainer;
