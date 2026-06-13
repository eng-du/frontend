import { Suspense } from 'react';
import GameScene from './components/game-scene/GameScene';
import Ranking from './components/ranking/Ranking';

export default function RunAndLearn() {
  return (
    <div className="relative flex h-[calc(100vh-3.75rem)] items-center justify-center bg-surface-default p-4 sm:p-6 lg:p-8 animate-fade-in-up overflow-hidden">
      <div className="flex flex-row gap-6 items-stretch justify-center w-full max-w-[1640px] h-full max-h-[890px]">
        {/* 왼쪽 사이드바 (튜토리얼 및 랭킹) */}
        <div className="flex flex-col gap-6 flex-1 min-w-[320px] max-w-[360px] h-full px-2.5 py-2.5">
          <Ranking />
        </div>

        {/* 오른쪽 3D 게임 화면 */}
        <div 
          className="
            w-[min(77.5%,calc(100%-344px),calc((100vh-3.75rem-2rem)*1240/890),1240px)]
            sm:w-[min(77.5%,calc(100%-344px),calc((100vh-3.75rem-3rem)*1240/890),1240px)]
            lg:w-[min(77.5%,calc(100%-344px),calc((100vh-3.75rem-4rem)*1240/890),1240px)]
            aspect-[1240/890] 
            rounded-2xl 
            overflow-hidden 
            bg-slate-950 
            shadow-default 
            relative 
            self-center
            shrink-0
          "
        >
          <Suspense fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 z-50">
              <div className="relative flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-indigo-500 border-r-indigo-500 border-b-slate-800 border-l-slate-800"></div>
                <span className="absolute text-12 font-bold font-mono text-indigo-400">3D</span>
              </div>
              <span className="text-14 font-medium text-slate-300 font-sans tracking-wide">
                3D 월드 리소스를 로딩하는 중...
              </span>
            </div>
          }>
            <GameScene />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
