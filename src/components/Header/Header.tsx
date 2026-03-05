import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router';
import { logout } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

function Header() {
  const { user, isPending, clearAuth } = useAuth();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다.');
    },
  });

  return (
    <header className="fixed top-0 left-0 z-100 flex h-15 w-full items-center justify-between border-b border-border-default bg-surface-weak px-20">
      <Link to={'/'}>
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="로고" className="w-9" />
          <div className="font-pinkfong text-20">잉듀</div>
        </div>
      </Link>
      {!isPending && (
        <ul className="flex gap-5 text-12 text-text-secondary">
          {user ? (
            <>
              <Link to="/mypage">
                <button className="cursor-pointer">{user.name}</button>
              </Link>
              <button className="cursor-pointer" onClick={() => logoutMutate()}>
                로그아웃
              </button>
            </>
          ) : (
            <button>
              <Link to="/login">로그인</Link>
            </button>
          )}
        </ul>
      )}
    </header>
  );
}

export default Header;
