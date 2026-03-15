export const checkIsInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent.toLowerCase();

  const inAppKeywords = [
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

  return inAppKeywords.some((keyword) => userAgent.includes(keyword));
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};
