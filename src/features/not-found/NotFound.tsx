import EngduFaceError from '@/assets/icons/engdu-face-error.svg?react';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10">
      <EngduFaceError />
      <div className="flex flex-col items-center gap-4">
        <div className="text-50 font-bold">404</div>
        <div className="text-text-secondary">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</div>
      </div>
      <Button variant="secondary" onClickHandler={() => navigate('/')}>
        홈으로 바로가기
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default NotFound;
