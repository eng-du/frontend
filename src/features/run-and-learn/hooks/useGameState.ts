import { useState, useCallback } from 'react';

export type GamePhase = 'IDLE' | 'PLAYING' | 'CORRECT_PASSING' | 'NEXT' | 'GAME_OVER';

const BASE_SPEED = 0.08;
const MAX_SPEED = 0.13;

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>('IDLE');
  const [lane, setLane] = useState<number>(1); // 0 = Left, 1 = Middle, 2 = Right
  const [correctCount, setCorrectCount] = useState(0);

  // 정답 수에 비례하여 속도 단계적 상승 (1개 맞출 때마다 0.005씩 증가)
  const wallSpeed = Math.min(BASE_SPEED + correctCount * 0.005, MAX_SPEED);

  // 정답 판정: 멈추지 않고 CORRECT_PASSING 상태로 전환
  // 벽이 카메라 뒤로 완전히 퇴장한 시점(z >= 38)을 GameScene 프레임루프에서 감지하여 NEXT → PLAYING 순서로 전환
  const handleCorrect = useCallback(() => {
    setCorrectCount((prev) => prev + 1);
    setPhase('CORRECT_PASSING');
  }, []);

  const handleWrong = useCallback(() => {
    setPhase('GAME_OVER');
  }, []);

  const restart = useCallback(() => {
    setCorrectCount(0);
    setLane(1);
    setPhase('IDLE');
  }, []);

  return {
    phase,
    setPhase,
    lane,
    setLane,
    correctCount,
    wallSpeed,
    handleCorrect,
    handleWrong,
    restart,
  };
}
