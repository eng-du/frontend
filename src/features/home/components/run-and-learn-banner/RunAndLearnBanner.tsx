import { cn } from '@/utils/cn';
import { useNavigate } from 'react-router';
import Button from '@/components/Button/Button';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react';
import RunAndLearnIllustration from './RunAndLearnIllustration';

interface RunAndLearnBannerProps {
  className?: string;
}

export default function RunAndLearnBanner({ className }: RunAndLearnBannerProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'hidden md:flex relative overflow-hidden bg-[#d6f3ff] rounded-2xl',
        'p-10 2xl:px-15 2xl:py-10 h-[300px] 2xl:h-[415px]',
        className
      )}
    >
      <div className="relative z-10 flex flex-col justify-between items-start h-full">
        <div className="flex flex-col gap-4 2xl:gap-6">
          <h2 className="m-0 font-pinkfong text-50 2xl:text-80 text-text-primary whitespace-nowrap">
            런앤런으로 실력도, 재미도 달려봐!
          </h2>
          <p className="m-0 font-semibold text-20 2xl:text-32 text-text-primary">
            정답의 문을 통과하며,<br />
            점점 빨라지는 스테이지를 돌파해보세요.
          </p>
        </div>

        <Button
          className="w-40 h-[42px] px-5 py-3 2xl:w-[276px] rounded-xl 2xl:rounded-2xl"
          variant="primary"
          onClickHandler={() => navigate('/run-and-learn')}
        >
          <span className="font-medium text-16 2xl:text-20 text-text-weak whitespace-nowrap">
            런앤런 시작하기
          </span>
          <ArrowRightIcon className="w-4 h-4 shrink-0 text-text-weak" />
        </Button>
      </div>

      {/* 일러스트 */}
      <div className="absolute bottom-0 -right-5 origin-bottom-right scale-70 lg:scale-80 xl:scale-90 2xl:scale-100 pointer-events-none">
        <RunAndLearnIllustration />
      </div>
    </div>
  );
}
