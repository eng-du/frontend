import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Common/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">카드 제목</h3>
        <p className="text-text-secondary">카드 내용이 여기에 들어갑니다.</p>
      </div>
    ),
  },
};

export const CustomClassName: Story = {
  args: {
    children: '커스텀 클래스가 적용된 카드',
    className: 'bg-surface-accent border border-border-accent',
  },
};
