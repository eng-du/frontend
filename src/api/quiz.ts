import api from './api';

interface PostQuizSubmissionProps {
  engduId: number;
  questionId: number;
  userAnswer: number;
}

export async function postQuizSubmission({
  engduId,
  questionId,
  userAnswer,
}: PostQuizSubmissionProps) {
  const res = await api.post(`/engdu/${engduId}/question/${questionId}/submission`, {
    userAnswer,
  });
  return res.data;
}
