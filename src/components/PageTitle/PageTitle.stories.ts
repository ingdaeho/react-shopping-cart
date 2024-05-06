import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  tags: ['autodocs'],
  component: PageTitle,
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPageTitle: Story = {
  args: {
    children: '주문 목록',
  },
};
