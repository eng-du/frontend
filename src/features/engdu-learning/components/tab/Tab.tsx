import TabItem from './TabItem';

interface TabProps {
  activeTab: '지문' | '퀴즈';
  onTabChange: (tab: '지문' | '퀴즈') => void;
}

function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <div className="absolute bottom-8 left-1/2 grid aspect-18/3 w-5/6 max-w-100 -translate-x-1/2 grid-cols-2 gap-3 rounded-xl border border-border-default bg-surface-weak p-2 shadow-default">
      <TabItem name="지문" selected={activeTab === '지문'} onClick={() => onTabChange('지문')} />
      <TabItem name="퀴즈" selected={activeTab === '퀴즈'} onClick={() => onTabChange('퀴즈')} />
    </div>
  );
}

export default Tab;
