import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SnackBar from './SnackBar';
import Button from '../Button/Button';

const meta: Meta<typeof SnackBar> = {
  tags: ['autodocs'],
  component: SnackBar,
  parameters: {},
} satisfies Meta<typeof SnackBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    open: { control: 'boolean' },
  },
  args: {
    message: '장바구니에 추가했습니다',
  },
  render: (args) => {
    const { open, message } = args;
    const [showSnackBar, setShowSnackBar] = useState(open);

    const handleCloseSnackBar = () => setShowSnackBar(false);

    return (
      <>
        <Button size='small' onClick={() => setShowSnackBar(true)}>
          show
        </Button>
        <SnackBar
          open={showSnackBar}
          onClose={handleCloseSnackBar}
          message={message}
        />
      </>
    );
  },
};
