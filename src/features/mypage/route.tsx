import { Outlet } from 'react-router';

export const myPageRoute = {
  path: '/mypage',
  element: <Outlet />,
  children: [
    {
      index: true,
      lazy: async () => {
        const MyPage = (await import('./MyPage')).default;
        return { Component: MyPage };
      },
    },
    {
      path: 'my-info',
      lazy: async () => {
        const MyInfo = (await import('./MyInfo')).default;
        return { Component: MyInfo };
      },
    },
  ],
};
