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
  arrayUnion,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { calculateXpGain } from "../utils/experienceUtils";

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
      userLevel: 1,
      userXp: 0,
      lastCheckin: null, // 追加
      loginStreak: 0, // 追加
      lastLoginDate: null, // 追加
    };

    await setDoc(userRef, newUser);
  } else {
    // 既存ユーザーの場合、最終ログイン時間のみ更新
    await setDoc(
      userRef,
      {
        updatedAt: serverTimestamp(),
        lastLoginDate: serverTimestamp(), // 追加
      },
      { merge: true }
    );
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

export const getUserData = async (
  userId: string
): Promise<FirestoreCollections.User | null> => {
  const userDoc = await getDoc(doc(firestore, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data() as FirestoreCollections.User;
  }
  return null;
};

export const updateUserData = async (data: any) => {
  const user = auth.currentUser;
  if (user) {
    await updateDoc(doc(firestore, "users", user.uid), data);
  }
};

// ジョブ選択を更新する関数を追加
export async function updateSelectedJob(
  userId: string,
  jobId: string
): Promise<void> {
  try {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, {
      selectedJob: jobId,
      Jobs: arrayUnion({
        jobId: jobId,
        selectedAt: Timestamp.now(),
        level: 1, // 初期レベルを1に設定
      }),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("ジョブの選択の更新に失敗しました:", error);
    throw error;
  }
}

// ユーザーの経験値を更新する関数
export async function updateUserXp(
  userId: string,
  xpGained: number
): Promise<void> {
  const userRef = doc(firestore, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data() as FirestoreCollections.User;
    const currentXp = userData.userXp || 0;
    const currentLevel = userData.userLevel || 1;

    const newXp = currentXp + xpGained;
    const newLevel = calculateNewLevel(newXp);

    await updateDoc(userRef, {
      userXp: newXp,
      userLevel: newLevel,
      updatedAt: Timestamp.now(),
    });
  }
}

// 経験値からレベルを計算する関数
function calculateNewLevel(xp: number): number {
  // この関数は、経験値に基づいてレベルを計算します
  // 例: 100XPごとに1レベルアップする単純な計算
  return Math.floor(xp / 100) + 1;
}

// ユーザーのレベルを取得する関数
export async function getUserLevel(userId: string): Promise<number> {
  const userDoc = await getDoc(doc(firestore, "users", userId));
  if (userDoc.exists()) {
    const userData = userDoc.data() as FirestoreCollections.User;
    return userData.userLevel || 1;
  }
  return 1; // デフォルトレベル
}

// デイリーチェックイン機能を追加
export async function performDailyCheckin(userId: string): Promise<number> {
  const userRef = doc(firestore, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data() as FirestoreCollections.User;
    const lastCheckin = userData.lastCheckin?.toDate() || new Date(0);
    const now = new Date();

    // 最後のチェックインが昨日以前かどうかを確認
    if (now.toDateString() !== lastCheckin.toDateString()) {
      const xpGained = calculateXpGain("daily_checkin", 0);
      const newXp = (userData.userXp || 0) + xpGained;
      const newStreak = await updateLoginStreak(userId);

      await updateDoc(userRef, {
        userXp: newXp,
        lastCheckin: serverTimestamp(),
        loginStreak: newStreak,
      });

      return xpGained;
    } else {
      return 0; // 今日既にチェックイン済みの場合
    }
  }

  throw new Error("User not found");
}

export async function updateLoginStreak(userId: string): Promise<number> {
  const userRef = doc(firestore, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data() as FirestoreCollections.User;
    const now = Timestamp.now();
    const lastLoginDate = userData.lastLoginDate?.toDate() || new Date(0);
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    let newStreak = userData.loginStreak || 0;

    if (now.toDate().getTime() - lastLoginDate.getTime() <= oneDayInMillis) {
      // 1日以内のログインの場合、ストリークを増加
      newStreak += 1;
    } else if (
      now.toDate().getTime() - lastLoginDate.getTime() >
      oneDayInMillis
    ) {
      // 1日以上経過している場合、ストリークをリセット
      newStreak = 1;
    }

    await updateDoc(userRef, {
      loginStreak: newStreak,
      lastLoginDate: serverTimestamp(),
    });

    return newStreak;
  }

  throw new Error("User not found");
}
