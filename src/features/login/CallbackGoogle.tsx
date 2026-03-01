import { googleLogin } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import authTokenStore from '@/store/authToken';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

function CallbackGoogle() {
  const [params] = useSearchParams();
  const code = params.get('code');
  const error = params.get('error');
  const navigate = useNavigate();
  const hasRequestedRef = useRef(false);
  const { refreshMe } = useAuth();

  const { mutate: googleLoginMutate } = useMutation({
    mutationFn: googleLogin,
    onSuccess: (response) => {
      authTokenStore.set(response.accessToken);
      refreshMe();
      navigate('/', { replace: true });
    },
    onError: () => {
      toast.error('로그인에 실패했습니다.');
      navigate('/login', { replace: true });
    },
  });

  useEffect(() => {
    if (hasRequestedRef.current) return;

    if (error || !code) {
      navigate('/login', { replace: true });
      return;
    }

    hasRequestedRef.current = true;

    googleLoginMutate(code);
  }, [params, navigate, refreshMe, googleLoginMutate]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <p className="text-20 font-bold">로그인 처리 중입니다…</p>
      <p className="text-text-secondary">잠시만 기다려 주세요</p>
    </div>
  );
}

export default CallbackGoogle;
