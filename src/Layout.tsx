import { Outlet } from 'react-router';
import Header from './components/Header';

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="h-dvh pt-15">
        <Outlet />
      </main>
    </div>
  );
}
