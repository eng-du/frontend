import QuizStepper from './QuizStepper';
import ProgressTitleSkeleton from '../skeleton/ProgressTitleSkeleton';

interface ProgressHeaderProps {
  title?: string;
  isInitialReady: boolean;
  isCompleteReady: boolean;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isQuestionsCorrected: boolean[];
}
function ProgressHeader({
  title,
  isInitialReady,
  isCompleteReady,
  step,
  setStep,
  isQuestionsCorrected,
}: ProgressHeaderProps) {
  return (
    <div className="grid h-35 w-full grid-cols-[7fr_5fr] gap-10 bg-surface-default px-25 pt-10">
      <div className="line-clamp-2 self-center font-pinkfong text-36">
        {!title ? <ProgressTitleSkeleton /> : title}
      </div>
      <QuizStepper
        step={step}
        setStep={setStep}
        isQuestionsCorrected={isQuestionsCorrected}
        isInitialReady={isInitialReady}
        isCompleteReady={isCompleteReady}
      />
    </div>
  );
}

export default ProgressHeader;
