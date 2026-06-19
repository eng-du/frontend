import HouseIcon from '@/assets/icons/house.svg?react';
import GamepadIcon from '@/assets/icons/gamepad.svg?react';
import TrophyIcon from '@/assets/icons/trophy.svg?react';
import UserIcon from '@/assets/icons/user.svg?react';
import { cn } from '@/utils/cn';

export type TabType = 'home' | 'run-and-learn' | 'ranking' | 'mypage';

interface BottomNavigationBarProps {
  className?: string;
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export default function BottomNavigationBar({
  className,
  activeTab,
  onChangeTab,
}: BottomNavigationBarProps) {
  const tabs = [
    { id: 'home' as const, label: '홈', Icon: HouseIcon },
    { id: 'run-and-learn' as const, label: '런앤런', Icon: GamepadIcon },
    { id: 'ranking' as const, label: '랭킹', Icon: TrophyIcon },
    { id: 'mypage' as const, label: '마이', Icon: UserIcon },
  ];

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 flex h-[68px] w-full border-t border-border-default bg-surface-weak/90 backdrop-blur-[2px] overflow-hidden select-none',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[480px] items-stretch justify-around px-4">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onChangeTab(id)}
              className="flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none transition-colors duration-150"
            >
              <div
                className={cn(
                  'flex items-center justify-center size-5 transition-colors duration-150',
                  isActive ? 'text-text-brand-primary' : 'text-text-primary',
                )}
              >
                <Icon className="size-full" />
              </div>
              <span
                className={cn(
                  'font-pretendard font-bold text-14 tracking-wide whitespace-nowrap transition-colors duration-150',
                  isActive ? 'text-text-brand-primary' : 'text-text-primary',
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
