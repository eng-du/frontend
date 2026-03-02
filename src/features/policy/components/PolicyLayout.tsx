import type { ReactNode } from 'react';

interface PolicyLayoutProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

function PolicyLayout({ title, effectiveDate, children }: PolicyLayoutProps) {
  return (
    <div className="flex flex-col gap-6 px-8 py-10 lg:px-40 xl:px-80">
      <h1 className="font-pinkfong text-36">{title}</h1>
      <div className="text-14 text-text-secondary">본 약관은 {effectiveDate}부터 시행됩니다.</div>
      <div className="rounded-xl border border-border-default bg-surface-weak p-6">{children}</div>
    </div>
  );
}

export default PolicyLayout;
