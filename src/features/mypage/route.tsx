export const myPageRoute = {
  path: '/mypage',
  lazy: async () => {
    const MyPage = (await import('./MyPage')).default;
    return { Component: MyPage };
  },
};
