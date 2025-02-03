import type { Meta, StoryObj } from '@storybook/react';
import EventCard from '../components/TicketSection/EventCard';
import { fn } from '@storybook/test';

const meta = {
  title: 'Event Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',  // Center the component
  },
  tags: ['none'],
  args: {
    onThemeChange: fn(),  // Add a spy function that logs calls in Storybook's action panel
  },
} satisfies Meta<typeof EventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: '/EventImage.png',  // Replace with an actual image URL
    title: "Prague’s Biggest New Year’s Eve Event 2024",
    description:
      "A new concept Prague has been waiting for a long time. Bringing the Afro House community together with special guests from around the world!",
  },
};
