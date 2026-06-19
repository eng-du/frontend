import { useNavigate } from 'react-router';
import UserIcon from '@/assets/icons/user.svg?react';
import FileTextIcon from '@/assets/icons/file-text.svg?react';
import ShieldCheckIcon from '@/assets/icons/shield-check.svg?react';
import MailIcon from '@/assets/icons/mail.svg?react';
import { MenuButton, MenuGroup } from './components/MenuButton/MenuButton';

function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between pt-8 pb-6 md:pt-20 md:pb-10">
      <div className="flex w-full max-w-[480px] flex-col gap-6 px-5">
        <MenuButton
          isSingle
          icon={<UserIcon className="h-5 w-5" />}
          label="내 정보"
          onClick={() => navigate('/mypage/my-info')}
        />

        <MenuGroup>
          <MenuButton
            icon={<FileTextIcon className="h-5 w-5" />}
            label="이용약관"
            onClick={() => navigate('/policy/terms')}
          />
          <MenuButton
            icon={<ShieldCheckIcon className="h-5 w-5" />}
            label="개인정보처리방침"
            onClick={() => navigate('/policy/privacy')}
          />
        </MenuGroup>

        <MenuButton isSingle label="로그아웃" hasArrow={false} onClick={() => {}} />
      </div>

      {/* 모바일 전용 하단 정보 (데스크톱/태블릿은 Layout의 Footer 사용) */}
      <div className="mt-8 flex flex-col items-center gap-3 md:hidden">
        <div className="flex items-center gap-2">
          <MailIcon className="h-5 w-5 text-text-secondary" />
          <span className="font-pretendard text-16 font-medium text-text-secondary">
            engdu.official@gmail.com
          </span>
        </div>
        <span className="font-pretendard text-14 font-medium text-text-secondary">
          © 2026 Engdu. All rights reserved.
        </span>
      </div>
    </div>
  );
}

export default MyPage;
