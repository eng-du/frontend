import AnswerCard from './AnswerCard';
import imgPolygon6 from '@/assets/game/door_icon_rhombus.svg';
import imgStar3 from '@/assets/game/door_icon_star.svg';
import imgVector from '@/assets/game/door_icon_heart.svg';

interface AnswerWallProps {
  positionZ?: number;
  options?: [string, string, string];
  answerLane?: number;
  phase?: string;
}

export default function AnswerWall({
  positionZ = -12,
  options = ['', '', ''],
  answerLane = -1,
  phase = 'PLAYING',
}: AnswerWallProps) {
  // Seamless horizontal alignment (Card width = 1.54, 3 cards total width = 4.62)
  // Shift left by 2.31 (half of total width) to perfectly center-align the wall on X = 0!
  const xLeft = -2.31;
  const xMiddle = -0.77;
  const xRight = 0.77;
  const yBase = -1.2;

  return (
    <group>
      {/* 1. Left Option Card (Rhombus Icon) */}
      <AnswerCard
        position={[xLeft, yBase, positionZ]}
        keyholeTextureUrl={imgPolygon6}
        corner="left"
        showDivider={true}
        optionText={options[0]}
        isCorrect={answerLane === 0}
        phase={phase}
      />

      {/* 2. Middle Option Card (Heart Icon) */}
      <AnswerCard
        position={[xMiddle, yBase, positionZ]}
        keyholeTextureUrl={imgVector}
        corner="middle"
        showDivider={true}
        optionText={options[1]}
        isCorrect={answerLane === 1}
        phase={phase}
      />

      {/* 3. Right Option Card (Star Icon) */}
      <AnswerCard
        position={[xRight, yBase, positionZ]}
        keyholeTextureUrl={imgStar3}
        corner="right"
        showDivider={false}
        optionText={options[2]}
        isCorrect={answerLane === 2}
        phase={phase}
      />
    </group>
  );
}

