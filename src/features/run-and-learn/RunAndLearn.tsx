import { Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { cn } from '@/utils/cn';
import GameScene from './components/game-scene/GameScene';
import Ranking from './components/ranking/Ranking';

export default function RunAndLearn() {
  const { search } = useLocation();
  const navigate = useNavigate();

  // URL에서 직접 파생 — 네비게이션 시 자동으로 반응
  const activeTab = new URLSearchParams(search).get('tab') === 'ranking' ? 'ranking' : 'game';

  return (
    <div className="relative flex min-h-full w-full animate-fade-in-up flex-col overflow-hidden bg-surface-default md:min-h-[calc(100dvh-3.75rem)]">
      {/* 메인 콘텐츠 영역 */}
      <div
        className={cn(
          'flex flex-1 overflow-hidden',
          activeTab === 'game'
            ? 'items-center justify-center p-0 md:p-6 lg:p-8'
            : 'items-stretch justify-center p-0 lg:items-center lg:p-8',
        )}
      >
        {/* 데스크톱 레이아웃 (1024px/lg 이상 좌우 분할) */}
        <div className="hidden h-full max-h-[890px] w-full max-w-[1640px] flex-row items-stretch justify-center gap-6 lg:flex">
          {/* 왼쪽 사이드바 (랭킹) */}
          <div className="flex h-full max-w-[360px] min-w-[320px] flex-1 flex-col gap-6 px-2.5 py-2.5">
            <Ranking />
          </div>

          {/* 오른쪽 3D 게임 화면 */}
          <div className="bg-slate-950 relative aspect-[1240/890] w-[min(77.5%,calc(100%-344px),calc((100vh-3.75rem-2rem)*1240/890),1240px)] shrink-0 self-center overflow-hidden rounded-2xl shadow-default sm:w-[min(77.5%,calc(100%-344px),calc((100vh-3.75rem-3rem)*1240/890),1240px)] lg:w-[min(77.5%,calc(100%-344px),calc((100vh-3.75rem-4rem)*1240/890),1240px)]">
            <Suspense
              fallback={
                <div className="bg-slate-950/95 absolute inset-0 z-50 flex flex-col items-center justify-center">
                  <div className="relative mb-4 flex items-center justify-center">
                    <div className="border-t-indigo-500 border-r-indigo-500 border-b-slate-800 border-l-slate-800 h-16 w-16 animate-spin rounded-full border-4"></div>
                    <span className="text-indigo-400 absolute font-mono text-12 font-bold">3D</span>
                  </div>
                  <span className="text-slate-300 font-sans text-14 font-medium tracking-wide">
                    3D 월드 리소스를 로딩하는 중...
                  </span>
                </div>
              }
            >
              <GameScene />
            </Suspense>
          </div>
        </div>

        {/* 모바일/태블릿 레이아웃 (lg 미만) */}
        <div
          className={cn(
            'flex w-full flex-1 flex-col items-center p-0 lg:hidden',
            activeTab === 'game' ? 'justify-center' : 'justify-start',
          )}
        >
          {/* 게임 카드
              - 모바일 (md 미만): 세로 카드 비율 327:592, 하단 탭 바 없으므로 높이에서 제외
              - 태블릿 (md~lg): 가로 카드 비율 1240:890, 하단 탭 바(64px) 포함 */}
          <div
            className={cn(
              'bg-slate-950 relative aspect-[327/592] w-[min(100%,calc((100dvh-3.75rem-48px)*327/592))] shrink-0 self-center overflow-hidden rounded-[32px] shadow-default',
              'md:aspect-[1240/890] md:w-[min(100%,calc((100dvh-3.75rem-64px-48px)*1240/890))] md:rounded-2xl',
              activeTab === 'game' ? 'block' : 'hidden',
            )}
          >
            <Suspense
              fallback={
                <div className="bg-slate-950/95 absolute inset-0 z-50 flex flex-col items-center justify-center">
                  <div className="relative mb-4 flex items-center justify-center">
                    <div className="border-t-indigo-500 border-r-indigo-500 border-b-slate-800 border-l-slate-800 h-16 w-16 animate-spin rounded-full border-4"></div>
                    <span className="text-indigo-400 absolute font-mono text-12 font-bold">3D</span>
                  </div>
                  <span className="text-slate-300 font-sans text-14 font-medium tracking-wide">
                    3D 월드 리소스를 로딩하는 중...
                  </span>
                </div>
              }
            >
              <GameScene />
            </Suspense>
          </div>

          {/* 리더보드 */}
          <div
            className={cn(
              'flex w-full flex-1 flex-col md:max-w-[480px]',
              activeTab === 'ranking' ? 'flex' : 'hidden',
            )}
          >
            <Ranking />
          </div>
        </div>
      </div>

      {/* 태블릿 전용 하단 탭 바 (md 이상 lg 미만에서만 표시) */}
      <div className="hidden h-16 w-full shrink-0 border-t border-border-default bg-surface-weak md:flex lg:hidden">
        <button
          onClick={() => navigate('/run-and-learn', { replace: true })}
          className={`flex h-full flex-1 items-center justify-center border-t-2 font-pinkfong text-20 font-bold transition-colors duration-150 ${activeTab === 'game'
            ? 'border-surface-brand-default text-text-brand-primary'
            : 'border-transparent text-text-secondary'
            }`}
        >
          게임
        </button>
        <button
          onClick={() => navigate('/run-and-learn?tab=ranking', { replace: true })}
          className={`flex h-full flex-1 items-center justify-center border-t-2 font-pinkfong text-20 font-bold transition-colors duration-150 ${activeTab === 'ranking'
            ? 'border-surface-brand-default text-text-brand-primary'
            : 'border-transparent text-text-secondary'
            }`}
        >
          랭킹
        </button>
      </div>
    </div>
  );
}
