import type { Meta, StoryObj } from '@storybook/react-vite';
import BottomNavigationBar from './BottomNavigationBar';
import type { TabType } from './BottomNavigationBar';
import { useState } from 'react';

const meta: Meta<typeof BottomNavigationBar> = {
  title: 'Components/Common/BottomNavigationBar',
  component: BottomNavigationBar,
  tags: ['autodocs'],
  args: {
    className: 'absolute', // fixed 포지셔닝을 absolute로 오버라이딩하여 스토리북 시뮬레이션 박스 하단에 핏팅시킴
  },
  decorators: [
    (Story) => (
      <div className="relative w-full max-w-[480px] h-[300px] border border-border-default bg-surface-default mx-auto overflow-hidden rounded-xl shadow-lg">
        <div className="p-4 text-text-secondary text-14 text-center">
          모바일 기기 뷰포트 시뮬레이션 (최대 가로 480px)
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomNavigationBar>;

// 인터랙티브 상태 관리가 포함된 기본 스토리
export const Interactive: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<TabType>('home');
    return (
      <BottomNavigationBar
        {...args}
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
      />
    );
  },
};

// 개별 활성 상태 고정 프리뷰 스토리들
export const HomeActive: Story = {
  args: {
    activeTab: 'home',
    onChangeTab: () => { },
  },
};

export const RunAndLearnActive: Story = {
  args: {
    activeTab: 'run-and-learn',
    onChangeTab: () => { },
  },
};

export const RankingActive: Story = {
  args: {
    activeTab: 'ranking',
    onChangeTab: () => { },
  },
};

export const MyPageActive: Story = {
  args: {
    activeTab: 'mypage',
    onChangeTab: () => { },
  },
};
