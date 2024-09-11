import { Component, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { auth, firestore } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
  ProfileContainer,
  ProfileInfo,
  ProfileItem,
  EditButton,
} from "./Profile.styled";
import { FirestoreCollections } from "../../../types/users";

const Profile: Component = () => {
  const [userData, setUserData] =
    createSignal<FirestoreCollections.User | null>(null);
  const navigate = useNavigate();

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
    <ProfileContainer>
      <h1>プロフィール</h1>
      {userData() ? (
        <ProfileInfo>
          <ProfileItem>
            <strong>ユーザーID:</strong> {userData()?.userId}
          </ProfileItem>
          <ProfileItem>
            <strong>メールアドレス:</strong> {userData()?.email}
          </ProfileItem>
          <ProfileItem>
            <strong>ユーザー名:</strong> {userData()?.username}
          </ProfileItem>
          <ProfileItem>
            <strong>作成日:</strong>{" "}
            {userData()?.createdAt.toDate().toLocaleString()}
          </ProfileItem>
          <ProfileItem>
            <strong>最終更新日:</strong>{" "}
            {userData()?.updatedAt.toDate().toLocaleString()}
          </ProfileItem>
          <ProfileItem>
            <strong>プロジェクト:</strong> {userData()?.projects.join(", ")}
          </ProfileItem>
          <ProfileItem>
            <strong>ポイント:</strong> {userData()?.Points.totalPoints}
          </ProfileItem>
          <ProfileItem>
            <strong>Focus Sessions:</strong> {userData()?.FocusSessions.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Focus Stats:</strong>
            <div>
              <div>Daily Total: {userData()?.FocusStats.dailyTotal}</div>
              <div>Weekly Total: {userData()?.FocusStats.weeklyTotal}</div>
              <div>Monthly Total: {userData()?.FocusStats.monthlyTotal}</div>
              <div>
                Last Updated:{" "}
                {userData()?.FocusStats.lastUpdated.toDate().toLocaleString()}
              </div>
            </div>
          </ProfileItem>
          <ProfileItem>
            <strong>Time Logs:</strong> {userData()?.TimeLogs.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Project Time Stats:</strong>{" "}
            {userData()?.ProjectTimeStats.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Task Time Stats:</strong> {userData()?.TaskTimeStats.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Goals:</strong> {userData()?.Goals.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Habits:</strong> {userData()?.Habits.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Habit Stats:</strong> {userData()?.HabitStats.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Jobs:</strong> {userData()?.Jobs.length}
          </ProfileItem>
          <ProfileItem>
            <strong>Titles:</strong> {userData()?.Titles.length}
          </ProfileItem>
          <EditButton onClick={() => navigate("/webapp/profile/edit")}>
            編集
          </EditButton>
        </ProfileInfo>
      ) : (
        <p>ユーザー情報を読み込んでいます...</p>
      )}
    </ProfileContainer>
  );
};

export default Profile;
