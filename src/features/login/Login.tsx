import { useState } from 'react';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { Link } from 'react-router';
import GoogleIcon from '@/assets/icons/google.svg?react';
import EngduFullBookIcon from '@/assets/icons/engdu-full-book.svg?react';
import { ENV } from '@/config/env';
import { checkIsInAppBrowser } from '@/utils/browser';
import InAppBrowserWarningModal from '@/features/login/components/InAppBrowserWarningModal';

function Login() {
  const loginUrl = import.meta.env.DEV
    ? `${ENV.API_BASE_URL}/auth/local/url`
    : `${ENV.API_BASE_URL}/auth/url`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGoogleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (checkIsInAppBrowser()) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <Card className="w-full max-w-107.5 items-center py-10 md:py-16">
        <EngduFullBookIcon />
        <div className="flex flex-col items-center gap-3">
          <div className="font-pinkfong text-36">잉듀</div>
          <div className="text-center text-text-secondary">
            AI와 함께 즐거운
            <br /> 영어 학습을 시작해보세요!
          </div>
        </div>
        <a href={loginUrl} onClick={handleGoogleLoginClick} className="w-full">
          <Button variant="primary" appearance="ghost">
            <GoogleIcon />
            <div className="flex-1">구글로 시작하기</div>
          </Button>
        </a>
        <div className="text-12 text-text-secondary">
          로그인 시{' '}
          <Link to="/policy/terms" className="text-text-brand-primary">
            이용약관
          </Link>
          과{' '}
          <Link to="/policy/privacy" className="text-text-brand-primary">
            개인정보처리방침
          </Link>
          에 동의하게 됩니다.
        </div>
      </Card>

      <InAppBrowserWarningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Login;
