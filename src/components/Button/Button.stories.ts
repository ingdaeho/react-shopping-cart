import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';

const meta: Meta<typeof Button> = {
  tags: ['autodocs'],
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainedButton: Story = {
  args: {
    variant: 'contained',
    children: '주문하기',
  },
};

export const OutlinedButton: Story = {
  args: {
    variant: 'outlined',
    children: '장바구니',
  },
};
