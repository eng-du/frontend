import type { EngduType } from "@/types/engdu";
import EngduTypeButton from "./EngduTypeButton";

interface EngduTypeSelectorProps {
  selectedEngduType: EngduType;
  onSelectHandler: (type: EngduType) => void
}

function EngduTypeSelector({ selectedEngduType, onSelectHandler }: EngduTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-semibold">잉듀 종류</div>
      <div className="flex gap-3">
        <EngduTypeButton
          value="지문"
          selected={selectedEngduType === '지문'}
          onSelectHandler={onSelectHandler}
        />
        <EngduTypeButton
          value="상황극"
          selected={selectedEngduType === '상황극'}
          onSelectHandler={onSelectHandler}
        />
      </div>
    </div>
  );
}

export default EngduTypeSelector