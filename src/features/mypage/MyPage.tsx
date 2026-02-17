import { useState } from 'react';
import FormField from './components/FormField';
import MailIcon from '@/assets/icons/mail.svg?react';
import UserIcon from '@/assets/icons/user.svg?react';
import WithdrawIcon from '@/assets/icons/log-out.svg?react';
import WithdrawModal from './components/WithdrawModal';

function MyPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 API 연동
    setIsWithdrawModalOpen(false);
  };

  return (
    <div className="flex h-full justify-center pt-40">
      <div className="flex w-full flex-col gap-8 px-10 sm:px-20 md:px-40 xl:px-80">
        <div className="flex flex-col gap-5">
          <FormField label="이메일" value={'user@example.com'} type="email" Icon={MailIcon} />
          <FormField
            label="닉네임"
            value={'잉듀러버'}
            type="text"
            Icon={UserIcon}
            disabled={false}
            onChangeHandler={() => {}}
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
