import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    appearance: {
      control: 'select',
      options: ['fill', 'ghost'],
    },
    onClickHandler: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryFill: Story = {
  args: {
    children: 'Primary Fill Button',
    variant: 'primary',
    appearance: 'fill',
  },
};

export const PrimaryGhost: Story = {
  args: {
    children: 'Primary Ghost Button',
    variant: 'primary',
    appearance: 'ghost',
  },
};

export const SecondaryFill: Story = {
  args: {
    children: 'Secondary Fill Button',
    variant: 'secondary',
    appearance: 'fill',
  },
};

export const SecondaryGhost: Story = {
  args: {
    children: 'Secondary Ghost Button',
    variant: 'secondary',
    appearance: 'ghost',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
