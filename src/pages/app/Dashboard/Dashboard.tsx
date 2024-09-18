import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { joinRandomAutoCreatedRoom } from "../../../services/studyRoomService";
import { auth } from "../../../firebase/config";
import { DashboardContainer, JoinRoomButton } from "./Dashboard.styled";
import UserJob from "./components/UserJob/UserJob";
import UserLevelInfo from "../../../components/app/UserLevelInfo/UserLevelInfo";
import LoginStreak from "../../../components/app/LoginStreak/LoginStreak";

const Dashboard: Component = () => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = createSignal(false);

  const handleJoinRoom = async () => {
    setIsJoining(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const roomId = await joinRandomAutoCreatedRoom();
      navigate(`/study-room/${roomId}`);
    } catch (error) {
      console.error("Failed to join room:", error);
      alert("自習室への参加に失敗しました。");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <DashboardContainer>
      <UserLevelInfo />
      <LoginStreak />
      <UserJob />
      <JoinRoomButton onClick={handleJoinRoom} disabled={isJoining()}>
        {isJoining() ? "参加中..." : "学習を始める"}
      </JoinRoomButton>
    </DashboardContainer>
  );
};

export default Dashboard;
