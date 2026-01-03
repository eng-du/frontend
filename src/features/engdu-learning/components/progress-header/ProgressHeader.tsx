import QuizStepper from './QuizStepper';

interface ProgressHeaderProps {
  title: string;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isQuestionsCorrected: boolean[];
}

function ProgressHeader({ title, step, setStep, isQuestionsCorrected }: ProgressHeaderProps) {
  return (
    <div className="grid h-35 w-full grid-cols-[7fr_5fr] gap-10 bg-surface-default px-25 pt-10">
      <div className="self-center font-pinkfong text-36">{title}</div>
      <QuizStepper step={step} setStep={setStep} isQuestionsCorrected={isQuestionsCorrected} />
    </div>
  );
}

export default ProgressHeader;
