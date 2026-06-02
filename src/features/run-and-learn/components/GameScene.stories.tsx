import type { Meta, StoryObj } from '@storybook/react';
import GameScene from './GameScene';

const meta = {
  title: 'Features/RunAndLearn/3D/GameScene',
  component: GameScene,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Three.js(React Three Fiber)를 이용하여 구현된 새로운 2.5D Flat 정적 게임 씬 컴포넌트입니다. SVG 텍스처들이 2.5D 빌보드 평면으로 완벽하게 레이어링 배치되어 있습니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="border-4 border-slate-800 rounded-xl overflow-hidden bg-[#85cd3b]" style={{ width: '1240px', height: '890px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameScene>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '2.5D Static Placement (No Texts & Motion)',
};
