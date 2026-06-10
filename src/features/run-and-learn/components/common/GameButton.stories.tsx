import type { Meta, StoryObj } from '@storybook/react';
import GameButton from './GameButton';

const meta = {
  title: 'Features/RunAndLearn/Common/GameButton',
  component: GameButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GameButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'START!',
    variant: 'primary',
    size: 'lg',
    onClick: () => console.log('Primary click'),
  },
};

export const Secondary: Story = {
  args: {
    children: '게임 방법',
    variant: 'secondary',
    size: 'md',
    onClick: () => console.log('Secondary click'),
  },
};

export const Loading: Story = {
  args: {
    children: '로딩 중...',
    variant: 'primary',
    size: 'lg',
    isLoading: true,
    onClick: () => {},
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    variant: 'primary',
    size: 'md',
    disabled: true,
    onClick: () => {},
  },
};
