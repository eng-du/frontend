import CallbackGoogle from './CallbackGoogle';
import Login from './Login';

export const loginRoute = { path: '/login', element: <Login /> };
export const callbackGoogleRoute = { path: '/oauth/callback/google', element: <CallbackGoogle /> };
