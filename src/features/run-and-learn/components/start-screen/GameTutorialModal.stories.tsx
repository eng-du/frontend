import type { Meta, StoryObj } from '@storybook/react';
import GameTutorialModal from './GameTutorialModal';

const meta = {
  title: 'Features/RunAndLearn/StartScreen/GameTutorialModal',
  component: GameTutorialModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GameTutorialModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
  },
};
