import type { EngduQuestion } from './quiz';

export interface EngduSummary {
  id: number;
  type: '지문' | '상황극';
  title: string;
  createdAt: Date;
  progress: number;
}

export interface DetailEngdu {
  engduId: number;
  title: string;
  topic: string;
  articles: EngduArticle[];
  questions: EngduQuestion[];
}

export interface EngduArticle {
  content: string;
  translation: string;
}
