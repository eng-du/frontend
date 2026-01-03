export type QuizStatus = 'idle' | 'correct' | 'incorrect';

export interface EngduQuestion {
  questionId: number;
  content: string;
  choices: EngduChoice[];
  isCorrected: boolean;
  answer: number | null;
}

export interface EngduChoice {
  seq: number;
  content: string;
  explanation: string;
}
