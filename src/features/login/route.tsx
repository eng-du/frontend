export const loginRoute = {
  path: '/login',
  lazy: async () => {
    const Login = (await import('./Login')).default;
    return { Component: Login };
  },
};

export const callbackGoogleRoute = {
  path: '/oauth/callback/google',
  lazy: async () => {
    const CallbackGoogle = (await import('./CallbackGoogle')).default;
    return { Component: CallbackGoogle };
  },
};
