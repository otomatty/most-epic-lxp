import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  increment,
  Timestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { firestore, auth } from "../firebase/config";

export interface StudyRoom {
  id?: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
  isAutoCreated?: boolean;
}

export interface Participant {
  userId: string;
  name: string;
  joinedAt: Date;
}

export interface UserStudySession {
  roomId: string;
  enterTime: Timestamp;
  exitTime?: Timestamp;
}

const studyRoomsCollection = collection(firestore, "studyRooms");

const ROOM_NAMES = [
  "集中力アップ部屋",
  "モチベーション充電所",
  "静かな図書館",
  "カフェテリア",
  "深夜の自習室",
];

export const createStudyRoom = async (
  roomData: Omit<
    StudyRoom,
    "id" | "createdAt" | "createdBy" | "currentParticipants"
  >
): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const newRoom: StudyRoom = {
    ...roomData,
    createdBy: user.uid,
    createdAt: serverTimestamp() as unknown as Date,
    currentParticipants: 0,
    isActive: true,
  };

  const docRef = await addDoc(studyRoomsCollection, newRoom);
  return docRef.id;
};

export const getStudyRoom = async (
  roomId: string
): Promise<StudyRoom | null> => {
  const docRef = doc(studyRoomsCollection, roomId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as StudyRoom;
  } else {
    return null;
  }
};

export const updateStudyRoom = async (
  roomId: string,
  updateData: Partial<StudyRoom>
): Promise<void> => {
  const docRef = doc(studyRoomsCollection, roomId);
  await updateDoc(docRef, updateData);
};

export const deleteStudyRoom = async (roomId: string): Promise<void> => {
  const docRef = doc(studyRoomsCollection, roomId);
  await deleteDoc(docRef);
};

export const getActiveStudyRooms = async (): Promise<StudyRoom[]> => {
  const q = query(studyRoomsCollection, where("isActive", "==", true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as StudyRoom)
  );
};

export const joinStudyRoom = async (roomId: string) => {
  if (!auth.currentUser) return;

  const userSessionsRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/studySessions`
  );
  await addDoc(userSessionsRef, {
    roomId: roomId,
    enterTime: serverTimestamp(),
  });
};

export const leaveStudyRoom = async () => {
  if (!auth.currentUser) return;

  const userSessionsRef = collection(
    firestore,
    `users/${auth.currentUser.uid}/studySessions`
  );
  const sessionQuery = query(
    userSessionsRef,
    where("exitTime", "==", null),
    orderBy("enterTime", "desc"),
    limit(1)
  );
  const sessionSnapshot = await getDocs(sessionQuery);

  if (!sessionSnapshot.empty) {
    const sessionDoc = sessionSnapshot.docs[0];
    await updateDoc(sessionDoc.ref, {
      exitTime: serverTimestamp(),
    });

    await calculateCompletedBlocks(auth.currentUser.uid, sessionDoc.id);
  }
};

const calculateCompletedBlocks = async (userId: string, sessionId: string) => {
  const sessionRef = doc(firestore, `users/${userId}/studySessions`, sessionId);
  const sessionDoc = await getDoc(sessionRef);

  if (sessionDoc.exists()) {
    const sessionData = sessionDoc.data() as UserStudySession;
    const enterTime = sessionData.enterTime.toDate();
    const exitTime = sessionData.exitTime?.toDate() || new Date();

    const durationInMinutes =
      (exitTime.getTime() - enterTime.getTime()) / (1000 * 60);
    const completedBlocks = Math.floor(durationInMinutes / 30);

    const userStatsRef = doc(firestore, "userStats", userId);
    await updateDoc(userStatsRef, {
      totalWorkBlocks: increment(completedBlocks),
      totalWorkTime: increment(completedBlocks * 30),
    });
  }
};

export const getParticipants = async (
  roomId: string
): Promise<Participant[]> => {
  const roomRef = doc(studyRoomsCollection, roomId);
  const participantsCollection = collection(roomRef, "participants");
  const querySnapshot = await getDocs(participantsCollection);
  return querySnapshot.docs.map((doc) => doc.data() as Participant);
};

export const getAutoCreatedStudyRooms = async (): Promise<StudyRoom[]> => {
  const q = query(
    studyRoomsCollection,
    where("isAutoCreated", "==", true),
    where("isActive", "==", true)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as StudyRoom)
  );
};

export const createAutoStudyRoom = async (): Promise<string> => {
  const usersCollection = collection(firestore, "users");
  const q = query(usersCollection, limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("No users found");
  }

  const randomUser = querySnapshot.docs[0];
  const randomName = ROOM_NAMES[Math.floor(Math.random() * ROOM_NAMES.length)];

  const newRoom: StudyRoom = {
    name: randomName,
    description: "自動作成された自習室です",
    createdBy: randomUser.id,
    createdAt: serverTimestamp() as unknown as Date,
    maxParticipants: 5,
    currentParticipants: 0,
    isActive: true,
    isAutoCreated: true,
  };

  const docRef = await addDoc(studyRoomsCollection, newRoom);
  console.log("New auto-created room:", docRef.id);
  return docRef.id;
};

export const joinRandomAutoCreatedRoom = async (): Promise<string> => {
  const autoRooms = await getAutoCreatedStudyRooms();

  if (autoRooms.length === 0) {
    // 自動作成された部屋がない場合は新しく作成
    const newRoomId = await createAutoStudyRoom();
    await joinStudyRoom(newRoomId);
    return newRoomId;
  }

  // ランダムに部屋を選択
  const randomRoom = autoRooms[Math.floor(Math.random() * autoRooms.length)];
  await joinStudyRoom(randomRoom.id!);
  return randomRoom.id!;
};

export const recordWorkBlock = async (roomId: string) => {
  if (!auth.currentUser) return;

  const participantRef = doc(
    firestore,
    "studyRooms",
    roomId,
    "participants",
    auth.currentUser.uid
  );
  await updateDoc(participantRef, {
    completedBlocks: increment(1),
  });

  const userStatsRef = doc(firestore, "userStats", auth.currentUser.uid);
  await updateDoc(userStatsRef, {
    totalWorkBlocks: increment(1),
    totalWorkTime: increment(30), // 30分を加算
  });
};
