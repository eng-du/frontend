interface EngduTopicInputProps {
  value: string;
  onChange: (value: string) => void;
}

function EngduTopicInput({ value, onChange }: EngduTopicInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-semibold">원하는 주제</div>
      <input
        type="text"
        name="topic"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예: 환경 보호, 우주 여행, 일상 대화 등"
        className="h-15 rounded-2xl border border-border-default px-5 placeholder:text-text-secondary"
      />
    </div>
  );
}

export default EngduTopicInput;
