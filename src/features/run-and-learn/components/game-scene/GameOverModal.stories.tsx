import type { Meta, StoryObj } from '@storybook/react';
import GameOverModal from './GameOverModal';

const meta = {
  title: 'Features/RunAndLearn/GameScene/GameOverModal',
  component: GameOverModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      // 툴바의 뷰포트 셀렉터에 런앤런 전용 카드 해상도 등록
      viewports: {
        mobileCard: {
          name: 'Mobile Card (327x592)',
          styles: { width: '327px', height: '592px' },
        },
        tabletCard: {
          name: 'Tablet Card (768x550)',
          styles: { width: '768px', height: '550px' },
        },
        desktopCard: {
          name: 'Desktop Card (1240x890)',
          styles: { width: '1240px', height: '890px' },
        },
      },
      defaultViewport: 'desktopCard', // 기본 실행은 데스크톱 카드 크기
    },
  },
  decorators: [
    (Story) => (
      <div className="relative w-screen h-screen bg-slate-800 flex items-center justify-center overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameOverModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    correctCount: 7,
    onRestart: () => console.log('Restart clicked'),
  },
};
