import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router';
import { logout } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

function Header() {
  const { user, isPending, clearAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      if (location.pathname !== '/') {
        navigate('/');
      }
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다.');
    },
  });

  return (
    <header className="fixed top-0 left-0 z-100 flex h-15 w-full items-center justify-between border-b border-border-default bg-surface-weak px-8 lg:px-16 xl:px-25">
      <Link to={'/'}>
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="로고" className="w-9" />
          <div className="font-pinkfong text-20">잉듀</div>
        </div>
      </Link>
      {!isPending && (
        <div className="flex gap-5 text-12 text-text-secondary">
          {user ? (
            <>
              <Link to="/run-and-learn" className="cursor-pointer">
                런앤런
              </Link>
              <Link to="/mypage" className="cursor-pointer">
                {user.name}
              </Link>
              <button className="cursor-pointer" onClick={() => logoutMutate()}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login" className="cursor-pointer">
              로그인
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
