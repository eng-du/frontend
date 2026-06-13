import imgStartBgHill from '@/assets/game/start/start_bg_hill.svg';
import imgStartBgRoad from '@/assets/game/start/start_bg_road.svg';
import imgStartCharacter from '@/assets/game/start/start_character_running.svg';
import imgFlower from '@/assets/game/flower.svg';
import imgShadowFlower from '@/assets/game/shadow_flower.svg';
import imgRockLeft from '@/assets/game/rock_left.svg';
import imgShadowRock from '@/assets/game/shadow_rock.svg';

// 피그마: 하단 씬 영역 (relative + 배경 absolute 레이어 허용)
// 배경(언덕/흙길)은 씬 전체를 덮는 배경 레이어이므로 absolute 허용 (GEMINI.md 허용 예외)
export default function StartScenery() {
  return (
    <div className="relative w-full h-[393px] shrink-0">
      {/* 1. Hill (초록 언덕 - 가장 뒤) */}
      <img
        src={imgStartBgHill}
        alt=""
        className="absolute left-0 top-[73px] w-[1240px] h-[320px] pointer-events-none"
      />

      {/* 2. Road (갈색 흙길 - 언덕 위) */}
      <img
        src={imgStartBgRoad}
        alt=""
        className="absolute left-[145.76px] top-[130.5px] w-[1094.239px] h-[262.496px] pointer-events-none"
      />

      {/* 3. 꽃과 바위 (흙길 위) */}
      {/* 바위 그림자 */}
      <img
        src={imgShadowRock}
        alt=""
        className="absolute left-[209px] top-[119px] w-[280px] h-[103px] pointer-events-none"
      />

      {/* 바위 */}
      <img
        src={imgRockLeft}
        alt=""
        className="absolute left-[255px] top-[72px] w-[219px] h-[130px] pointer-events-none"
      />

      {/* 꽃 그림자 오른쪽 */}
      <img
        src={imgShadowFlower}
        alt=""
        className="absolute left-[896px] top-[101px] w-[126px] h-[48px] pointer-events-none"
      />

      {/* 꽃 오른쪽 */}
      <img
        src={imgFlower}
        alt=""
        className="absolute left-[896px] top-0 w-[94px] h-[127px] pointer-events-none"
      />

      {/* 꽃 그림자 왼쪽 (Y축 뒤집기) */}
      <img
        src={imgShadowFlower}
        alt=""
        className="absolute left-[52px] top-[259px] w-[126px] h-[47px] -scale-y-100 rotate-180 pointer-events-none"
      />

      {/* 꽃 왼쪽 (Y축 뒤집기) */}
      <img
        src={imgFlower}
        alt=""
        className="absolute left-[67px] top-[155px] w-[95px] h-[127px] -scale-y-100 rotate-180 pointer-events-none"
      />

      {/* 4. 캐릭터 (가장 앞) */}
      <img
        src={imgStartCharacter}
        alt="달리는 캐릭터"
        className="absolute left-[501px] top-[63px] w-[316px] h-[304px] pointer-events-none"
      />
    </div>
  );
}
