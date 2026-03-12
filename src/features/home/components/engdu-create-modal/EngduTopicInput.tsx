interface EngduTopicInputProps {
  value: string;
  onChange: (value: string) => void;
}

function EngduTopicInput({ value, onChange }: EngduTopicInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-semibold">원하는 주제 (최대 30자)</div>
      <input
        type="text"
        name="topic"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 배에서 꼬르륵 소리가 나는 이유"
        className="amp-unmask h-15 rounded-2xl border border-border-default px-5 placeholder:text-text-secondary"
        maxLength={30}
      />
    </div>
  );
}

export default EngduTopicInput;
