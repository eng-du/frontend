import type { Meta, StoryObj } from '@storybook/react';
import Medal from './Medal';

const meta = {
  title: 'Features/RunAndLearn/Ranking/Medal',
  component: Medal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Medal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gold: Story = {
  args: {
    rank: 1,
  },
};

export const Silver: Story = {
  args: {
    rank: 2,
  },
};

export const Bronze: Story = {
  args: {
    rank: 3,
  },
};
