import { createAutoStudyRoom } from "./studyRoomService";

const AUTO_ROOM_CREATION_INTERVAL = 1000 * 60 * 60; // 1時間ごと
let isAutoRoomCreationRunning = false;

export const startAutoRoomCreation = () => {
  if (isAutoRoomCreationRunning) {
    console.log("Auto room creation is already running");
    return;
  }

  isAutoRoomCreationRunning = true;

  const createRoom = async () => {
    try {
      await createAutoStudyRoom();
      console.log("Auto study room created or checked");
    } catch (error) {
      console.error("Failed to create auto study room:", error);
    }
  };

  createRoom(); // 初回実行
  setInterval(createRoom, AUTO_ROOM_CREATION_INTERVAL);
};
