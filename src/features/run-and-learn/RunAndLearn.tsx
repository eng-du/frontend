import { Suspense, useState } from 'react';
import { cn } from '@/utils/cn';
import GameScene from './components/game-scene/GameScene';
import Ranking from './components/ranking/Ranking';

export default function RunAndLearn() {
  const [activeTab, setActiveTab] = useState<'game' | 'ranking'>('game');

  return (
    <div className="relative flex flex-col h-[calc(100dvh-3.75rem)] w-full bg-surface-default overflow-hidden animate-fade-in-up">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 lg:p-8 overflow-hidden">
        {/* 데스크톱 레이아웃 (1024px/lg 이상에서만 좌우 분할 구조 노출) */}
        <div className="hidden lg:flex flex-row gap-6 items-stretch justify-center w-full max-w-[1640px] h-full max-h-[890px]">
          {/* 왼쪽 사이드바 (랭킹) */}
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

        {/* 모바일 및 태블릿 레이아웃 (1024px/lg 미만 구조 - 탭 전환 방식) */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full h-full p-6">
          {/* 모바일/태블릿 게임 카드 (md 미만 세로 카드비율 / md~lg 사이 데스크톱형 가로카드비율) */}
          <div 
            className={cn(
              // 모바일 (md 미만): 327:592 세로 카드 비율
              "w-[min(100%,calc((100dvh-3.75rem-64px-48px)*327/592))] aspect-[327/592] rounded-[32px] overflow-hidden bg-slate-950 shadow-default relative self-center shrink-0",
              // 태블릿 (md 이상 lg 미만): 1240:890 가로 넓은 카드 비율로 자동 핏
              "md:w-[min(100%,calc((100dvh-3.75rem-64px-48px)*1240/890))] md:aspect-[1240/890] md:rounded-2xl",
              activeTab === 'game' ? 'block' : 'hidden'
            )}
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

          {/* 모바일/태블릿 리더보드 (activeTab이 ranking일 때만 표시하며 컴포넌트는 유지) */}
          <div 
            className={cn(
              "w-full h-full max-w-[480px] flex flex-col gap-6 px-2 py-2",
              activeTab === 'ranking' ? 'block' : 'hidden'
            )}
          >
            <Ranking />
          </div>
        </div>
      </div>

      {/* 모바일 및 태블릿 하단 탭 바 (1024px/lg 미만) */}
      <div className="lg:hidden flex h-16 w-full border-t border-border-default bg-surface-weak shrink-0">
        <button
          onClick={() => setActiveTab('game')}
          className={`flex-1 flex items-center justify-center font-pinkfong font-bold text-20 h-full border-t-2 transition-colors duration-150 ${
            activeTab === 'game' ? 'text-text-brand-primary border-surface-brand-default' : 'text-text-secondary border-transparent'
          }`}
        >
          게임
        </button>
        <button
          onClick={() => setActiveTab('ranking')}
          className={`flex-1 flex items-center justify-center font-pinkfong font-bold text-20 h-full border-t-2 transition-colors duration-150 ${
            activeTab === 'ranking' ? 'text-text-brand-primary border-surface-brand-default' : 'text-text-secondary border-transparent'
          }`}
        >
          리더보드
        </button>
      </div>
    </div>
  );
}
