export const engduLearningRoute = {
  path: '/learning/:engduId',
  lazy: async () => {
    const EngduLearning = (await import('./EngduLeaning')).default;
    return { Component: EngduLearning };
  },
};
