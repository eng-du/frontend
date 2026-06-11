import api from './api';

export interface CreateRunAndLearnSessionResponse {
  sessionId: number;
}

export interface RunAndLearnQuestionResponse {
  id: number;
  question: string;
  answer: number; // 1, 2, or 3
  choice1: string;
  choice2: string;
  choice3: string;
  explanation: string;
}

export interface SubmittedAnswer {
  questionId: number;
  userAnswer: number;
}

export interface EndRunAndLearnSessionRequest {
  clientTotalScore: number;
  submittedAnswers: SubmittedAnswer[];
}

export interface LeaderboardUserResponse {
  rank: number;
  userName: string;
  bestScore: number;
  achievedAt: string;
}

export interface GetLeaderboardParams {
  rankingType: 'WEEKLY' | 'ALL_TIME';
  size?: number;
}

export interface GetMyLeaderboardParams {
  rankingType: 'WEEKLY' | 'ALL_TIME';
}

/** 런앤런 게임 세션 생성 */
export async function createRunAndLearnSession(): Promise<CreateRunAndLearnSessionResponse> {
  const res = await api.post<CreateRunAndLearnSessionResponse>('/run-and-learn');
  return res.data;
}

export interface GetRunAndLearnQuestionsParams {
  sessionId: number;
  startIndex: number;
  count: number;
}

/** 런앤런 문제 목록 조회 */
export async function getRunAndLearnQuestions(
  params: GetRunAndLearnQuestionsParams
): Promise<RunAndLearnQuestionResponse[]> {
  const { sessionId, startIndex, count } = params;
  const res = await api.get<RunAndLearnQuestionResponse[]>(
    `/run-and-learn/${sessionId}/question`,
    {
      params: { startIndex, count },
    }
  );
  return res.data;
}

/** 런앤런 세션 종료 및 결과 전송 */
export async function endRunAndLearnSession(
  sessionId: number,
  data: EndRunAndLearnSessionRequest
): Promise<void> {
  await api.post(`/run-and-learn/${sessionId}/end`, data);
}

/** 런앤런 리더보드 조회 */
export async function getLeaderboard(
  params: GetLeaderboardParams
): Promise<LeaderboardUserResponse[]> {
  const { rankingType, size = 10 } = params;
  const res = await api.get<LeaderboardUserResponse[]>('/run-and-learn/leaderboard', {
    params: { rankingType, size },
  });
  return res.data;
}

/** 내 런앤런 랭킹 조회 */
export async function getMyLeaderboard(
  params: GetMyLeaderboardParams
): Promise<LeaderboardUserResponse | null> {
  const { rankingType } = params;
  const res = await api.get<LeaderboardUserResponse | null>('/run-and-learn/leaderboard/me', {
    params: { rankingType },
  });
  if (res.status === 204) {
    return null;
  }
  return res.data;
}
