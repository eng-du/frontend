import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import GoogleIcon from '@/assets/icons/google.svg?react';
import EngduFullBookIcon from '@/assets/icons/engdu-full-book.svg?react';
import { ENV } from '@/config/env';

function Login() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card className="w-107.5 items-center py-16">
        <EngduFullBookIcon />
        <div className="flex flex-col items-center gap-3">
          <div className="font-pinkfong text-36">잉듀</div>
          <div className="text-center text-text-secondary">
            AI와 함께 즐거운
            <br /> 영어 학습을 시작해보세요!
          </div>
        </div>
        <a href={`${ENV.API_BASE_URL}/auth/url`} className="w-full">
          <Button variant="primary" appearance="ghost">
            <GoogleIcon />
            <div className="flex-1">구글로 시작하기</div>
          </Button>
        </a>
      </Card>
    </div>
  );
}

export default Login;
