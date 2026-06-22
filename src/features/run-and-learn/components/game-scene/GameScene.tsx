import { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { PerspectiveCamera } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useQueryClient } from '@tanstack/react-query';
import Background from './Background';
import Pathway from './Pathway';
import Scenery from './Scenery';
import Character from './Character';
import { useGameState } from '../../hooks/useGameState';
import { useQuestionBuffer } from '../../hooks/useQuestionBuffer';
import { createRunAndLearnSession, endRunAndLearnSession } from '@/api/runAndLearn';
import type { SubmittedAnswer } from '@/api/runAndLearn';
import GameStartScreen from '../start-screen/GameStartScreen';
import DoorBreakEffect from './DoorBreakEffect';
import LightbulbIcon from '@/assets/game/lightbulb.svg?react';
import MovingAnswerWall from './MovingAnswerWall';
import GameOverModal from './GameOverModal';

// 카메라 시선 고정 및 모바일 반응형 FOV/위치 헬퍼
function CameraController({ aspect }: { aspect: number }) {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof PerspectiveCamera) {
      if (aspect < 1.2) {
        // 모바일(세로 카드 모드) 설정: 카메라 높이(Y)를 기존 0.3에서 0.8로 살짝 높임
        camera.position.set(0, 1.0, 8.0);
        camera.fov = 40; // 원하는 시야각(FOV)으로 여기서 직접 조절하실 수 있습니다.
      } else {
        // PC 설정: 기존 기본값으로 복원
        camera.position.set(0, 0.3, 8.0);
        camera.fov = 26;
      }
      camera.updateProjectionMatrix();
    }
  }, [aspect, camera]);

  useFrame((state) => {
    state.camera.lookAt(0, 0.3, -5.0);
  });
  return null;
}

