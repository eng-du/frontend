import type { Meta, StoryObj } from '@storybook/react';
import RunAndLearnIllustration from './RunAndLearnIllustration';

const meta: Meta<typeof RunAndLearnIllustration> = {
  title: 'Features/Home/RunAndLearnIllustration',
  component: RunAndLearnIllustration,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof RunAndLearnIllustration>;

export const Default: Story = {
  render: () => (
    <div className="bg-[#F5F6F8] inline-block">
      <RunAndLearnIllustration />
    </div>
  ),
};
