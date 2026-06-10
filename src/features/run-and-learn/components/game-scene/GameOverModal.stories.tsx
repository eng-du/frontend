import type { Meta, StoryObj } from '@storybook/react';
import GameOverModal from './GameOverModal';

const meta = {
  title: 'Features/RunAndLearn/GameScene/GameOverModal',
  component: GameOverModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative w-[1240px] h-[890px] bg-slate-800 overflow-hidden">
        <div 
          className="absolute w-[1240px] h-[890px] left-1/2 top-1/2 pointer-events-none z-10 overflow-hidden"
          style={{ transform: 'translate(-50%, -50%) scale(1)' }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof GameOverModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    correctCount: 7,
    onRestart: () => console.log('Restart clicked'),
  },
};

export const HighScore: Story = {
  args: {
    isOpen: true,
    correctCount: 14,
    onRestart: () => console.log('Restart clicked'),
  },
};
