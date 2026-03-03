import { Outlet, ScrollRestoration } from 'react-router';
import { AuthProvider } from '@/store/AuthProvider';

export default function RootProviders() {
  return (
    <AuthProvider>
      <Outlet />
      <ScrollRestoration />
    </AuthProvider>
  );
}
