import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
  tags: ['autodocs'],
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    open: { control: 'boolean' },
  },
  args: {
    open: false,
    title: <h2>장바구니 담기</h2>,
    content: <div>장바구니에 상품을 추가했습니다</div>,
  },
  render: (args) => {
    const { open: openArg, title, content } = args;
    const [open, setOpen] = useState(openArg);

    useEffect(() => {
      setOpen(openArg);
    }, [openArg]);

    return (
      <>
        <Button size='small' onClick={() => setOpen(true)}>
          open
        </Button>
        <Modal
          open={open}
          title={title}
          content={content}
          footer={
            <Button size='small' onClick={() => setOpen(false)}>
              닫기
            </Button>
          }
        />
      </>
    );
  },
};
