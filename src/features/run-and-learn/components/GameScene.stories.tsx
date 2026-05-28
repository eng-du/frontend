import type { Meta, StoryObj } from '@storybook/react';
import GameScene from './GameScene';

const meta = {
  title: 'Features/RunAndLearn/Components/GameScene',
  component: GameScene,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '하늘, 잔디밭, 원근감 도로, 부유하는 구름들, 필드 꽃들과 바위 오브젝트, 그리고 3종의 답변 카드와 발밑 그림자를 탑재한 병아리 뒷모습 캐릭터까지 통합 조립한 핵심 인게임 씬(GameScene) 컴포넌트입니다. (퀴즈 질문지 팝업 패널은 요청에 따라 제외되었습니다.)',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="border-4 border-slate-800 rounded-xl overflow-hidden bg-[#85cd3b]" style={{ width: '1240px', height: '890px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Full Game Scene Preview (No Quiz Panel)',
};
