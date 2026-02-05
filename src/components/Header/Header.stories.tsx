import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';
import { BrowserRouter } from 'react-router';
import { AuthContext } from '@/store/AuthContext';

const meta: Meta<typeof Header> = {
  title: 'Components/Common/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
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
          user: { name: '테스트 유저' },
          loading: false,
          isAuthenticated: true,
          refreshMe: async () => ({ name: '테스트 유저' }),
          clearAuth: () => {},
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
          loading: false,
          isAuthenticated: false,
          refreshMe: async () => ({ name: '로그아웃됨' }),
          clearAuth: () => {},
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
          loading: true,
          isAuthenticated: false,
          refreshMe: async () => ({ name: '로딩중...' }),
          clearAuth: () => {},
        }}
      >
        <Story />
      </AuthContext>
    ),
  ],
};
