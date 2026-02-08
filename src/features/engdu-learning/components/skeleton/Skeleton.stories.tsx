import type { Meta, StoryObj } from '@storybook/react-vite';
import EngduLearningSkeleton from './EngduLearningSkeleton';
import QuizCardSkeleton from './QuizCardSkeleton';
import ReadingCardSkeleton from './ReadingCardSkeleton';
import ProgressTitleSkeleton from './ProgressTitleSkeleton';
import QuizStepIndicatorSkeleton from './QuizStepIndicatorSkeleton';

const meta: Meta = {
  title: 'Features/EngduLearning/Skeletons',
  tags: ['autodocs'],
};

export default meta;

export const FullPage: StoryObj<typeof EngduLearningSkeleton> = {
  render: () => (
    <div className="h-screen w-full bg-surface-default">
      <EngduLearningSkeleton />
    </div>
  ),
};

export const ProgressTitle: StoryObj<typeof ProgressTitleSkeleton> = {
  render: () => <ProgressTitleSkeleton />,
};

export const QuizStepIndicator: StoryObj<typeof QuizStepIndicatorSkeleton> = {
  render: () => <QuizStepIndicatorSkeleton />,
};

export const ReadingCard: StoryObj<typeof ReadingCardSkeleton> = {
  render: () => (
    <div className="flex h-screen items-center justify-center bg-surface-default p-10">
      <div className="w-full max-w-2xl">
        <ReadingCardSkeleton />
      </div>
    </div>
  ),
};

export const QuizCard: StoryObj<typeof QuizCardSkeleton> = {
  render: () => (
    <div className="max-w-xl p-10">
      <QuizCardSkeleton />
    </div>
  ),
};
