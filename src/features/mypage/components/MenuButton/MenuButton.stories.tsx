import type { Meta, StoryObj } from '@storybook/react';
import { MenuButton, MenuGroup } from './MenuButton';
import { ReactNode } from 'react';

const meta: Meta<typeof MenuButton> = {
  title: 'Features/Mypage/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

// 아이콘 더미 (스토리북용)
const UserIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3154 14.1014 15.6903 13.4763C15.0652 12.8512 14.2173 12.5 13.3333 12.5H6.66665C5.78259 12.5 4.93474 12.8512 4.30962 13.4763C3.6845 14.1014 3.33331 14.9493 3.33331 15.8333V17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99998 9.16667C11.8409 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.8409 2.5 9.99998 2.5C8.15903 2.5 6.66665 3.99238 6.66665 5.83333C6.66665 7.67428 8.15903 9.16667 9.99998 9.16667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileTextIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.6667 1.66667H5C4.55797 1.66667 4.13405 1.84226 3.82149 2.15482C3.50893 2.46738 3.33333 2.89131 3.33333 3.33334V16.6667C3.33333 17.1087 3.50893 17.5326 3.82149 17.8452C4.13405 18.1577 4.55797 18.3333 5 18.3333H15C15.442 18.3333 15.8659 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V6.66667L11.6667 1.66667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.6667 1.66667V6.66667H16.6667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 10.8333H6.66666"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 14.1667H6.66666"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33333 7.5H6.66666"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 1.66667H5.83333C5.39131 1.66667 4.96738 1.84226 4.65482 2.15482C4.34226 2.46738 4.16667 2.89131 4.16667 3.33334V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V5L12.5 1.66667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 1.66667V5H15.8333"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SingleWithIconAndArrow: Story = {
  args: {
    label: '내 정보',
    icon: <UserIcon />,
    hasArrow: true,
    isSingle: true,
  },
  render: (args) => (
    <div className="w-[335px] max-w-full">
      <MenuButton {...args} />
    </div>
  ),
};

export const GroupedItems: Story = {
  render: () => (
    <div className="w-[335px] max-w-full">
      <MenuGroup>
        <MenuButton label="이용약관" icon={<FileTextIcon />} hasArrow={true} />
        <MenuButton label="개인정보처리방침" icon={<DocumentIcon />} hasArrow={true} />
      </MenuGroup>
    </div>
  ),
};

export const NoIconSingle: Story = {
  args: {
    label: '버전 정보',
    hasArrow: true,
    isSingle: true,
  },
  render: (args) => (
    <div className="w-[335px] max-w-full">
      <MenuButton {...args} />
    </div>
  ),
};

export const NoArrowSingle: Story = {
  args: {
    label: '로그아웃',
    hasArrow: false,
    isSingle: true,
  },
  render: (args) => (
    <div className="w-[335px] max-w-full">
      <MenuButton {...args} />
    </div>
  ),
};
