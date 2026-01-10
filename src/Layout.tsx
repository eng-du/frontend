import { Outlet } from 'react-router';
import Header from './components/Header';
import { AuthProvider } from '@/store/AuthProvider';

export default function Layout() {
  return (
    <AuthProvider>
      <Header />
      <main className="h-dvh pt-15">
        <Outlet />
      </main>
    </AuthProvider>
  );
}
