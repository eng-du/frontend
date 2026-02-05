import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from './Pagination';
import { useState } from 'react';

const PaginationWrapper = (args: { totalPages: number; page: number }) => {
  const [page, setPage] = useState(args.page || 1);
  return <Pagination {...args} page={page} onChangePage={setPage} />;
};

const meta: Meta<typeof Pagination> = {
  title: 'Components/Common/Pagination/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Short: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 5,
    page: 1,
  },
};

export const Long: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 20,
    page: 1,
  },
};

export const Middle: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 20,
    page: 10,
  },
};

export const End: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 20,
    page: 18,
  },
};
