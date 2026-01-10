import { Outlet } from 'react-router';
import { AuthProvider } from '@/store/AuthProvider';

export default function RootProviders() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
