export interface EngduSummary {
  id: number;
  type: '지문' | '상황극';
  title: string;
  createdAt: Date;
  progress: number;
}
