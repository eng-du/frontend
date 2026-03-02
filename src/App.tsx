import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './features/home/Home';
import { engduLearningRoute } from './features/engdu-learning/route';
import Login from './features/login/Login';
import CallbackGoogle from './features/login/CallbackGoogle';
import Layout from './Layout';
import RootProviders from './RootProviders';
import MyPage from './features/mypage/MyPage';
import { policyRoute } from './features/policy/route';

function App() {
  const router = createBrowserRouter([
    {
      element: <RootProviders />,
      children: [
        {
          element: <Layout />,
          children: [
            { path: '/', element: <Home /> },
            engduLearningRoute,
            { path: '/mypage', element: <MyPage /> },
            policyRoute,
          ],
        },
        { path: '/login', element: <Login /> },
        { path: '/oauth/callback/google', element: <CallbackGoogle /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
