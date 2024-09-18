import { Timestamp } from "firebase/firestore";

// 次のレベルに必要な経験値を計算する関数
export function calculateXpForNextLevel(currentLevel: number): number {
  return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
}

// 現在の経験値からレベルを計算する関数
export function calculateLevelFromXp(totalXp: number): number {
  let level = 1;
  let xpForNextLevel = calculateXpForNextLevel(level);

  while (totalXp >= xpForNextLevel) {
    totalXp -= xpForNextLevel;
    level++;
    xpForNextLevel = calculateXpForNextLevel(level);
  }

  return level;
}

// 基本的な経験値獲得のロジック
export function calculateXpGain(action: string, duration: number): number {
  const baseXp = {
    study: 10, // 10分の学習で10XP
    complete_task: 50, // タスク完了で50XP
    attend_event: 100, // イベント参加で100XP
    help_others: 30, // 他の学習者を助けることで30XP
    provide_feedback: 20, // フィードバック提供で20XP
    complete_quest: 200, // クエスト完了で200XP
    acquire_skill: 150, // スキル習得で150XP
    daily_checkin: 25, // デイリーチェックインで25XP
  };

  switch (action) {
    case "study":
      return Math.floor(baseXp.study * (duration / 10)); // 10分単位で計算
    case "complete_task":
    case "attend_event":
    case "help_others":
    case "provide_feedback":
    case "complete_quest":
    case "acquire_skill":
    case "daily_checkin":
      return baseXp[action];
    default:
      return 0;
  }
}

// 学習ストリークによるボーナス計算
export function calculateStreakBonus(
  streakDays: number,
  baseXp: number
): number {
  if (streakDays >= 7) {
    return baseXp * 2; // 7日以上のストリークで2倍のXP
  } else if (streakDays >= 3) {
    return Math.floor(baseXp * 1.5); // 3-6日のストリークで1.5倍のXP
  }
  return baseXp;
}

// 長時間学習ボーナスの計算
export function calculateLongStudyBonus(
  duration: number,
  baseXp: number
): number {
  if (duration >= 120) {
    // 2時間以上の学習
    return Math.floor(baseXp * 1.5);
  } else if (duration >= 60) {
    // 1時間以上の学習
    return Math.floor(baseXp * 1.2);
  }
  return baseXp;
}

// タスクの難易度に基づくXP調整
export function adjustXpForTaskDifficulty(
  difficulty: "easy" | "medium" | "hard",
  baseXp: number
): number {
  switch (difficulty) {
    case "easy":
      return baseXp;
    case "medium":
      return Math.floor(baseXp * 1.5);
    case "hard":
      return baseXp * 2;
    default:
      return baseXp;
  }
}

// イベントの重要度に基づくXP調整
export function adjustXpForEventImportance(
  importance: "low" | "medium" | "high",
  baseXp: number
): number {
  switch (importance) {
    case "low":
      return baseXp;
    case "medium":
      return Math.floor(baseXp * 1.5);
    case "high":
      return baseXp * 2;
    default:
      return baseXp;
  }
}

// 学習の一貫性ボーナス（週単位）
export function calculateConsistencyBonus(
  studyDaysThisWeek: number,
  baseXp: number
): number {
  if (studyDaysThisWeek >= 5) {
    return Math.floor(baseXp * 1.3); // 週5日以上の学習で30%ボーナス
  }
  return baseXp;
}

// 総合的な経験値計算（例）
export function calculateTotalXp(
  action: string,
  duration: number,
  streakDays: number,
  difficulty: "easy" | "medium" | "hard",
  importance: "low" | "medium" | "high",
  studyDaysThisWeek: number
): number {
  let baseXp = calculateXpGain(action, duration);
  baseXp = calculateStreakBonus(streakDays, baseXp);
  baseXp = calculateLongStudyBonus(duration, baseXp);
  baseXp = adjustXpForTaskDifficulty(difficulty, baseXp);
  baseXp = adjustXpForEventImportance(importance, baseXp);
  baseXp = calculateConsistencyBonus(studyDaysThisWeek, baseXp);
  return baseXp;
}
