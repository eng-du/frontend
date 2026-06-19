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
    device: {
      control: 'select',
      options: ['desktop', 'tablet', 'mobile'],
    },
    onClickHandler: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryFill: Story = {
  args: {
    children: 'Primary Fill Button (Desktop)',
    variant: 'primary',
    appearance: 'fill',
    device: 'desktop',
  },
};

export const PrimaryMobileFill: Story = {
  args: {
    children: 'Primary Fill Button (Mobile)',
    variant: 'primary',
    appearance: 'fill',
    device: 'mobile',
  },
};

export const PrimaryGhost: Story = {
  args: {
    children: 'Primary Ghost Button (Desktop)',
    variant: 'primary',
    appearance: 'ghost',
    device: 'desktop',
  },
};

export const PrimaryMobileGhost: Story = {
  args: {
    children: 'Primary Ghost Button (Mobile)',
    variant: 'primary',
    appearance: 'ghost',
    device: 'mobile',
  },
};

export const SecondaryFill: Story = {
  args: {
    children: 'Secondary Fill (Desktop)',
    variant: 'secondary',
    appearance: 'fill',
    device: 'desktop',
  },
};

export const SecondaryMobileFill: Story = {
  args: {
    children: 'Secondary Fill (Mobile)',
    variant: 'secondary',
    appearance: 'fill',
    device: 'mobile',
  },
};

export const SecondaryGhost: Story = {
  args: {
    children: 'Secondary Ghost (Desktop)',
    variant: 'secondary',
    appearance: 'ghost',
    device: 'desktop',
  },
};

export const SecondaryMobileGhost: Story = {
  args: {
    children: 'Secondary Ghost (Mobile)',
    variant: 'secondary',
    appearance: 'ghost',
    device: 'mobile',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
