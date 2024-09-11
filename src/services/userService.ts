import { FirestoreCollections } from "../types/users";
import { auth, firestore } from "../firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

// 新規ユーザー登録と最終ログイン時間の更新
export async function createOrUpdateUser(user: any): Promise<void> {
  const userRef = doc(firestore, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // 新規ユーザーの場合
    const newUser: FirestoreCollections.User = {
      userId: user.uid,
      email: user.email,
      username: user.displayName || "",
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
      googleUserInfo: {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };

    await setDoc(userRef, newUser);
  } else {
    // 既存ユーザーの場合、最終ログイン時間のみ更新
    await setDoc(userRef, { updatedAt: Timestamp.now() }, { merge: true });
  }
}

// コミュニティ追加
export async function addCommunity(
  userId: string,
  communityName: string
): Promise<void> {
  const communityRef = collection(firestore, `users/${userId}/communities`);
  await addDoc(communityRef, {
    name: communityName,
    role: "member",
    joinedAt: Timestamp.now(),
  });
}

// 学習記録追加
export async function addLearningRecord(
  userId: string,
  title: string,
  description: string
): Promise<void> {
  const learningRecordRef = collection(
    firestore,
    `users/${userId}/learningRecords`
  );
  await addDoc(learningRecordRef, {
    title,
    description,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

// ログアウト処理
export async function logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("ログアウトに失敗しました:", error);
  }
}

// パスワードリセット
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("パスワードリセットのメールを送信しました。");
  } catch (error) {
    console.error("パスワードリセットに失敗しました:", error);
    alert(
      "パスワードリセットに失敗しました。メールアドレスを確認してください。"
    );
  }
}

export const getUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
  }
  return null;
};

export const updateUserData = async (data: any) => {
  const user = auth.currentUser;
  if (user) {
    await updateDoc(doc(firestore, "users", user.uid), data);
  }
};
