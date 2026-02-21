import DemoVideo from './DemoVideo';
import LandingSection from './LandingSection';
import chunkVideo from '@/assets/video/chunk.mp4';
import inputVideo from '@/assets/video/input.mp4';
import phrasalVideo from '@/assets/video/phrasal.mp4';
import quizVideo from '@/assets/video/quiz.mp4';

function LandingFeatureList() {
  return (
    <>
      <LandingSection
        title={`지루한 독해 지문은 안녕,\n내가 좋아하는 주제로 배워요`}
        description={`관심 있는 주제를 입력하면\nAI가 나만을 위한 맞춤 지문을 만들어요!`}
        media={<DemoVideo src={inputVideo} />}
      />
      <LandingSection
        title={`어려운 긴 문장도\n끊어 읽으면 쉬워져요`}
        description={`긴 문장을 작은 덩어리로 나누어\n문장 구조를 더 쉽게 파악하고 직독직해 능력을 향상시킬 수 있어요!`}
        order="reverse"
        media={<DemoVideo src={chunkVideo} />}
      />
      <LandingSection
        title="읽고 끝내지 않는 이해 중심 학습"
        description={`내용 이해, 문법, 어휘 등\n다양한 퀴즈 유형으로 학습 효과를 높여요!`}
        media={<DemoVideo src={quizVideo} />}
      />
      <LandingSection
        title="기다리는 시간도 학습으로"
        description={`잉듀가 생성되는 동안\n구동사와 예문을 통해 자연스럽게 표현을 익혀봐요!`}
        order="reverse"
        media={<DemoVideo src={phrasalVideo} />}
      />
    </>
  );
}

export default LandingFeatureList;
