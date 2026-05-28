export const runAndLearnRoute = {
  path: '/run-and-learn',
  lazy: async () => {
    const RunAndLearn = (await import('./RunAndLearn')).default;
    return { Component: RunAndLearn };
  },
};
