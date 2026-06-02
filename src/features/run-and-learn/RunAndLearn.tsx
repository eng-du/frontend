import { Suspense } from 'react';
import GameScene from './components/GameScene';

export default function RunAndLearn() {
  return (
    <div className="relative flex h-[calc(100vh-3.75rem)] items-center justify-center bg-surface-default p-4 sm:p-6 lg:p-8 animate-fade-in-up overflow-hidden">
      
      {/* 
        Aspect-Ratio Locking Responsive Wrapper:
        Calculates the maximum width that keeps the 1240:890 aspect ratio inside the available screen height:
        - Mobile (p-4): max height is 100vh - 3.75rem (header) - 2rem (vertical padding)
        - Tablet (sm, p-6): max height is 100vh - 3.75rem - 3rem
        - Desktop (lg, p-8): max height is 100vh - 3.75rem - 4rem
      */}
      <div 
        className="
          w-[min(100%,calc((100vh-3.75rem-2rem)*1240/890))] 
          sm:w-[min(100%,calc((100vh-3.75rem-3rem)*1240/890))] 
          lg:w-[min(100%,calc((100vh-3.75rem-4rem)*1240/890))] 
          max-w-[1240px]
          aspect-[1240/890] 
          rounded-2xl 
          overflow-hidden 
          border 
          border-border-default 
          bg-slate-950 
          shadow-default 
          relative
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
  );
}
