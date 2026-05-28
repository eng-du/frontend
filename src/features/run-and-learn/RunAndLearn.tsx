import GameScene from './components/GameScene';

export default function RunAndLearn() {
  return (
    <div className="flex h-[calc(100vh-3.75rem)] items-center justify-center bg-surface-default p-4 sm:p-6 lg:p-8 animate-fade-in-up overflow-hidden">
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
          flex 
          shrink-0 
          [&_canvas]:!w-full 
          [&_canvas]:!h-full 
          [&_canvas]:!block
        "
      >
        <GameScene />
      </div>
    </div>
  );
}
