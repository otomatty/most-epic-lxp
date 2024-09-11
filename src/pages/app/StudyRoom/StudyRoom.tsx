import { Component, createSignal, createEffect, onCleanup } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { auth, firestore } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
  joinStudyRoom,
  leaveStudyRoom,
} from "../../../services/studyRoomService";
import Sidebar from "../../../components/app/Sidebar/Sidebar";
import StudyRoomContainer from "./components/StudyRoomContainer/StudyRoomContainer";
import VideoStream from "./components/VideoStream/VideoStream";
import ParticipantList from "./components/ParticipantList/ParticipantList";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";
import ChatBox from "./components/ChatBox/ChatBox";
import WorkDescription from "./components/WorkDescription/WorkDescription";
import { StudyRoomPage } from "./StudyRoom.styles";

const MAX_PARTICIPANTS = 5;

const StudyRoom: Component = () => {
  const params = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [participants, setParticipants] = createSignal<string[]>([]);
  const [localStream, setLocalStream] = createSignal<MediaStream | null>(null);
  const [workDescription, setWorkDescription] = createSignal("");
  const [roomName, setRoomName] = createSignal("");

  const handleExit = async () => {
    const confirmed = window.confirm("自習室を退出しますか？");
    if (confirmed) {
      if (!auth.currentUser) return;
      await leaveStudyRoom();
      navigate("/dashboard");
    }
  };

  createEffect(() => {
    const roomId = params.roomId;
    if (!roomId || !auth.currentUser) {
      navigate("/dashboard");
      return;
    }

    // 部屋の情報を取得
    const fetchRoomInfo = async () => {
      const roomDoc = await getDoc(doc(firestore, "studyRooms", roomId));
      if (roomDoc.exists()) {
        setRoomName(roomDoc.data().name);
      } else {
        alert("指定された自習室が見つかりません。");
        navigate("/dashboard");
      }
    };
    fetchRoomInfo();

    // カメラとマイクへのアクセスを要求
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 320, height: 240, frameRate: 15 },
        audio: true,
      })
      .then((stream) => {
        setLocalStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // 自習室への参加を記録
    joinStudyRoom(roomId);

    onCleanup(() => {
      leaveStudyRoom();
      if (localStream()) {
        localStream()!
          .getTracks()
          .forEach((track) => track.stop());
      }
    });
  });

  return (
    <StudyRoomPage>
      <Sidebar onNavigate={handleExit} />
      <StudyRoomContainer>
        <h1>{roomName() || "オンラインコワーキングスペース"}</h1>
        <PomodoroTimer />
        <WorkDescription
          workDescription={workDescription()}
          setWorkDescription={setWorkDescription}
        />
        <VideoStream localStream={localStream()} />
        <ParticipantList
          participants={participants()}
          maxParticipants={MAX_PARTICIPANTS}
        />
        <ChatBox roomId={params.roomId} />
        <button onClick={handleExit}>退室</button>
      </StudyRoomContainer>
    </StudyRoomPage>
  );
};

export default StudyRoom;
