import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import { useState } from 'react';
import Button from '../Button/Button';

const ModalWrapper = (props: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClickHandler={() => setIsOpen(true)}>모달 열기</Button>
      <Modal {...props} isOpen={isOpen} onCloseHandler={() => setIsOpen(false)}>
        <div className="p-10 flex flex-col gap-4">
          <h2 className="text-xl font-bold">모달 제목</h2>
          <p>모달 내용입니다.</p>
          <Button onClickHandler={() => setIsOpen(false)}>닫기</Button>
        </div>
      </Modal>
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'Components/Common/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => <ModalWrapper />,
};
