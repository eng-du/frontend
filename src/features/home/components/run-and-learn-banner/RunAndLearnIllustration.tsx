import { cn } from '@/utils/cn';
import Callout from '@/components/Callout/Callout';
import CloudLarge from '@/assets/illustrations/cloud_large.svg?react';
import CloudSmall from '@/assets/illustrations/cloud_small.svg?react';
import BannerGrass from '@/assets/illustrations/banner_grass.svg?react';
import BannerGround from '@/assets/illustrations/banner_ground.svg?react';
import BannerTrophy from '@/assets/illustrations/banner_trophy.svg?react';
import CharacterRunning from '@/assets/illustrations/start_character_running.svg?react';

interface RunAndLearnIllustrationProps {
  className?: string;
}

export default function RunAndLearnIllustration({ className }: RunAndLearnIllustrationProps) {
  return (
    <div className={cn('relative w-215 h-75 shrink-0', className)}>
      {/* 배경 레이어 */}
      <BannerGrass className="absolute bottom-0 right-0" />
      <BannerGround className="absolute bottom-0 left-0" />

      {/* 구름 레이어 */}
      <CloudLarge className="absolute top-19.5 left-92 w-21 h-auto opacity-60" />
      <CloudSmall className="absolute top-9 left-68.5 w-15.5 h-auto opacity-60" />
      <CloudLarge className="absolute top-5 left-170 w-33.5 h-auto opacity-60" />

      {/* 캐릭터 */}
      <CharacterRunning className="absolute bottom-5 left-48.5 w-35.5 h-auto -scale-x-100" />

      {/* 트로피 & 말풍선 */}
      <Callout className="absolute right-50 bottom-15 scale-90 origin-bottom font-semibold" Icon={BannerTrophy}>
        최고 기록 갱신에 도전해봐!
      </Callout>
    </div>
  );
}
