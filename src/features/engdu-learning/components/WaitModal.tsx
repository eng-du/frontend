import Modal from '@/components/Modal/Modal';
import { cn } from '@/utils/cn';
import engduFullCreate from '@/assets/icons/engdu-full-create.svg';
import Button from '@/components/Button/Button';
import { useEffect, useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import EyeIcon from '@/assets/icons/eye.svg?react';
import { trackEvent } from '@/utils/analytics';
import { getRandomPhrasalVerb } from '@/api/phrasal-verb';
import { toast } from 'sonner';

interface WaitModalProps {
  isInitialResolved: boolean;
  onClose: () => void;
}

function WaitModal({ isInitialResolved, onClose }: WaitModalProps) {
  const [seenIds, setSeenIds] = useState<number[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const verbShowTime = useRef(Date.now());
  const readyNotifiedTime = useRef<number | null>(null);

  useEffect(() => {
    trackEvent('wait_modal_view', {});
  }, []);

  const { mutate, data: currentVerb, isPending } = useMutation({
    mutationFn: (excludeIds: number[]) => getRandomPhrasalVerb(excludeIds),
    onSuccess: (verb, excludeIds) => {
      setShowTranslation(false);
      verbShowTime.current = Date.now();
      trackEvent('phrasal_verb_view', {
        verb_en: verb.en,
        verb_index: excludeIds.length + 1,
      });
    },
    onError: () => {
      toast.error('구동사 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    mutate([]);
  }, [mutate]);

  useEffect(() => {
    if (isInitialResolved && !readyNotifiedTime.current) {
      readyNotifiedTime.current = Date.now();
    }
  }, [isInitialResolved]);

  const handleNextVerb = () => {
    if (isPending || !currentVerb) return;
    trackEvent('phrasal_verb_click_next', {
      verb_en: currentVerb.en,
      stay_duration_sec: Math.floor((Date.now() - verbShowTime.current) / 1000),
    });
    const nextIds = [...seenIds, currentVerb.id];
    setSeenIds(nextIds);
    mutate(nextIds);
  };

  const handleClose = () => {
    if (!isInitialResolved) return;
    const waitAfterReadySec = readyNotifiedTime.current
      ? Math.floor((Date.now() - readyNotifiedTime.current) / 1000)
      : 0;
    trackEvent('learning_start_click', {
      wait_after_ready_sec: waitAfterReadySec,
    });
    onClose();
  };

  return (
    <Modal isOpen={true} onCloseHandler={handleClose}>
      <div className="flex flex-col items-center gap-5 p-7">
        <div
          className={cn(
            'h-37.5 w-37.5 bg-size-[450px_150px] bg-no-repeat',
            isInitialResolved ? 'animate-none bg-position-[-300px_0px]' : 'animate-engdu-hammer',
          )}
          style={{ backgroundImage: `url(${engduFullCreate})` }}
        />
        <div className="text-center font-pinkfong text-32 font-bold whitespace-pre-line">
          {isInitialResolved
            ? '잉듀가 만들어졌어요!\n학습을 시작해보세요'
            : '뚝딱 뚝딱 잉듀가\n만들어지고 있어요~'}
        </div>
        <div className="flex min-h-60 w-90 flex-col items-center justify-center gap-3 rounded-md border border-border-brand-weak bg-surface-brand-weak p-4">
          <div className="rounded-full bg-surface-brand-strong px-2 py-1 text-12 font-bold text-text-brand-primary">
            기다리는 동안 학습하기
          </div>
          {currentVerb && (
            <div className={'flex w-full flex-col items-center gap-2'}>
              <div className="text-28 font-extrabold">{currentVerb.en}</div>
              <div className="font-bold text-text-brand-primary">{currentVerb.kor}</div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-surface-weak px-5 py-2 text-center text-12 break-keep text-text-secondary">
                <div className="flex min-h-7.5 w-full items-center justify-center">
                  "{currentVerb.exampleSentenceEn}"
                </div>
                <hr className="w-full border-border-default" />
                <div className="relative flex min-h-7.5 w-full items-center justify-center">
                  <div className={cn(!showTranslation && 'blur-sm')}>
                    {currentVerb.exampleSentenceKor}
                  </div>
                  {!showTranslation && (
                    <button
                      onClick={() => {
                        setShowTranslation(true);
                        if (currentVerb) {
                          trackEvent('phrasal_verb_reveal_translation', {
                            verb_en: currentVerb.en,
                          });
                        }
                      }}
                      className="absolute flex cursor-pointer items-center gap-1.5 rounded-lg border border-border-default bg-surface-weak px-3 py-1.5"
                    >
                      <EyeIcon className="h-4 w-4 text-text-brand-primary" />
                      <span className="text-12 font-bold text-text-brand-primary">해석 보기</span>
                    </button>
                  )}
                </div>
              </div>
              <button
                className="cursor-pointer text-12 text-text-secondary underline underline-offset-2 disabled:opacity-50"
                onClick={handleNextVerb}
                disabled={isPending}
              >
                다음 구동사 보기
              </button>
            </div>
          )}
        </div>
        {isInitialResolved && <Button onClickHandler={handleClose}>학습 시작하기</Button>}
      </div>
    </Modal>
  );
}

export default WaitModal;
