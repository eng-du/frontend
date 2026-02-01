import Modal from '@/components/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ThumbsUpIcon from '@/assets/icons/thumbs-up.svg?react';
import ChickIcon from '@/assets/icons/engdu-face-good.svg?react';
import FeedbackTypeButton from './FeedbackTypeButton';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackState = 'initial' | 'liked' | 'disliked';

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [state, setState] = useState<FeedbackState>('initial');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setState('initial');
    }
  }, [isOpen]);

  const handleFeedback = (feedback: 'liked' | 'disliked') => {
    setState(feedback);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onCloseHandler={onClose}>
      <div className="flex w-130 flex-col items-center gap-5 p-7 text-center">
        <div className="relative mb-5 flex flex-col items-center">
          <ChickIcon className="h-42 w-auto" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <h2 className="font-pinkfong text-36">문제를 전부 해결 했어요!</h2>
          <div className="text-text-secondary">
            <p>오늘 학습이 마음에 드셨나요?</p>
            <p>평가를 남겨주시면 콘텐츠 개선에 도움이 돼요!</p>
          </div>
        </div>

        <div className="flex w-full gap-5 px-5">
          <FeedbackTypeButton
            label="좋아요"
            icon={<ThumbsUpIcon />}
            isActive={state === 'liked'}
            onClick={() => handleFeedback('liked')}
            variant="liked"
            disabled={state !== 'initial'}
          />
          <FeedbackTypeButton
            label="별로에요"
            icon={<ThumbsUpIcon className="rotate-180" />}
            isActive={state === 'disliked'}
            onClick={() => handleFeedback('disliked')}
            variant="disliked"
            disabled={state !== 'initial'}
          />
        </div>

        <div className="mt-8 flex h-5 items-center justify-center">
          {state === 'initial' ? (
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer text-16 text-text-secondary underline decoration-text-secondary/50 decoration-1 underline-offset-4"
            >
              다음에 할게요
            </button>
          ) : (
            <p className="animate-fade-in-up text-16 text-text-secondary">
              소중한 의견 감사합니다!
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
