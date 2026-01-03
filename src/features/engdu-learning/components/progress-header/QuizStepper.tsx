import QuizStepIndicator from './QuizStepIndicator';

interface QuizStepperProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isQuestionsCorrected: boolean[];
}

function QuizStepper({ step, setStep, isQuestionsCorrected }: QuizStepperProps) {
  return (
    <div className="flex items-center gap-4 self-center">
      {isQuestionsCorrected.map((isCorrected, idx) => (
        <QuizStepIndicator
          key={idx}
          step={idx}
          isLocked={!isCorrected}
          isActive={step === idx}
          setStep={setStep}
        />
      ))}
    </div>
  );
}

export default QuizStepper;
