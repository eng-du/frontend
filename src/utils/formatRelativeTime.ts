function parseUtc(date: string): Date {
  const d = new Date(date);

  return new Date(Date.UTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds(),
  ));
}

function formatRelativeTime(date: string): string {
  const parsedDate = parseUtc(date);
  const now = new Date();
  const diff = now.getTime() - parsedDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) return `${years}년 전`;
  if (months >= 1) return `${months}달 전`;
  if (days >= 1) return `${days}일 전`;
  if (hours >= 1) return `${hours}시간 전`;
  if (minutes >= 1) return `${minutes}분 전`;
  return '방금 전';
}

export default formatRelativeTime;
