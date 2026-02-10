import StarIcon from '@/assets/icons/star.svg?react';

function EngduCreateHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex aspect-square w-12 items-center justify-center rounded-full bg-surface-brand-default/32">
        <StarIcon className="h-7 w-7 text-text-brand-primary" />
      </div>
      <h1 className="font-pinkfong text-36 font-bold">잉듀 생성 도우미</h1>
    </div>
  );
}

export default EngduCreateHeader;
