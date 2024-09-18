export interface Job {
  id: string;
  title: string;
  description: string;
  role: string;
  levels: {
    level: number;
    title: string;
    description: string;
  }[];
}
