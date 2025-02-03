import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react'; // Use StoryFn instead of Story
import { SignInComponent } from './../components/TicketSection/SignIn';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/SignInComponent',
  component: SignInComponent,
  argTypes: {
    onClose: { action: 'onClose' },
    onSignInSuccess: { action: 'onSignInSuccess' },
    getNextUrl: {
      control: 'text',
      description: 'URL to redirect after successful sign-in',
      defaultValue: '/home',
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);  // Close the modal
  const handleSignInSuccess = (redirectUrl: string) => {
    action('onSignInSuccess')(redirectUrl);
    setIsOpen(false);  // Close the modal after successful sign-in
  };

  return (
    <div>
      {isOpen && (
        <SignInComponent
          {...args}
          isOpen={isOpen}
          onClose={handleClose}
          onSignInSuccess={handleSignInSuccess}
        />
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  getNextUrl: () => '/next-page',  // Customize this as needed
};
