import { cn } from "@/utils/cn";

interface TabItemProps {
    name: string;
    selected: boolean;
    onClick: () => void;
}
function TabItem({ name, selected, onClick }: TabItemProps) {
    return <div onClick={onClick} className={cn('w-full flex justify-center items-center rounded-md cursor-pointer transition-colors', selected && 'bg-surface-inverse text-text-weak')}>{name}</div>;
}

export default TabItem
