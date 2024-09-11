import { Component, createSignal, createEffect, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Sidebar from "../../../components/app/Sidebar/Sidebar";
import {
  getActiveStudyRooms,
  getAutoCreatedStudyRooms,
  StudyRoom,
} from "../../../services/studyRoomService";
import {
  StudyRoomSelectionPage,
  StudyRoomList,
  StudyRoomItem,
  CreateRoomButton,
} from "./StudyRoomSelection.styles";

const StudyRoomSelection: Component = () => {
  const [userCreatedRooms, setUserCreatedRooms] = createSignal<StudyRoom[]>([]);
  const [autoCreatedRooms, setAutoCreatedRooms] = createSignal<StudyRoom[]>([]);
  const navigate = useNavigate();

  createEffect(() => {
    const fetchStudyRooms = async () => {
      const userRooms = await getActiveStudyRooms();
      const autoRooms = await getAutoCreatedStudyRooms();
      setUserCreatedRooms(userRooms);
      setAutoCreatedRooms(autoRooms);
    };

    fetchStudyRooms();
  });

  const joinRoom = (roomId: string) => {
    navigate(`/study-room/${roomId}`);
  };

  const createNewRoom = () => {
    navigate("/create-study-room");
  };

  return (
    <StudyRoomSelectionPage>
      <Sidebar />
      <StudyRoomList>
        <h1>オンライン自習室を選択</h1>
        <h2>自動作成された自習室</h2>
        <For each={autoCreatedRooms()}>
          {(room) => (
            <StudyRoomItem onClick={() => joinRoom(room.id!)}>
              <h3>{room.name}</h3>
              <p>説明: {room.description}</p>
              <p>参加者数: {room.maxParticipants}</p>
            </StudyRoomItem>
          )}
        </For>
        <h2>ユーザー作成の自習室</h2>
        <For each={userCreatedRooms()}>
          {(room) => (
            <StudyRoomItem onClick={() => joinRoom(room.id!)}>
              <h3>{room.name}</h3>
              <p>説明: {room.description}</p>
              <p>参加者数: {room.maxParticipants}</p>
            </StudyRoomItem>
          )}
        </For>
        <CreateRoomButton onClick={createNewRoom}>
          新しい自習室を作成
        </CreateRoomButton>
      </StudyRoomList>
    </StudyRoomSelectionPage>
  );
};

export default StudyRoomSelection;
