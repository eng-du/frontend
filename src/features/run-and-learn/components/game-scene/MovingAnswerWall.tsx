import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import AnswerWall from './AnswerWall';
import type { RunAndLearnQuestionResponse } from '@/api/runAndLearn';

interface MovingAnswerWallProps {
  speed: number;
  phase: string;
  onCorrect: () => void;
  onWrong: () => void;
  onExit: () => void;
  currentQuestion: RunAndLearnQuestionResponse | null;
  currentLane: number;
}

/** 🚪 퀴즈 데이터 및 판정 로직이 연동되어 앞으로 다가오는 벽 컴포넌트 */
export default function MovingAnswerWall({
  speed,
  phase,
  onCorrect,
  onWrong,
  onExit,
  currentQuestion,
  currentLane,
}: MovingAnswerWallProps) {
  const groupRef = useRef<THREE.Group>(null);
  const prevPhaseRef = useRef<string>(phase);
  const judgedRef = useRef(false);
  const exitedRef = useRef(false);

  useFrame(() => {
    if (!groupRef.current) return;

    // PLAYING으로 전환되는 첫 프레임: 이전 사이클의 플래그를 모두 초기화
    if (phase === 'PLAYING' && prevPhaseRef.current !== 'PLAYING') {
      judgedRef.current = false;
      exitedRef.current = false;
      groupRef.current.position.z = 0;
    }
    prevPhaseRef.current = phase;

    if (phase === 'PLAYING' || phase === 'CORRECT_PASSING') {
      // 정답/오답 여부와 무관하게 벽은 계속 전진
      groupRef.current.position.z += speed;

      // 판정 임계값 28.0 = 스폰 오프셋(30) + 캐릭터 z 위치(-2.0)
      if (phase === 'PLAYING' && groupRef.current.position.z >= 28.0 && !judgedRef.current) {
        judgedRef.current = true;
        if (currentQuestion) {
          const answerLane = currentQuestion.answer - 1;
          if (currentLane === answerLane) {
            onCorrect();
          } else {
            // 오답 판정 시 벽의 위치를 정확히 28.0으로 스냅하여 캐릭터를 추월하지 않도록 함
            groupRef.current.position.z = 28.0;
            onWrong();
          }
        }
      }

      // 퇴장 판정: z = 38 (카메라 뒤로 완전히 통과)
      if (phase === 'CORRECT_PASSING' && groupRef.current.position.z >= 38 && !exitedRef.current) {
        exitedRef.current = true;
        onExit();
      }
    } else if (phase === 'NEXT') {
      groupRef.current.position.z = 0;
      judgedRef.current = false;
      exitedRef.current = false;
    }
  });

  return (
    <group ref={groupRef}>
      <AnswerWall
        positionZ={-30}
        options={currentQuestion ? [currentQuestion.choice1, currentQuestion.choice2, currentQuestion.choice3] : undefined}
        answerLane={currentQuestion ? currentQuestion.answer - 1 : -1}
        phase={phase}
      />
    </group>
  );
}
