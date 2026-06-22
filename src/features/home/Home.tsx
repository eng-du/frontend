import { useAuth } from '@/hooks/useAuth';
import EngduList from './components/EngduList';
import EngduCreateModal from './components/engdu-create-modal/EngduCreateModal';
import { useState } from 'react';
import LandingFeatureList from './components/landing/LandingFeatureList';
import Banner from './components/landing/Banner';
import RunAndLearnBanner from './components/run-and-learn-banner/RunAndLearnBanner';
import FeedbackBanner from './components/feedback-banner/FeedbackBanner';

function Home() {
  const { user } = useAuth();

  const [isEngduCreateModalOpen, setIsEngduCreateModalOpen] = useState(false);

  return user ? (
    <>
      <div className="flex flex-col gap-4 mb-6 md:mb-0 md:mt-10 md:mx-8 lg:mx-16 xl:mx-25">
        <FeedbackBanner />
        <RunAndLearnBanner />
      </div>
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
