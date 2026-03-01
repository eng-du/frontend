import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import RootProviders from './RootProviders';
import { policyRoute } from './features/policy/route';
import { homeRoute } from './features/home/route';
import { engduLearningRoute } from './features/engdu-learning/route';
import { myPageRoute } from './features/mypage/route';
import { loginRoute, callbackGoogleRoute } from './features/login/route';
import { notFoundRoute } from './features/not-found/route';

function App() {
  const router = createBrowserRouter([
    {
      element: <RootProviders />,
      children: [
        {
          element: <Layout />,
          children: [homeRoute, engduLearningRoute, myPageRoute, policyRoute],
        },
        loginRoute,
        callbackGoogleRoute,
        notFoundRoute,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
