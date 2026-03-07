import FileIcon from '@/assets/icons/file-text.svg?react';
import NewEngduButton from '../filter-section/NewEngduButton';
import { useIsDesktop } from '@/hooks/useMediaQuery';

interface EmptyCardProps {
  onOpenHandler: () => void;
}

function EmptyCard({ onOpenHandler }: EmptyCardProps) {
  const isDesktop = useIsDesktop();

  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-2xl border-4 border-dashed border-border-default bg-surface-weak py-20">
      <div className="flex aspect-square w-24 items-center justify-center rounded-full bg-surface-brand-default/16">
        <FileIcon className="h-10 w-10 text-surface-brand-default" />
      </div>
      <div className="font-pinkfong text-24">아직 생성된 잉듀가 없어요!</div>
      <div className="text-text-secondary">원하는 주제로 첫 번째 잉듀를 만들어보세요.</div>
      {isDesktop && <NewEngduButton onOpenHandler={onOpenHandler} />}
    </div>
  );
}

export default EmptyCard;
