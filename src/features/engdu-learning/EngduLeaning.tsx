import QuizPanel from './components/quiz-panel/QuizPanel';
import { useState } from 'react';
import type { EngduQuestion } from '@/types/quiz';
import ReaderSection from './components/reader-section/ReaderSection';
import ConfettiEffect from '@/components/ConfettiEffect';
import ProgressHeader from './components/progress-header/ProgressHeader';

const mockDetailEngdu = {
  engduId: 15,
  title: '환경 보호와 마이크로비즈 - 작은 플라스틱의 큰 영향',
  topic: 'environment',
  articles: [
    {
      content:
        'In the 1990s and early 2000s, small plastic beads called microbeads were widely used in face washes, toothpastes, and body scrubs. These microbeads were added to products because they helped remove dirt and dead skin. However, they were extremely small, often less than one millimeter in size. When people washed their faces or bodies, the beads were rinsed down the drain. Most sewage treatment systems were not designed to filter out such tiny particles, so large numbers of microbeads passed through the systems and entered rivers, lakes, and oceans.',
      translation:
        '1990년대와 2000년대 초반, 마이크로비즈라 불리는 작은 플라스틱 알갱이가 세안제, 치약, 바디 스크럽 등에 널리 사용되었습니다. 마이크로비즈는 먼지와 각질을 제거하는 데 도움이 되었지만 크기가 매우 작아 대부분 1밀리미터보다 작았습니다. 사람들이 얼굴이나 몸을 씻을 때 이 알갱이들은 하수구로 흘러갔고, 하수 처리 시설은 이러한 미세 입자를 걸러내도록 설계되지 않았기 때문에 많은 양의 마이크로비즈가 강, 호수, 바다로 유입되었습니다.',
    },
    {
      content:
        'Once microbeads entered natural waterways, they caused serious problems for wildlife. Small fish and other tiny animals often mistook the beads for food because they looked similar to fish eggs or plankton. When animals swallowed microbeads, the plastic could block their stomachs or fill up space, making the animals feel full even though they had eaten little real food. Scientists and environmental groups warned that these effects could harm entire ecosystems. As public awareness grew, many countries responded by creating laws. After 2015, several governments banned the use of microbeads in rinse-off cosmetic products, reducing one major source of microplastics in the environment.',
      translation:
        '마이크로비즈가 자연 수계로 들어가자 야생 동물에게 심각한 문제를 일으켰습니다. 작은 물고기와 미세 생물들은 마이크로비즈가 물고기 알이나 플랑크톤처럼 보여 이를 먹이로 착각했습니다. 동물이 마이크로비즈를 삼키면 플라스틱이 위를 막거나 공간을 차지해 실제 먹이를 충분히 먹지 못하게 됩니다. 과학자들과 환경 단체는 이러한 영향이 생태계 전체에 해를 끼칠 수 있다고 경고했고, 2015년 이후 여러 국가에서 씻어내는 화장품에 마이크로비즈 사용을 금지하는 법을 제정했습니다.',
    },
  ],
  questions: [
    {
      questionId: 1,
      content: 'Why were microbeads originally added to face washes and body scrubs?',
      choices: [
        {
          seq: 1,
          content: 'They helped remove dirt and dead skin',
          explanation:
            '지문에서 마이크로비즈는 세정 효과를 높이기 위해 먼지와 각질을 제거하는 용도로 사용되었다고 설명하고 있습니다.',
        },
        {
          seq: 2,
          content: 'They made products smell better',
          explanation: '지문에서는 향기와 관련된 내용은 언급되지 않았습니다.',
        },
        {
          seq: 3,
          content: 'They reduced water usage',
          explanation: '마이크로비즈가 물 사용량을 줄인다는 내용은 지문에 없습니다.',
        },
        {
          seq: 4,
          content: 'They replaced natural oils',
          explanation: '천연 오일을 대체했다는 설명은 지문과 관련이 없습니다.',
        },
      ],
      isCorrected: false,
      answer: null,
    },
    {
      questionId: 2,
      content: 'Why did microbeads easily enter rivers and oceans?',
      choices: [
        {
          seq: 1,
          content: 'Sewage systems could not filter out such small particles',
          explanation:
            '지문에서는 하수 처리 시설이 마이크로비즈처럼 작은 입자를 걸러내지 못했다고 설명합니다.',
        },
        {
          seq: 2,
          content: 'They were heavier than water',
          explanation: '마이크로비즈의 무게에 대한 언급은 없으며, 이것이 원인은 아닙니다.',
        },
        {
          seq: 3,
          content: 'People threw them directly into rivers',
          explanation: '사람들이 직접 강에 버렸다는 내용은 지문에 없습니다.',
        },
        {
          seq: 4,
          content: 'They dissolved into liquid plastic',
          explanation: '마이크로비즈는 녹지 않는 플라스틱으로, 지문 내용과 맞지 않습니다.',
        },
      ],
      isCorrected: false,
      answer: null,
    },
    {
      questionId: 3,
      content: 'Why did small animals mistake microbeads for food?',
      choices: [
        {
          seq: 1,
          content: 'They looked similar to fish eggs or plankton',
          explanation:
            '지문에서는 마이크로비즈가 물고기 알이나 플랑크톤처럼 보여 동물들이 먹이로 착각했다고 설명합니다.',
        },
        {
          seq: 2,
          content: 'They changed color in water',
          explanation: '색이 변했다는 내용은 지문에 없습니다.',
        },
        {
          seq: 3,
          content: 'They produced a strong smell',
          explanation: '냄새로 인해 착각했다는 설명은 지문과 관련이 없습니다.',
        },
        {
          seq: 4,
          content: 'They moved like living creatures',
          explanation: '마이크로비즈가 살아 있는 것처럼 움직였다는 내용은 없습니다.',
        },
      ],
      isCorrected: false,
      answer: null,
    },
    {
      questionId: 4,
      content: 'What action did many countries take after 2015?',
      choices: [
        {
          seq: 1,
          content: 'They banned microbeads in rinse-off cosmetic products',
          explanation:
            '지문에서는 2015년 이후 여러 국가가 씻어내는 화장품에서 마이크로비즈 사용을 금지했다고 설명합니다.',
        },
        {
          seq: 2,
          content: 'They increased the production of microbeads',
          explanation:
            '오히려 사용을 줄이기 위한 법이 만들어졌다고 설명되어 있어 지문과 반대됩니다.',
        },
        {
          seq: 3,
          content: 'They stopped using sewage treatment systems',
          explanation: '하수 처리 시설을 중단했다는 내용은 지문에 없습니다.',
        },
        {
          seq: 4,
          content: 'They encouraged the use of plastic scrubs',
          explanation: '플라스틱 스크럽 사용을 장려했다는 내용은 지문과 맞지 않습니다.',
        },
      ],
      isCorrected: false,
      answer: null,
    },
  ],
};

function EngduLearning() {
  const [questions, setQuestions] = useState<EngduQuestion[]>(mockDetailEngdu.questions);

  const initialStep = (() => {
    const firstUnsolvedIdx = mockDetailEngdu.questions.findIndex((q) => !q.isCorrected);
    return firstUnsolvedIdx === -1 ? 0 : firstUnsolvedIdx;
  })();

  const [step, setStep] = useState<number>(initialStep);

  return (
    <div className="relative flex h-full flex-col">
      <ProgressHeader
        title={mockDetailEngdu.title}
        step={step}
        setStep={setStep}
        isQuestionsCorrected={questions.map((question) => question.isCorrected)}
      />
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 snap-y snap-mandatory scroll-py-10 grid-cols-[7fr_5fr] gap-10 overflow-scroll px-25 py-10">
        <ReaderSection engdu={mockDetailEngdu} isLocked={!questions[1].isCorrected} />
        <QuizPanel
          questions={questions}
          step={step}
          setStep={setStep}
          setQuestions={setQuestions}
        />
      </div>
      {questions[1].isCorrected && <ConfettiEffect />}
    </div>
  );
}

export default EngduLearning;
