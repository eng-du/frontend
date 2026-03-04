import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';
import { BrowserRouter } from 'react-router';
import { AuthContext } from '@/store/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof Header> = {
  title: 'Components/Common/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <AuthContext
        value={{
          user: { name: '테스트 유저', userId: 1 },
          isPending: false,
          refreshMe: () => { },
          clearAuth: () => { },
        }}
      >
        <Story />
      </AuthContext>
    ),
  ],
};

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <AuthContext
        value={{
          user: null,
          isPending: false,
          refreshMe: () => { },
          clearAuth: () => { },
        }}
      >
        <Story />
      </AuthContext>
    ),
  ],
};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <AuthContext
        value={{
          user: null,
          isPending: true,
          refreshMe: () => { },
          clearAuth: () => { },
        }}
      >
        <Story />
      </AuthContext>
    ),
  ],
};
