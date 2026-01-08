import { useAuth } from '@/hooks/useAuth';
import EngduList from './components/EngduList';

function Home() {
  const { user } = useAuth();

  return user ? <EngduList /> : <></>;
}

export default Home;
