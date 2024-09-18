import { Timestamp } from "@firebase/firestore-types";

declare namespace FirestoreCollections {
  // Userコレクション
  interface User {
    // フィールド
    userId: string;
    email: string;
    username: string;
    photoURL?: string;
    projects: any[]; //Projectsコレクションとリンク
    createdAt: Timestamp;
    updatedAt: Timestamp;
    FocusSessions: any[]; // FocusSessionsサブコレクション
    FocusStats: {
      dailyTotal: number;
      weeklyTotal: number;
      monthlyTotal: number;
      lastUpdated: Timestamp;
    };
    TimeLogs: any[]; // TimeLogサブコレクション
    ProjectTimeStats: any[]; // ProjectTimeStatsサブコレクション
    TaskTimeStats: any[]; // TaskTimeStatsサブコレクション
    Goals: any[]; // Goalsサブコレクション
    Habits: any[]; // Habitsサブコレクション
    HabitStats: any[]; // HabitStatsサブコレクション
    Jobs: UserJob[]; // Job[] から UserJob[] に変更
    selectedJob?: string; // 追加: selectedJob プロパティ
    Titles: any[]; // Titlesサブコレクション
    Points: {
      pointId: string;
      totalPoints: number;
      earnedFrom: any[]; // PointSource[] から any[] に変更
    };
    googleUserInfo: {
      email: string;
      displayName: string;
      photoURL?: string;
    }; // Googleユーザー情報
    userLevel: number;
    userXp: number;
    lastCheckin: Timestamp | null;
    loginStreak: number; // 追加: 連続ログイン日数
    lastLoginDate: Timestamp | null; // 追加: 最後のログイン日
  }

  // Googleユーザー情報
  interface GoogleUserInfo {
    email: string;
    displayName: string;
    photoURL?: string;
  }

  // Focusサブコレクション
  interface FocusSession {
    sessionId: string;
    startTime: Timestamp;
    endTime: Timestamp;
    taskDescription: string;
    focusDuration: number;
    breakDuration: number;
    pointsEarned: number;
    createdAt: Timestamp;
  }
  // FocusStatsサブコレクション
  interface FocusStats {
    dailyTotal: number;
    weeklyTotal: number;
    monthlyTotal: number;
    lastUpdated: Timestamp;
  }

  // TimeLogサブコレクション
  interface TimeLog {
    logId: string;
    taskId: string;
    projectId: string;
    startTime: Timestamp;
    endTime: Timestamp;
    duration: number;
    createdAt: Timestamp;
  }

  interface ProjectTimeStats {
    projectId: string;
    dailyTotal: number;
    weeklyTotal: number;
    monthlyTotal: number;
    lastUpdated: Timestamp;
  }

  interface TaskTimeStats {
    taskId: string;
    dailyTotal: number;
    weeklyTotal: number;
    monthlyTotal: number;
    lastUpdated: Timestamp;
  }

  interface Goal {
    goalId: string;
    goalTitle: string;
    description: string;
    targetDate: Timestamp;
    createdAt: Timestamp;
  }

  interface Habit {
    habitId: string;
    habitTitle: string;
    frequency: "daily" | "weekly" | "monthly";
    reminderTime: Timestamp;
    progress: number;
    streak: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface HabitStats {
    habitId: string;
    dailyProgress: number;
    weeklyProgress: number;
    monthlyProgress: number;
    lastUpdated: Timestamp;
  }

  // Job インターフェースを UserJob に変更
  interface UserJob {
    jobId: string;
    level: number;
    xp: number;
  }

  interface Skill {
    skillId: string;
    skillName: string;
    skillLevel: number;
  }

  interface Title {
    titleId: string;
    titleName: string;
    description: string;
    awardedAt: Timestamp;
  }

  interface Points {
    pointId: string;
    totalPoints: number;
    earnedFrom: any[]; // PointSource[] から any[] に変更
  }

  interface PointSource {
    sourceId: string;
    description: string;
    points: number;
    earnedAt: Timestamp;
  }
}

declare interface UsersCollection {
  [userId: string]: FirestoreCollections.User;
}
