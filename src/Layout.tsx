import { Outlet, useLocation } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function Layout() {
  const { pathname } = useLocation();

  const isLearningPage = pathname.startsWith('/learning');

  return (
    <div>
      <Header />
      <main className="min-h-dvh pt-15">
        <Outlet />
      </main>
      {!isLearningPage && <Footer />}
    </div>
  );
}
