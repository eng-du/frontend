import type { EngduQuestion } from './quiz';

export type EngduType = '지문' | '상황극';

export type SortOption = '최신순' | '오래된순';
export type TypeOption = '전체' | '지문' | '상황극';
export type StatusOption = '전체' | '완료' | '미완료';

export const SORT_MAP: Record<string, SortOption> = {
  latest: '최신순',
  oldest: '오래된순',
};

export const TYPE_MAP: Record<string, TypeOption> = {
  all: '전체',
  article: '지문',
  roleplay: '상황극',
};

export const STATUS_MAP: Record<string, StatusOption> = {
  all: '전체',
  done: '완료',
  undone: '미완료',
};

export const REVERSE_SORT_MAP: Record<SortOption, string> = {
  최신순: 'latest',
  오래된순: 'oldest',
};

export const REVERSE_TYPE_MAP: Record<TypeOption, string> = {
  전체: 'all',
  지문: 'article',
  상황극: 'roleplay',
};

export const REVERSE_STATUS_MAP: Record<StatusOption, string> = {
  전체: 'all',
  완료: 'done',
  미완료: 'undone',
};

export interface EngduSummary {
  engduId: number;
  title: string;
  type: EngduType;
  topic: string;
  solvedCount: number;
  totalCount: number;
  isAllSolved: boolean;
  createdAt: string;
}

export interface EngduMeta {
  title: string;
  topic: string;
}

export interface EngduPart {
  article: EngduArticle;
  questions: EngduQuestion[];
}

export interface DetailEngdu {
  engduId: number;
  meta: EngduMeta;
  parts: EngduPart[];
}

export interface EngduArticle {
  chunks: EngduChunk[];
}

export interface EngduChunk {
  en: string;
  kor: string;
}
