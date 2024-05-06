import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  tags: ['autodocs'],
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args: {},
};

export const CheckboxWithLabel: Story = {
  args: {
    label: '선택해제',
  },
};
