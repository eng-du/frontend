import type { Meta, StoryObj } from '@storybook/react-vite';
import ConfettiEffect from './ConfettiEffect';

const meta: Meta<typeof ConfettiEffect> = {
  title: 'Components/Common/ConfettiEffect',
  component: ConfettiEffect,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // ConfettiEffect uses document.getElementById('root')
      if (!document.getElementById('root')) {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ConfettiEffect>;

export const Default: Story = {};
