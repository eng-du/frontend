import Button from '@/components/Button';
import Card from '@/components/Card';
import GoogleIcon from '@/assets/icons/google.svg?react';
import EngduFullBookIcon from '@/assets/icons/engdu-full-book.svg?react';
import { Link } from 'react-router';
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
        <Link to={`${ENV.API_BASE_URL}/auth/url`} className="w-full">
          <Button type="primary" style="ghost">
            <GoogleIcon />
            <div className="flex-1">구글로 시작하기</div>
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default Login;
