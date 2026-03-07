import EngduFullBannerIcon from '@/assets/icons/engdu-full-banner.svg?react';
import Button from '@/components/Button/Button';
import { Link } from 'react-router';

function Banner() {
  return (
    <div className="relative flex min-h-125 w-full flex-col items-center justify-center gap-10 bg-[radial-gradient(80%_40%_at_50%_50%,var(--color-white)_15%,var(--color-surface-brand-weak)_100%)] px-6 py-10 lg:h-130 lg:flex-row lg:gap-20 lg:px-[12.5%] lg:py-0">
      <EngduFullBannerIcon className="h-auto w-60 shrink-0 lg:h-100 lg:w-120" />
      <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
        <p className="font-pinkfong text-32 leading-tight lg:text-50 lg:leading-normal break-keep">
          내가 좋아하는 주제로 시작하는 가장 즐거운 영어 독해 경험
        </p>
        <Link to={'/login'}>
          <Button variant="secondary">지금 바로 시작하기</Button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
