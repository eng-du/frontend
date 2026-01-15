import { useAuth } from '@/hooks/useAuth';
import EngduList from './components/EngduList';
import EngduCreateModal from './components/engdu-create-modal/EngduCreateModal';
import { useState } from 'react';

function Home() {
  const { user } = useAuth();

  const [isEngduCreateModalOpen, setIsEngduCreateModalOpen] = useState(false);

  return user ? (
    <>
      <EngduList onOpenHandler={() => setIsEngduCreateModalOpen(true)} />
      <EngduCreateModal
        isEngduCreateModalOpen={isEngduCreateModalOpen}
        setIsEngduCreateModalOpen={setIsEngduCreateModalOpen}
      />
    </>
  ) : null;
}

export default Home;
