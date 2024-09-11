import { Component } from "solid-js";

interface WorkDescriptionProps {
  workDescription: string;
  setWorkDescription: (value: string) => void;
}

const WorkDescription: Component<WorkDescriptionProps> = (props) => {
  return (
    <input
      type="text"
      value={props.workDescription}
      onInput={(e) => props.setWorkDescription(e.currentTarget.value)}
      placeholder="作業内容を入力してください"
    />
  );
};

export default WorkDescription;
