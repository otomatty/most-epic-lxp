import { Component, For } from "solid-js";

interface ParticipantListProps {
  participants: string[];
  maxParticipants: number;
}

const ParticipantList: Component<ParticipantListProps> = (props) => {
  return (
    <div>
      <h2>
        参加者 ({props.participants.length}/{props.maxParticipants})
      </h2>
      <For each={props.participants}>
        {(participant) => <div>{participant}</div>}
      </For>
    </div>
  );
};

export default ParticipantList;
