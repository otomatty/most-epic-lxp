import { Component, createSignal, createEffect } from "solid-js";
import { UserInfoContainer, UserAvatar, UserName } from "./UserInfo.styles";
import { auth, firestore } from "../../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { FirestoreCollections } from "../../../types/users";

const UserInfo: Component = () => {
  const [userData, setUserData] =
    createSignal<FirestoreCollections.User | null>(null);

  createEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Firestoreからユーザー情報を取得
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as FirestoreCollections.User;
          setUserData(data);
        } else {
          // Firestoreにデータがない場合は、認証情報から取得
          setUserData({
            userId: user.uid,
            email: user.email || "",
            username: user.displayName || "名無しユーザー",
            photoURL: user.photoURL || "default-avatar.jpg",
            projects: [],
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            FocusSessions: [],
            FocusStats: {
              dailyTotal: 0,
              weeklyTotal: 0,
              monthlyTotal: 0,
              lastUpdated: Timestamp.now(),
            },
            TimeLogs: [],
            ProjectTimeStats: [],
            TaskTimeStats: [],
            Goals: [],
            Habits: [],
            HabitStats: [],
            Jobs: [],
            Titles: [],
            Points: {
              pointId: "",
              totalPoints: 0,
              earnedFrom: [],
            },
          });
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  });

  return (
    <UserInfoContainer>
      <UserAvatar
        src={userData()?.photoURL || "default-avatar.jpg"}
        alt="User Avatar"
      />
      <UserName>{userData()?.username || "ログインしていません"}</UserName>
    </UserInfoContainer>
  );
};

export default UserInfo;
