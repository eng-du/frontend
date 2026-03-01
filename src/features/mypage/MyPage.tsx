import { useState } from 'react';
import { useNavigate } from 'react-router';
import FormField from './components/FormField';
import MailIcon from '@/assets/icons/mail.svg?react';
import UserIcon from '@/assets/icons/user.svg?react';
import WithdrawIcon from '@/assets/icons/log-out.svg?react';
import WithdrawModal from './components/WithdrawModal';
import { deleteWithdraw, getMeDetail, patchName } from '@/api/user';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

function MyPage() {
  const navigate = useNavigate();
  const { refreshMe, clearAuth } = useAuth();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user', 'detail'],
    queryFn: getMeDetail,
  });

  const { mutateAsync: patchNameMutateAsync, isPending: isPatching } = useMutation({
    mutationFn: patchName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'detail'] });
      refreshMe();
      toast.success('닉네임이 변경되었습니다.');
    },
    onError: () => {
      toast.error('닉네임 변경에 실패했습니다.');
    },
  });

  const { mutate: deleteWithdrawMutate } = useMutation({
    mutationFn: deleteWithdraw,
    onSuccess: () => {
      clearAuth();
      setIsWithdrawModalOpen(false);
      navigate('/');
    },
    onError: () => {
      alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  return (
    user && (
      <div className="flex h-full justify-center pt-40">
        <div className="flex w-full flex-col gap-8 px-10 sm:px-20 md:px-40 xl:px-80">
          <div className="flex flex-col gap-5">
            <FormField label="이메일" value={user.email} type="email" Icon={MailIcon} />
            <FormField
              label="닉네임"
              value={user.name}
              type="text"
              Icon={UserIcon}
              disabled={false}
              maxLength={30}
              onChangeHandler={patchNameMutateAsync}
              isSaving={isPatching}
            />
          </div>
          <hr className="border-0.5 border-border-default" />
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 self-end text-text-danger"
          >
            <WithdrawIcon className="h-5 w-5" />
            회원 탈퇴
          </button>
        </div>

        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          onWithdraw={deleteWithdrawMutate}
        />
      </div>
    )
  );
}

export default MyPage;
