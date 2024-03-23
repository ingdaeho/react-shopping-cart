import type { Meta, StoryObj } from '@storybook/react';
import HighlightText from './HighlightText';

const meta: Meta<typeof HighlightText> = {
  tags: ['autodocs'],
  component: HighlightText,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HighlightText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '총 결제금액',
  },
};
