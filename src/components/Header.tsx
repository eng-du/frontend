function Header() {
  return (
    <header className="fixed top-0 left-0 z-100 flex h-15 w-full items-center justify-between border-b-2 border-border-default bg-surface-weak px-20">
      <div className="flex gap-2">
        <img src="logo.svg" alt="로고" className="aspect-square w-10" />
        <div className="font-pinkfong text-20">잉듀</div>
      </div>
      <ul className="flex gap-5 text-12 text-text-secondary">
        <li>마이페이지</li>
        <li>로그아웃</li>
      </ul>
    </header>
  );
}

export default Header;
