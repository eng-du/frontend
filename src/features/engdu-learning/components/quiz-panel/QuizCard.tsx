import Card from '@/components/Card';
import { useState } from 'react';
import type { EngduChoice, EngduQuestion, QuizStatus } from '@/types/quiz';
import {
  QuizOptionIdleItem,
  QuizOptionIncorrectItem,
  QuizOptionCorrectItem,
} from './QuizOptionItem';
import { QuizFinishButton, QuizNextButton, QuizRetryButton, QuizSubmitButton } from './QuizButton';
import QuizFeedbackCard from './QuizFeedbackCard';

interface QuizCardProps {
  question: EngduQuestion;
  setQuestions: React.Dispatch<React.SetStateAction<EngduQuestion[]>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function QuizCard({ question, setQuestions, step, setStep }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<EngduChoice | null>(
    question.isCorrected ? question.choices[question.answer! - 1] : null,
  );
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(
    question.isCorrected ? 'correct' : 'idle',
  );

  return (
    <Card className="h-fit w-full">
      <div className="text-20">{question.content}</div>
      <ul className="flex w-full flex-col gap-2.5">
        {question.choices.map((option) => {
          switch (quizStatus) {
            case 'idle':
              return (
                <QuizOptionIdleItem
                  key={option.seq}
                  option={option}
                  isSelected={selectedOption?.seq === option.seq}
                  onClickHandler={() => setSelectedOption(option)}
                />
              );
            case 'incorrect':
              return (
                <QuizOptionIncorrectItem
                  key={option.seq}
                  option={option}
                  isSelected={selectedOption?.seq === option.seq}
                />
              );
            case 'correct':
              return (
                <QuizOptionCorrectItem
                  key={option.seq}
                  option={option}
                  isSelected={selectedOption?.seq === option.seq}
                />
              );
          }
        })}
      </ul>

      {quizStatus === 'correct' && (
        <QuizFeedbackCard status="correct" feedback={selectedOption!.explanation} />
      )}

      {quizStatus === 'incorrect' && (
        <QuizFeedbackCard status="incorrect" feedback={selectedOption!.explanation} />
      )}

      {quizStatus === 'idle' && (
        <QuizSubmitButton
          onClickHandler={() => {
            // TODO: 퀴즈 제출 API 연동
            // 현재는 mock data 기반으로 동작(반드시 퀴즈의 정답이 1)
            if (selectedOption?.seq === 1) {
              setQuestions((prev) =>
                prev.map((question, idx) =>
                  idx === step
                    ? {
                        ...question,
                        isCorrected: true,
                        answer: selectedOption?.seq,
                      }
                    : question,
                ),
              );
              setQuizStatus('correct');
            } else {
              setQuizStatus('incorrect');
            }
          }}
          disabled={selectedOption === null}
        />
      )}

      {quizStatus === 'incorrect' && (
        <QuizRetryButton
          onClickHandler={() => {
            setQuizStatus('idle');
            setSelectedOption(null);
          }}
        />
      )}

      {quizStatus === 'correct' &&
        (step < 3 ? (
          <QuizNextButton
            onClickHandler={() => {
              setStep(step + 1);
            }}
          />
        ) : (
          <QuizFinishButton onClickHandler={() => {}} />
        ))}
    </Card>
  );
}

export default QuizCard;
