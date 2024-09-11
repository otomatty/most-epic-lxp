import { Component, createSignal, createEffect } from "solid-js";
import { auth, firestore } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { FirestoreCollections } from "../../../types/users";
import { UserStatsContainer, StatItem } from "./UserStats.styled";

const UserStats: Component = () => {
  const [userData, setUserData] =
    createSignal<FirestoreCollections.User | null>(null);

  createEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as FirestoreCollections.User);
        }
      }
    };

    fetchUserData();
  });

  return (
    <UserStatsContainer>
      {userData() ? (
        <>
          <StatItem>
            <strong>ジョブ:</strong> {userData()?.Jobs.join(", ")}
          </StatItem>
          <StatItem>
            <strong>レベル:</strong> {userData()?.Titles.join(", ")}
          </StatItem>
        </>
      ) : (
        <p>ユーザー情報を読み込んでいます...</p>
      )}
    </UserStatsContainer>
  );
};

export default UserStats;
