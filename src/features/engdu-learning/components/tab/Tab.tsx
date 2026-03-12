import TabItem from "./TabItem"

interface TabProps {
    activeTab: '지문' | '퀴즈';
    onTabChange: (tab: '지문' | '퀴즈') => void;
}

function Tab({ activeTab, onTabChange }: TabProps) {
    return (
        <div className="w-5/6 max-w-100 bg-surface-weak border border-border-default rounded-xl absolute bottom-8 left-1/2 -translate-x-1/2 shadow-default grid grid-cols-2 gap-3 p-2 h-15">
            <TabItem name="지문" selected={activeTab === '지문'} onClick={() => onTabChange('지문')} />
            <TabItem name="퀴즈" selected={activeTab === '퀴즈'} onClick={() => onTabChange('퀴즈')} />
        </div>
    )
}

export default Tab