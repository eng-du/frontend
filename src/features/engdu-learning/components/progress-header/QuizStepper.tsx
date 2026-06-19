import QuizStepIndicatorSkeleton from '../skeleton/QuizStepIndicatorSkeleton';
import QuizStepIndicator from './QuizStepIndicator';

interface QuizStepperProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isQuestionsCorrected: boolean[];
  isInitialReady: boolean;
  isCompleteReady: boolean;
  isDesktop?: boolean;
}

function QuizStepper({
  step,
  setStep,
  isQuestionsCorrected,
  isInitialReady,
  isCompleteReady,
  isDesktop = true,
}: QuizStepperProps) {
  return (
    <div className="flex items-center gap-4 self-center">
      {!isInitialReady ? (
        <>
          <QuizStepIndicatorSkeleton isDesktop={isDesktop} />
          <QuizStepIndicatorSkeleton isDesktop={isDesktop} />
        </>
      ) : (
        <>
          {[0, 1].map((idx) => {
            const isCorrected = isQuestionsCorrected[idx] ?? false;
            const isReachable = idx === 0 || isQuestionsCorrected[idx - 1];
            return (
              <QuizStepIndicator
                key={idx}
                step={idx}
                isLocked={!isReachable}
                isCorrected={isCorrected}
                isActive={step === idx}
                isDesktop={isDesktop}
                setStep={setStep}
              />
            );
          })}
        </>
      )}

      {!isCompleteReady ? (
        <>
          <QuizStepIndicatorSkeleton isDesktop={isDesktop} />
          <QuizStepIndicatorSkeleton isDesktop={isDesktop} />
        </>
      ) : (
        <>
          {[2, 3].map((idx) => {
            const isCorrected = isQuestionsCorrected[idx] ?? false;
            const isReachable = isQuestionsCorrected[idx - 1];
            return (
              <QuizStepIndicator
                key={idx}
                step={idx}
                isLocked={!isReachable}
                isCorrected={isCorrected}
                isActive={step === idx}
                isDesktop={isDesktop}
                setStep={setStep}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default QuizStepper;
