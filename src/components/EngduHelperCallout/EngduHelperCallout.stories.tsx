import type { Meta, StoryObj } from '@storybook/react-vite';
import EngduHelperCallout from './EngduHelperCallout';

const meta: Meta<typeof EngduHelperCallout> = {
  title: 'Components/Common/EngduHelperCallout',
  component: EngduHelperCallout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative h-60 w-80 bg-surface-neutral-weak">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EngduHelperCallout>;

export const Default: Story = {
  args: {
    children: '무엇을 도와드릴까요?',
  },
};

export const MultipleLines: Story = {
  args: {
    children: (
      <div>
        첫 번째 줄<br />
        두 번째 줄
      </div>
    ),
  },
};
