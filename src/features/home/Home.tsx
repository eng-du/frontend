import { useAuth } from '@/hooks/useAuth';
import EngduList from './components/EngduList';
import EngduCreateModal from './components/engdu-create-modal/EngduCreateModal';
import { useState } from 'react';
import LandingFeatureList from './components/landing/LandingFeatureList';
import Banner from './components/landing/Banner';
import RunAndLearnBanner from './components/run-and-learn-banner/RunAndLearnBanner';

function Home() {
  const { user } = useAuth();

  const [isEngduCreateModalOpen, setIsEngduCreateModalOpen] = useState(false);

  return user ? (
    <>
      <RunAndLearnBanner className="mt-10 mx-8 lg:mx-16 xl:mx-25" />
      <EngduList onOpenHandler={() => setIsEngduCreateModalOpen(true)} />
      <EngduCreateModal
        isEngduCreateModalOpen={isEngduCreateModalOpen}
        setIsEngduCreateModalOpen={setIsEngduCreateModalOpen}
      />
    </>
  ) : (
    <div className="flex w-full flex-col items-center">
      <Banner />
      <LandingFeatureList />
    </div>
  );
}

export default Home;
