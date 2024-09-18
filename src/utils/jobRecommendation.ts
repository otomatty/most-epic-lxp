import { Job } from "../types/jobs";
import { jobs } from "../data/jobsData";

interface UserProfile {
  interests: string[];
  learningGoal: string;
  learningStyle: string;
  learningTime: string;
  device: string;
}

export function recommendJobs(userProfile: UserProfile): Job[] {
  const recommendedJobs: Job[] = [];

  // 各ジョブに対してスコアを計算
  const jobScores = jobs.map((job) => ({
    job,
    score: calculateJobScore(job, userProfile),
  }));

  // スコアの高い順にソート
  jobScores.sort((a, b) => b.score - a.score);

  // 上位3つのジョブを推奨
  return jobScores.slice(0, 3).map((item) => item.job);
}

function calculateJobScore(job: Job, userProfile: UserProfile): number {
  let score = 0;

  // 興味関心とジョブの関連性をスコア化
  score += calculateInterestScore(job, userProfile.interests);

  // 学習目標とジョブの関連性をスコア化
  score += calculateLearningGoalScore(job, userProfile.learningGoal);

  // 学習スタイルとジョブの適合性をスコア化
  score += calculateLearningStyleScore(job, userProfile.learningStyle);

  // 学習時間とジョブの適合性をスコア化
  score += calculateLearningTimeScore(job, userProfile.learningTime);

  // 使用デバイスとジョブの適合性をスコア化
  score += calculateDeviceScore(job, userProfile.device);

  return score;
}

function calculateInterestScore(job: Job, interests: string[]): number {
  // ジョブの説明と興味関心のキーワードマッチングを行う
  const matchingInterests = interests.filter((interest) =>
    job.description.toLowerCase().includes(interest.toLowerCase())
  );
  return matchingInterests.length * 2;
}

function calculateLearningGoalScore(job: Job, learningGoal: string): number {
  // 学習目標とジョブの説明のキーワードマッチングを行う
  return job.description.toLowerCase().includes(learningGoal.toLowerCase())
    ? 3
    : 0;
}

function calculateLearningStyleScore(job: Job, learningStyle: string): number {
  // 学習スタイルとジョブの適合性を評価
  const styleScores: { [key: string]: string[] } = {
    自己学習: ["賢者", "錬金術師"],
    グループ学習: ["吟遊詩人", "案内人"],
    プロジェクトベース: ["鍛冶師", "工匠"],
    メンター指導: ["守護者", "司祭"],
  };

  return styleScores[learningStyle]?.includes(job.title) ? 2 : 0;
}

function calculateLearningTimeScore(job: Job, learningTime: string): number {
  // 学習時間とジョブの適合性を評価
  const timeScores: { [key: string]: string[] } = {
    毎日1時間未満: ["書記官", "案内人"],
    "毎日1-2時間": ["吟遊詩人", "交易商人"],
    "毎日2-3時間": ["鍛冶師", "錬金術師"],
    毎日3時間以上: ["賢者", "守護者"],
  };

  return timeScores[learningTime]?.includes(job.title) ? 2 : 0;
}

function calculateDeviceScore(job: Job, device: string): number {
  // 使用デバイスとジョブの適合性を評価
  const deviceScores: { [key: string]: string[] } = {
    スマートフォン: ["書記官", "案内人"],
    タブレット: ["吟遊詩人", "交易商人"],
    ノートPC: ["鍛冶師", "錬金術師"],
    デスクトップPC: ["賢者", "守護者"],
  };

  return deviceScores[device]?.includes(job.title) ? 1 : 0;
}
