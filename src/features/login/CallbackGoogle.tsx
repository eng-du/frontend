import { googleLogin } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import authTokenStore from '@/store/authToken';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

function CallbackGoogle() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const hasRequestedRef = useRef(false);

  const { refreshMe } = useAuth();

  useEffect(() => {
    if (hasRequestedRef.current) return;

    const code = params.get('code');
    const error = params.get('error');

    if (error || !code) {
      navigate('/login', { replace: true });
      return;
    }

    hasRequestedRef.current = true;

    (async () => {
      try {
        const { accessToken } = await googleLogin(code);
        authTokenStore.set(accessToken);

        await refreshMe();
        navigate('/', { replace: true });
      } catch (e) {
        console.error(e);
        navigate('/login', { replace: true });
      }
    })();
  }, [params, navigate, refreshMe]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">로그인 처리 중입니다…</p>
        <p className="mt-2 text-sm text-text-secondary">잠시만 기다려 주세요</p>
      </div>
    </div>
  );
}

export default CallbackGoogle;
