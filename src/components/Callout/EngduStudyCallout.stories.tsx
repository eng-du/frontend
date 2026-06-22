import type { Meta, StoryObj } from '@storybook/react-vite';
import EngduStudyCallout from './EngduStudyCallout';

const meta: Meta<typeof EngduStudyCallout> = {
  title: 'Components/Common/EngduStudyCallout',
  component: EngduStudyCallout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-neutral-weak relative h-60 w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EngduStudyCallout>;

export const Default: Story = {
  args: {
    children: '단어장을 보며 함께 공부해요!',
  },
};

export const MultipleLines: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-1">
        <div className="font-semibold">Part1 완료! 정말 대단해요 👏</div>
        <div>지금 Part 2를 열심히 쓰고 있어요.</div>
        <div>조금만 기다려주세요!</div>
      </div>
    ),
  },
};
