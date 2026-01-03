interface LabelProps {
  part: 1 | 2;
}

function Label({ part }: LabelProps) {
  return (
    <div className="rounded-xl bg-surface-strong px-3 py-1 text-12 font-bold text-text-secondary">
      PART {part}
    </div>
  );
}

export default Label;
