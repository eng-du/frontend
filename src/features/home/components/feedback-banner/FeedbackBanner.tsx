import { cn } from '@/utils/cn';
import FeedbackChickIcon from '@/assets/illustrations/feedback_chick.svg?react';
import SquareArrowOutUpRightIcon from '@/assets/icons/square-arrow-out-up-right.svg?react';
import Button from '@/components/Button/Button';

interface FeedbackBannerProps {
  className?: string;
}

export default function FeedbackBanner({ className }: FeedbackBannerProps) {
  return (
    <div
      className={cn(
        'overflow-hidden bg-surface-accent border border-border-accent px-8 py-4 rounded-2xl w-full',
        className
      )}
    >
      {/* 넓은 배너 (lg 이상) */}
      <div className="hidden lg:flex items-center w-full gap-8">
        <div className="flex items-center gap-4 w-full">
          <div className="flex-shrink-0">
            <FeedbackChickIcon />
          </div>
          <div className="flex flex-col gap-1 break-keep w-full">
            <p className="m-0 font-semibold text-20 text-text-primary">
              잉듀를 더 좋은 서비스로 만들기 위해 여러분의 의견을 들려주세요!
            </p>
            <p className="m-0 font-medium text-14 text-text-secondary">
              참여해주신 분들께 추첨을 통해 소정의 선물을 드려요 🎁
            </p>
          </div>
        </div>
        <Button
          onClickHandler={() => window.open('https://forms.gle/EJ7wuMvXtdqgyVXq8', '_blank', 'noopener,noreferrer')}
          variant='secondary'
          className="flex-shrink-0 !px-4 bg-[#fee292] border border-border-accent text-[#b85c03]"
        >
          <span className="font-medium whitespace-nowrap text-inherit">
            피드백 참여하기
          </span>
          <SquareArrowOutUpRightIcon className="w-4 h-4 text-inherit" />
        </Button>
      </div>

      {/* 중간 배너 (md 이상 lg 미만) - 프레임 1 (가로 배치) */}
      <div className="hidden md:flex lg:hidden items-center justify-between w-full gap-4">
        <div className="flex-shrink-0 w-[93px] h-[80px]">
          <FeedbackChickIcon className="w-full h-full" />
        </div>
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1 font-semibold text-16 text-text-primary leading-[24px] break-keep">
            참여해주신 분들께 추첨을 통해 소정의 선물을 드려요 🎁
          </div>
          <Button
            onClickHandler={() => window.open('https://forms.gle/EJ7wuMvXtdqgyVXq8', '_blank', 'noopener,noreferrer')}
            variant='secondary'
            className="flex-shrink-0 !px-4 bg-[#fee292] border border-border-accent text-[#b85c03]"
          >
            <span className="font-medium whitespace-nowrap text-inherit">
              피드백 참여하기
            </span>
            <SquareArrowOutUpRightIcon className="w-4 h-4 text-inherit" />
          </Button>
        </div>
      </div>

      {/* 작은 배너 (md 미만) - 프레임 2 (세로 배치) */}
      <div className="flex md:hidden items-center w-full gap-4 sm:gap-8">
        <div className="flex-shrink-0 w-[93px] h-[80px]">
          <FeedbackChickIcon className="w-full h-full" />
        </div>
        <div className="flex flex-col items-start gap-4 flex-1">
          <div className="font-semibold text-16 text-text-primary leading-[24px] break-keep">
            참여해주신 분들께 추첨을 통해 소정의 선물을 드려요 🎁
          </div>
          <Button
            onClickHandler={() => window.open('https://forms.gle/EJ7wuMvXtdqgyVXq8', '_blank', 'noopener,noreferrer')}
            variant='secondary'
            className="flex-shrink-0 !px-4 bg-[#fee292] border border-border-accent text-[#b85c03]"
          >
            <span className="font-medium whitespace-nowrap text-inherit">
              피드백 참여하기
            </span>
            <SquareArrowOutUpRightIcon className="w-4 h-4 text-inherit" />
          </Button>
        </div>
      </div>
    </div>
  );
}
