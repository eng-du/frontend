import { Link } from 'react-router';
import MailIcon from '@/assets/icons/mail.svg?react';

function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-weak px-8 py-10 text-text-secondary lg:px-40 xl:px-80">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="text-14 flex gap-4 font-medium">
            <Link to="/policy/terms">이용약관</Link>
            <span className="text-border-default">|</span>
            <Link to="/policy/privacy">개인정보처리방침</Link>
          </div>
          <p className="flex items-center gap-2">
            <MailIcon className="h-4 w-4" />
            engdu.official@gmail.com
          </p>
        </div>
        <p className="text-12">© 2026 Engdu. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
