import { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Background from './Background';
import Pathway from './Pathway';
import Scenery from './Scenery';
import Character from './Character';
import { useGameState } from '../../hooks/useGameState';
import { useQuestionBuffer } from '../../hooks/useQuestionBuffer';
import { createRunAndLearnSession, startRunAndLearnSession } from '@/api/runAndLearn';
import GameStartScreen from '../start-screen/GameStartScreen';
import DoorBreakEffect from './DoorBreakEffect';
import LightbulbIcon from '@/assets/game/lightbulb.svg?react';
import MovingAnswerWall from './MovingAnswerWall';
import GameOverModal from './GameOverModal';

// 카메라 시선 고정 헬퍼
function CameraController() {
  useFrame((state) => {
    state.camera.lookAt(0, 0.3, -5.0);
  });
  return null;
}

export default function GameScene() {
  const {
    phase,
    setPhase,
    lane,
    setLane,
    correctCount,
    wallSpeed,
    handleCorrect,
    handleWrong,
    restart,
  } = useGameState();
  const [sessionId, setSessionId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  // 게임 재시작 핸들러
  const handleRestart = useCallback(async () => {
    setSessionId(null);
    restart();
    setIsGameOverModalOpen(false);
    try {
      const res = await createRunAndLearnSession();
      setSessionId(res.sessionId);
    } catch (err) {
      console.error(err);
    }
  }, [restart]);
  const [scale, setScale] = useState(1);
  const BASE_WIDTH = 1240;
  const BASE_HEIGHT = 890;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scaleX = width / BASE_WIDTH;
      const scaleY = height / BASE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase === 'GAME_OVER') {
      const timer = setTimeout(() => {
        setIsGameOverModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsGameOverModalOpen(false);
    }
  }, [phase]);

  // 퀴즈 버퍼링 훅 연결
  const { buffer, currentQuestion, isFetching, consumeQuestion, initializeBuffer } = useQuestionBuffer(sessionId);

  // 💥 월드 스페이스 이펙트 상태 관리
  const [activeEffects, setActiveEffects] = useState<{ id: number; position: [number, number, number] }[]>([]);

  const triggerBreakEffect = useCallback((x: number) => {
    const id = Date.now();
    // 문의 실제 월드 X 좌표는 레인 X(x)와 완벽하게 일치하므로 보정값 제거!
    setActiveEffects((prev) => [...prev, { id, position: [x, -1.2, -1.4] }]);

    // 1.2초 후 자동 소멸
    setTimeout(() => {
      setActiveEffects((prev) => prev.filter((eff) => eff.id !== id));
    }, 1200);
  }, []);

  // 1. 컴포넌트 마운트 시 세션 생성
  useEffect(() => {
    createRunAndLearnSession().then((res) => {
      setSessionId(res.sessionId);
    });
  }, []);

  // 2. 세션이 발급되었고 PREPARING 상태라면 최초 10개 버퍼링 시작
  useEffect(() => {
    if (phase === 'PREPARING' && sessionId && !isFetching && buffer.length === 0) {
      initializeBuffer();
    }
  }, [phase, sessionId, initializeBuffer, isFetching, buffer.length]);

  // 3. 로딩이 완료되어 퀴즈가 준비되면 IDLE(대기) 상태 전환
  useEffect(() => {
    if (phase === 'PREPARING' && sessionId && currentQuestion) {
      setPhase('IDLE');
    }
  }, [phase, sessionId, currentQuestion, setPhase]);

  // 4. NEXT(다음 문제로 넘어감) 상태 감지 시 앞의 문제 소모 후 즉시 PLAYING으로 전환
  useEffect(() => {
    if (phase === 'NEXT') {
      consumeQuestion();
      // rAF 없이 즉시 전환하여 끊김 방지 (벽 위치 리셋은 useFrame에서 NEXT 프레임에 처리)
      setPhase('PLAYING');
    }
  }, [phase, consumeQuestion, setPhase]);

  // 5. 벽이 카메라 뒤로 완전히 퇴장한 시점 (CORRECT_PASSING → NEXT)
  const handleExit = useCallback(() => {
    setPhase('NEXT');
  }, [setPhase]);

  // 🕹️ KEYBOARD LANE INTERACTION
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // IDLE 상태에서 스페이스바를 누르면 세션 시작 API 호출 후 게임 스타트
      if (phase === 'IDLE' && e.code === 'Space') {
        if (sessionId) {
          await startRunAndLearnSession(sessionId);
          setPhase('PLAYING');
        }
        return;
      }

      // PLAYING 상태에서만 레인 조작 허용 (CORRECT_PASSING 중에는 이미 통과 중이므로 이동 차단)
      if (phase === 'PLAYING') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'ㅁ') {
          setLane((prev) => Math.max(0, prev - 1));
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D' || e.key === 'ㅇ') {
          setLane((prev) => Math.min(2, prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (containerRef.current) {
      containerRef.current.focus();
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, sessionId, setPhase, setLane]);

  // Exact X-coordinate conversions for pixel-perfect centering in 3D
  const lanes = [-1.54, 0.0, 1.54];
  const targetX = lanes[lane];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      // 오답 시 전체 화면이 미세하게 떨리는 tailwind 클래스가 있다면 추가 (여기선 임시 제외)
      className="absolute inset-0 w-full h-full overflow-hidden outline-none"
    >
      {/* 시작 화면 (PREPARING + IDLE 상태 모두 표시, 버튼은 IDLE일 때만 활성화) */}
      {(phase === 'PREPARING' || phase === 'IDLE') && (
        <GameStartScreen
          isLoading={phase === 'PREPARING'}
          onStart={async () => {
            if (sessionId) {
              await startRunAndLearnSession(sessionId);
            }
            setPhase('PLAYING');
          }}
        />
      )}

      {/* HTML OVERLAY UI (상태에 따른 인터페이스 오버레이, scale에 따라 정밀 축소) */}
      <div 
        className="absolute w-[1240px] h-[890px] left-1/2 top-1/2 pointer-events-none z-10 overflow-hidden"
        style={{ 
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* 상단 현재 문제 (게임 진행 및 게임오버 상태에서 노출) */}
        {(phase === 'PLAYING' || phase === 'CORRECT_PASSING' || phase === 'NEXT' || phase === 'GAME_OVER') && currentQuestion && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-surface-weak px-6 py-5 rounded-full text-center z-50">
            <h3 className="text-32 font-pinkfong font-bold whitespace-nowrap">{currentQuestion.question}</h3>
          </div>
        )}

        {/* 정답 통과 중 및 게임오버 시 해설 노출 */}
        {(phase === 'CORRECT_PASSING' || phase === 'GAME_OVER') && currentQuestion?.explanation && (
          <div className="absolute top-36 left-1/2 -translate-x-1/2 bg-surface-accent border border-border-accent flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg z-50 animate-fade-in-up">
            <div className="w-6 h-[31px] flex-shrink-0 flex items-center justify-center">
              <LightbulbIcon className="w-full h-full object-contain" />
            </div>
            <p className="font-pinkfong font-bold text-20 text-text-primary text-left break-keep">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* 게임오버 모달 (scale 축소 영역 내부로 진입하여 함께 축소되도록 함) */}
        <GameOverModal
          isOpen={isGameOverModalOpen}
          correctCount={correctCount}
          onRestart={handleRestart}
        />
      </div>


      <Canvas
        flat
        gl={{ antialias: true }}
        camera={{ fov: 26, position: [0, 0.3, 8.0] }}
        className="w-full h-full"
      >
        <color attach="background" args={["#D6f3ff"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />

        <CameraController />

        <Suspense fallback={null}>
          <Background />
          <Pathway />
          <Scenery />

          <MovingAnswerWall
            speed={wallSpeed}
            phase={phase}
            onCorrect={() => {
              const currentX = lanes[lane];
              triggerBreakEffect(currentX);
              handleCorrect();
            }}
            onWrong={handleWrong}
            onExit={handleExit}
            currentQuestion={currentQuestion}
            currentLane={lane}
          />

          <Character targetX={targetX} position={[0, -1.19, phase === 'GAME_OVER' ? -1.0 : -1.7]} phase={phase} />

          {/* 월드 스페이스에 고정 렌더링되는 폭발 이펙트들 */}
          {activeEffects.map((eff) => (
            <DoorBreakEffect key={eff.id} position={eff.position} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
