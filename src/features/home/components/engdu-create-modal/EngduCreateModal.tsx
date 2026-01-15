import Modal from '@/components/Modal';
import EngduTopicInput from './EngduTopicInput';
import EngduTypeSelector from './EngduTypeSelector';
import EngduCreateFooter from './EngduCreateFooter';
import EngduCreateHeader from './EngduCreateHeader';
import EngduHelperCallout from '@/components/EngduHelperCallout';
import { useState, useEffect } from 'react';
import type { EngduType } from '@/types/engdu';

interface EngduCreateModalProps {
  isEngduCreateModalOpen: boolean;
  setIsEngduCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EngduCreateModal({
  isEngduCreateModalOpen,
  setIsEngduCreateModalOpen,
}: EngduCreateModalProps) {
  const [selectedEngduType, setSelectedEngduType] = useState<EngduType>('지문');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (isEngduCreateModalOpen) {
      setSelectedEngduType('지문');
      setTopic('');
    }
  }, [isEngduCreateModalOpen]);

  return (
    <Modal
      isOpen={isEngduCreateModalOpen}
      onCloseHandler={() => {
        setIsEngduCreateModalOpen(false);
      }}
    >
      <div className="flex w-130 flex-col gap-5 p-7">
        <EngduCreateHeader />
        <EngduTypeSelector
          selectedEngduType={selectedEngduType}
          onSelectHandler={(type: EngduType) => setSelectedEngduType(type)}
        />
        <EngduTopicInput value={topic} onChange={setTopic} />
        <EngduCreateFooter
          selectedEngduType={selectedEngduType}
          topic={topic}
          onCloseHandler={() => setIsEngduCreateModalOpen(false)}
        />
      </div>
      <EngduHelperCallout
        onClickHandler={() => {
          setIsEngduCreateModalOpen(false);
        }}
      >
        구체적인 주제일수록
        <br />더 맞춤형 학습이 가능해요!
      </EngduHelperCallout>
    </Modal>
  );
}

export default EngduCreateModal;
