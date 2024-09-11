import { Timestamp } from "@firebase/firestore-types";

declare namespace FirestoreCollections {
  // Userコレクション
  interface User {
    // フィールド
    userId: string;
    email: string;
    username: string;
    photoURL: string;
    projects: string[]; //Projectsコレクションとリンク
    createdAt: Timestamp;
    updatedAt: Timestamp;
    // サブコレクション
    FocusSessions: FocusSession[];
    FocusStats: FocusStats;
    TimeLogs: TimeLog[];
    ProjectTimeStats: ProjectTimeStats[];
    TaskTimeStats: TaskTimeStats[];
    Goals: Goal[];
    Habits: Habit[];
    HabitStats: HabitStats[];
    Jobs: Job[];
    Titles: Title[];
    Points: Points;
    googleUserInfo?: GoogleUserInfo; // 追加
  }

  // Googleユーザー情報
  interface GoogleUserInfo {
    email: string;
    displayName: string;
    photoURL: string;
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

  interface Job {
    jobId: string;
    jobTitle: string;
    level: number;
    xp: number;
    skills: Skill[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
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
    earnedFrom: PointSource[];
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
