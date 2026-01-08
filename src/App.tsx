import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './Layout';
import Home from './features/home/Home';
import EngduLearning from './features/engdu-learning/EngduLeaning';
import Login from './features/login/Login';
import CallbackGoogle from './features/login/CallbackGoogle';
import { AuthProvider } from './store/AuthProvider';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/learning', element: <EngduLearning /> },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/oauth/callback/google',
      element: <CallbackGoogle />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
