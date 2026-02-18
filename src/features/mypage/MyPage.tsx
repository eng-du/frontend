import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import FormField from './components/FormField';
import MailIcon from '@/assets/icons/mail.svg?react';
import UserIcon from '@/assets/icons/user.svg?react';
import WithdrawIcon from '@/assets/icons/log-out.svg?react';
import WithdrawModal from './components/WithdrawModal';
import { deleteWithdraw, getMeDetail, patchMeName } from '@/api/user';
import { useAuth } from '@/hooks/useAuth';

function MyPage() {
  const navigate = useNavigate();
  const { refreshMe, clearAuth } = useAuth();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [userData, setUserData] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMeDetail();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user detail:', error);
      }
    })();
  }, []);

  const handleNameChange = async (newName: string) => {
    try {
      await patchMeName(newName);
      setUserData((prev) => (prev ? { ...prev, name: newName } : null));
      await refreshMe(); // 헤더 등 전역 유저 정보 갱신
    } catch (error) {
      console.error('Failed to update name:', error);
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  const handleWithdraw = async () => {
    try {
      await deleteWithdraw();
      clearAuth();
      setIsWithdrawModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to withdraw:', error);
      alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  if (!userData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-brand-default border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-full justify-center pt-40">
      <div className="flex w-full flex-col gap-8 px-10 sm:px-20 md:px-40 xl:px-80">
        <div className="flex flex-col gap-5">
          <FormField label="이메일" value={userData.email} type="email" Icon={MailIcon} />
          <FormField
            label="닉네임"
            value={userData.name}
            type="text"
            Icon={UserIcon}
            disabled={false}
            maxLength={30}
            onChangeHandler={handleNameChange}
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
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}

export default MyPage;