export default function GameScene() {
  const queryClient = useQueryClient();
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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // 사용자가 제출한 답변 기록 수집
  const [submissions, setSubmissions] = useState<SubmittedAnswer[]>([]);

  // 게임 재시작 핸들러
  const handleRestart = useCallback(() => {
    setSessionId(null);
    setSubmissions([]);
    restart();
    setIsGameOverModalOpen(false);
  }, [restart]);

  const [scale, setScale] = useState(1);
  const [aspect, setAspect] = useState(1240 / 890);
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
      setAspect(width / height);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 퀴즈 버퍼링 훅 연결
  const { currentQuestion, consumeQuestion, initializeQuestions } = useQuestionBuffer(sessionId);

  // START 버튼 클릭 시 세션 생성 및 10개 문항 패칭
  const handleStartGame = useCallback(async () => {
    if (isStarting) return;
    setIsStarting(true);
    setSubmissions([]);

    try {
      // 1. 세션 생성 API 호출
      const res = await createRunAndLearnSession();
      const sid = res.sessionId;
      setSessionId(sid);

      // 2. 최초 10문항 로딩 및 대기
      await initializeQuestions(sid);

      // 3. 완료 시 즉시 PLAYING 단계로 전환
      setPhase('PLAYING');
    } catch {
      setSessionId(null);
    } finally {
      setIsStarting(false);
    }
  }, [isStarting, initializeQuestions, setPhase]);

  useEffect(() => {
    if (phase === 'GAME_OVER') {
      // 게임 종료 시점: 서버에 결과 제출
      if (sessionId) {
        endRunAndLearnSession(sessionId, {
          clientTotalScore: correctCount * 10,
          submittedAnswers: submissions,
        })
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: ['runAndLearn', 'leaderboard'],
            });
          })
          .catch((err) => {
            console.error('세션 종료 결과 제출 실패:', err);
          });
      }

      const timer = setTimeout(() => {
        setIsGameOverModalOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsGameOverModalOpen(false);
    }
  }, [phase, sessionId, correctCount, submissions, queryClient]);

  // 💥 월드 스페이스 이펙트 상태 관리
  const [activeEffects, setActiveEffects] = useState<{ id: number; position: [number, number, number] }[]>([]);

  const triggerBreakEffect = useCallback((x: number) => {
    const id = Date.now();
    setActiveEffects((prev) => [...prev, { id, position: [x, -1.2, -1.4] }]);

    // 1.2초 후 자동 소멸
    setTimeout(() => {
      setActiveEffects((prev) => prev.filter((eff) => eff.id !== id));
    }, 1200);
  }, []);

  // NEXT(다음 문제로 넘어감) 상태 감지 시 앞의 문제 소모 후 즉시 PLAYING으로 전환
  useEffect(() => {
    if (phase === 'NEXT') {
      consumeQuestion();
      setPhase('PLAYING');
    }
  }, [phase, consumeQuestion, setPhase]);

  // 벽이 카메라 뒤로 완전히 퇴장한 시점 (CORRECT_PASSING → NEXT)
  const handleExit = useCallback(() => {
    setPhase('NEXT');
  }, [setPhase]);

  // 🕹️ KEYBOARD LANE INTERACTION
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // PLAYING 상태에서만 레인 조작 허용 (CORRECT_PASSING 중에는 이동 차단)
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
  }, [phase, setLane]);

  // 🕹️ MOBILE GESTURE (SWIPE) INTERACTION
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (phase !== 'PLAYING') return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [phase]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (phase !== 'PLAYING' || !touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    const threshold = 50; // 스와이프 최소 픽셀 임계값 (값을 높일수록 더 많이 쓸어넘겨야 조작되어 감도가 낮아집니다)

    // 가로 이동 거리가 세로보다 크고 스레숄드를 넘었을 경우에만 스와이프로 인정
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setLane((prev) => Math.max(0, prev - 1)); // 왼쪽 스와이프 -> 왼쪽 이동
      } else {
        setLane((prev) => Math.min(2, prev + 1)); // 오른쪽 스와이프 -> 오른쪽 이동
      }
    }
    touchStartRef.current = null;
  }, [phase, setLane]);

  // Exact X-coordinate conversions for pixel-perfect centering in 3D
  const lanes = [-1.54, 0.0, 1.54];
  const targetX = lanes[lane];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="absolute inset-0 w-full h-full overflow-hidden outline-none select-none"
      style={{ touchAction: 'none' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 시작 화면 (IDLE 상태일 때만 노출) */}
      {phase === 'IDLE' && (
        <GameStartScreen
          isLoading={isStarting}
          onStart={handleStartGame}
        />
      )}

      {/* HTML OVERLAY UI (상태에 따른 인터페이스 오버레이, 모바일/데스크톱 대응) */}
      {aspect < 1.2 ? (
        /* HTML OVERLAY UI (모바일 반응형 카드 내부 레이아웃) */
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          {/* 상단 현재 문제 (게임 진행 및 게임오버 상태에서 노출) */}
          {(phase === 'PLAYING' || phase === 'CORRECT_PASSING' || phase === 'NEXT' || phase === 'GAME_OVER') && currentQuestion && (
            <div className="absolute top-6 left-6 right-6 bg-surface-weak px-4 py-3 rounded-2xl text-center z-50 shadow-md">
              <h3 className="text-16 sm:text-20 font-pinkfong font-bold break-keep">{currentQuestion.question}</h3>
            </div>
          )}

          {/* 정답 통과 중 및 게임오버 시 해설 노출 */}
          {(phase === 'CORRECT_PASSING' || phase === 'GAME_OVER') && currentQuestion?.explanation && (
            <div className="absolute top-28 left-6 right-6 bg-surface-accent border border-border-accent flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg z-50 animate-fade-in-up">
              <div className="w-5 h-[24px] flex-shrink-0 flex items-center justify-center">
                <LightbulbIcon className="w-full h-full object-contain" />
              </div>
              <p className="font-pinkfong font-bold text-14 text-text-primary text-left break-keep">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* 게임오버 모달 (카드 중앙 정렬) */}
          <GameOverModal
            isOpen={isGameOverModalOpen}
            correctCount={correctCount}
            onRestart={handleRestart}
            isMobile={true}
          />
        </div>
      ) : (
        /* HTML OVERLAY UI (기존 데스크톱 고정 디자인) */
        <div
          className="absolute w-[1240px] h-[890px] left-1/2 top-1/2 pointer-events-none z-10 overflow-hidden"
          style={{
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* 상단 현재 문제 */}
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

          {/* 게임오버 모달 */}
          <GameOverModal
            isOpen={isGameOverModalOpen}
            correctCount={correctCount}
            onRestart={handleRestart}
            isMobile={false}
          />
        </div>
      )}


      <Canvas
        flat
        gl={{ antialias: true }}
        camera={{ fov: 26, position: [0, 0.3, 8.0] }}
        className="w-full h-full"
      >
        <color attach="background" args={["#D6f3ff"]} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />

        <CameraController aspect={aspect} />

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
              if (currentQuestion) {
                setSubmissions((prev) => [
                  ...prev,
                  { questionId: currentQuestion.id, userAnswer: lane + 1 },
                ]);
              }
              handleCorrect();
            }}
            onWrong={() => {
              if (currentQuestion) {
                setSubmissions((prev) => [
                  ...prev,
                  { questionId: currentQuestion.id, userAnswer: lane + 1 },
                ]);
              }
              handleWrong();
            }}
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
