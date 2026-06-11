import type { Meta, StoryObj } from '@storybook/react';
import RankingSkeleton from './RankingSkeleton';
import { StatCardSkeleton } from './StatCardSkeleton';
import { RankingItemSkeleton } from './RankingItemSkeleton';

const meta: Meta<typeof RankingSkeleton> = {
  title: 'Features/RunAndLearn/Ranking/RankingSkeleton',
  component: RankingSkeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[380px] p-[30px] bg-surface-weak rounded-2xl shadow-default">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RankingSkeleton>;

export const Default: Story = {};

export const SingleItem: StoryObj<typeof RankingItemSkeleton> = {
  render: () => <RankingItemSkeleton />,
};

export const SingleStatCard: StoryObj<typeof StatCardSkeleton> = {
  render: () => <StatCardSkeleton />,
};
