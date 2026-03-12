import { useState } from 'react';
import type { EngduChoice, EngduQuestion, QuizStatus } from '@/types/quiz';
import {
  QuizOptionIdleItem,
  QuizOptionIncorrectItem,
  QuizOptionCorrectItem,
} from './QuizOptionItem';
import { QuizFinishButton, QuizNextButton, QuizRetryButton, QuizSubmitButton } from './QuizButton';
import QuizFeedbackCard from './QuizFeedbackCard';
import { postQuizSubmission } from '@/api/quiz';

interface QuizContentProps {
  engduId: number;
  questionId: number;
  question: EngduQuestion;
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onFinish: () => void;
}

function QuizContent({
  engduId,
  questionId,
  question,
  handleQuestion,
  step,
  setStep,
  onFinish,
}: QuizContentProps) {
  const [selectedOption, setSelectedOption] = useState<EngduChoice | null>(
    question.isCorrected ? question.choices[question.answer! - 1] : null,
  );
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(
    question.isCorrected ? 'correct' : 'idle',
  );

  return (
    <div className="flex w-full flex-col gap-5">
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
          onClickHandler={async () => {
            const { correct } = await postQuizSubmission({
              engduId,
              questionId,
              userAnswer: selectedOption!.seq,
            });

            handleQuestion(questionId, correct, selectedOption!.seq);

            if (correct) {
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
          <QuizFinishButton onClickHandler={onFinish} />
        ))}
    </div>
  );
}

export default QuizContent;
