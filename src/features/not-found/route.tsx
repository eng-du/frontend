export const notFoundRoute = {
  path: '*',
  lazy: async () => {
    const NotFound = (await import('./NotFound')).default;
    return { Component: NotFound };
  },
};
