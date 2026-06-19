import type { Meta, StoryObj } from '@storybook/react-vite';
import EngduCard from './EngduCard';
import { BrowserRouter } from 'react-router';

const mockEngdu = {
  engduId: 1,
  title: '환경 보호와 마이크로비즈 - 작은 플라스틱의 큰 영향',
  type: '지문' as const,
  topic: '환경 보호와 마이크로비즈',
  solvedCount: 3,
  totalCount: 4,
  isAllSolved: false,
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2일 전
};

const meta: Meta<typeof EngduCard> = {
  title: 'Features/Home/EngduCard',
  component: EngduCard,
  tags: ['autodocs'],
  argTypes: {
    device: {
      control: 'select',
      options: ['desktop', 'mobile'],
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="flex items-center justify-center p-4 bg-surface-default min-h-[350px]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EngduCard>;

export const Desktop: Story = {
  args: {
    engdu: mockEngdu,
    device: 'desktop',
  },
};

export const Mobile: Story = {
  args: {
    engdu: mockEngdu,
    device: 'mobile',
  },
};

export const AllSolvedDesktop: Story = {
  args: {
    engdu: {
      ...mockEngdu,
      solvedCount: 4,
      isAllSolved: true,
    },
    device: 'desktop',
  },
};

export const AllSolvedMobile: Story = {
  args: {
    engdu: {
      ...mockEngdu,
      solvedCount: 4,
      isAllSolved: true,
    },
    device: 'mobile',
  },
};
