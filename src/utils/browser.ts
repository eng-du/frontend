const IN_APP_KEYWORDS = [
  'kakaotalk',
  'instagram',
  'naver',
  'fb_iab',
  'fban',
  'fbav',
  'line',
  'twitter',
  'daum',
  'everytime',
];

export const checkIsInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent.toLowerCase();

  return IN_APP_KEYWORDS.some((keyword) => userAgent.includes(keyword));
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};
