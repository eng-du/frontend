import type { Meta, StoryObj } from '@storybook/react-vite';
import PaginationItem from './PaginationItem';

const meta: Meta<typeof PaginationItem> = {
  title: 'Components/Common/Pagination/PaginationItem',
  component: PaginationItem,
  tags: ['autodocs'],
  argTypes: {
    onChangePage: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationItem>;

export const Default: Story = {
  args: {
    page: 1,
    active: false,
  },
};

export const Active: Story = {
  args: {
    page: 1,
    active: true,
  },
};
