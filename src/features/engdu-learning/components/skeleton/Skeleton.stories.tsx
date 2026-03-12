import type { Meta, StoryObj } from '@storybook/react-vite';
import EngduLearningSkeleton from './EngduLearningSkeleton';
import QuizCardSkeleton from './QuizCardSkeleton';
import ReadingCardSkeleton from './ReadingCardSkeleton';
import TitleSkeleton from './TitleSkeleton';
import QuizStepIndicatorSkeleton from './QuizStepIndicatorSkeleton';
import ReadingContentSkeleton from './ReadingContentSkeleton';
import QuizContentSkeleton from './QuizContentSkeleton';

const meta: Meta = {
  title: 'Features/EngduLearning/Skeletons',
  tags: ['autodocs'],
};

export default meta;

export const FullPageDesktop: StoryObj<typeof EngduLearningSkeleton> = {
  render: () => (
    <div className="h-screen w-full bg-surface-default">
      <EngduLearningSkeleton />
    </div>
  ),
};

export const FullPageMobileReading: StoryObj<typeof EngduLearningSkeleton> = {
  render: () => (
    <div className="h-screen w-full bg-surface-default">
      <EngduLearningSkeleton isMobile={true} initialTab="지문" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const FullPageMobileQuiz: StoryObj<typeof EngduLearningSkeleton> = {
  render: () => (
    <div className="h-screen w-full bg-surface-default">
      <EngduLearningSkeleton isMobile={true} initialTab="퀴즈" />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Title: StoryObj<typeof TitleSkeleton> = {
  render: () => <TitleSkeleton />,
};

export const QuizStepIndicator: StoryObj<typeof QuizStepIndicatorSkeleton> = {
  render: () => <QuizStepIndicatorSkeleton />,
};

export const ReadingCard: StoryObj<typeof ReadingCardSkeleton> = {
  render: () => (
    <div className="max-w-2xl bg-surface-default p-10">
      <ReadingCardSkeleton />
    </div>
  ),
};

export const ReadingContent: StoryObj<typeof ReadingContentSkeleton> = {
  render: () => <ReadingContentSkeleton />,
};

export const QuizCard: StoryObj<typeof QuizCardSkeleton> = {
  render: () => (
    <div className="max-w-xl p-10">
      <QuizCardSkeleton />
    </div>
  ),
};

export const QuizContent: StoryObj<typeof QuizContentSkeleton> = {
  render: () => <QuizContentSkeleton />,
};
