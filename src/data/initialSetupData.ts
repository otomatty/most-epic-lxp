export interface InterestOption {
  id: string; // idを追加
  value: string;
  label: string;
  emoji: string;
}

export const adultInterestOptions: InterestOption[] = [
  {
    id: "programming",
    value: "programming",
    label: "プログラミング",
    emoji: "💻",
  },
  { id: "design", value: "design", label: "デザイン", emoji: "🎨" },
  { id: "marketing", value: "marketing", label: "マーケティング", emoji: "📊" },
  {
    id: "data-science",
    value: "data-science",
    label: "データサイエンス",
    emoji: "📈",
  },
  { id: "writing", value: "writing", label: "ライティング", emoji: "✍️" },
  { id: "language", value: "language", label: "語学", emoji: "🗣️" },
  { id: "business", value: "business", label: "ビジネス", emoji: "💼" },
  { id: "finance", value: "finance", label: "金融", emoji: "💰" },
  { id: "health", value: "health", label: "健康", emoji: "🏋️‍♀️" },
  { id: "music", value: "music", label: "音楽", emoji: "🎵" },
  { id: "art", value: "art", label: "芸術", emoji: "🎭" },
  { id: "cooking", value: "cooking", label: "料理", emoji: "👨‍🍳" },
];

export const studentInterestOptions: InterestOption[] = [
  {
    id: "study-skills",
    value: "study-skills",
    label: "学習スキル",
    emoji: "📚",
  },
  {
    id: "time-management",
    value: "time-management",
    label: "時間管理",
    emoji: "⏰",
  },
  {
    id: "programming",
    value: "programming",
    label: "プログラミング",
    emoji: "💻",
  },
  { id: "science", value: "science", label: "科学", emoji: "🔬" },
  { id: "math", value: "math", label: "数学", emoji: "🔢" },
  { id: "language", value: "language", label: "語学", emoji: "🗣️" },
  { id: "literature", value: "literature", label: "文学", emoji: "📖" },
  { id: "history", value: "history", label: "歴史", emoji: "🏛️" },
  { id: "art", value: "art", label: "芸術", emoji: "🎨" },
  { id: "music", value: "music", label: "音楽", emoji: "🎵" },
  { id: "sports", value: "sports", label: "スポーツ", emoji: "⚽" },
  { id: "technology", value: "technology", label: "テクノロジー", emoji: "🤖" },
  { id: "environment", value: "environment", label: "環境", emoji: "🌍" },
  {
    id: "social-studies",
    value: "social-studies",
    label: "社会科学",
    emoji: "🌐",
  },
  {
    id: "career-planning",
    value: "career-planning",
    label: "進路計画",
    emoji: "🎓",
  },
];

export const learningGoalOptions = [
  { value: "career", label: "キャリアアップ" },
  { value: "hobby", label: "趣味" },
  { value: "skill-improvement", label: "スキルの向上" },
  { value: "certification", label: "資格取得" },
  { value: "other", label: "その他" },
];

export const learningStyleOptions = [
  { value: "self-study", label: "自習" },
  { value: "group-study", label: "グループ学習" },
  { value: "online-courses", label: "オンラインコース" },
  { value: "workshops", label: "ワークショップ" },
  { value: "other", label: "その他" },
];

export const learningTimeOptions = [
  { value: "less-than-1-hour", label: "1時間未満" },
  { value: "1-2-hours", label: "1〜2時間" },
  { value: "2-3-hours", label: "2〜3時間" },
  { value: "more-than-3-hours", label: "3時間以上" },
];

export const deviceOptions = [
  { value: "pc", label: "パソコン" },
  { value: "tablet", label: "タブレット" },
  { value: "smartphone", label: "スマートフォン" },
  { value: "other", label: "その他" },
];
