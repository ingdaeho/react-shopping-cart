import type { Meta, StoryObj } from '@storybook/react';
import NumberInput from './NumberInput';
import { useState } from 'react';

const meta: Meta<typeof NumberInput> = {
  tags: ['autodocs'],
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultNumberInput: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return <NumberInput value={value} setValue={setValue} />;
  },
};
