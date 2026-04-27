export const homeRoute = {
  path: '/',
  lazy: async () => {
    const Home = (await import('./Home')).default;
    return { Component: Home };
  },
};
