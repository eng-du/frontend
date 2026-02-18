import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router';
import { logout } from '@/api/auth';

function Header() {
  const { user, loading, clearAuth } = useAuth();

  if (loading) return null;

  return (
    <header className="fixed top-0 left-0 z-100 flex h-15 w-full items-center justify-between border-b-2 border-border-default bg-surface-weak px-20">
      <Link to={'/'}>
        <div className="flex items-center gap-2">
          <img src="logo.svg" alt="로고" className="w-9" />
          <div className="font-pinkfong text-20">잉듀</div>
        </div>
      </Link>
      <ul className="flex gap-5 text-12 text-text-secondary">
        {user ? (
          <>
            <Link to="/mypage">
              <button className="cursor-pointer">{user.name}</button>
            </Link>
            <button
              className="cursor-pointer"
              onClick={async () => {
                try {
                  await logout();
                  clearAuth();
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <button>
            <Link to="/login">로그인</Link>
          </button>
        )}
      </ul>
    </header>
  );
}

export default Header;
