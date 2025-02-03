import type { ComponentPropsWithoutRef } from 'react';
import appleLogo from './../../icons/apple-logo.svg';
import googleLogo from './../../icons/google-logo.svg';


type SocialAuthApp = 'apple' | 'google' ;
import { cn } from '../../lib/utils';

// Map icons to file paths
const socialAuthAppIconsMap: Record<SocialAuthApp, string> = {
  apple: appleLogo,
  google: googleLogo,
};

// Map app names to labels
const socialAuthAppLabelsMap: Record<SocialAuthApp, string> = {
  apple: 'Sign in with Apple',
  google: 'Sign in with Google',
};

// Utility function to get icon and label
function getSocialAuthAppVariant(app: SocialAuthApp) {
  const icon = socialAuthAppIconsMap[app];
  const label = socialAuthAppLabelsMap[app];

  return { icon, label };
}

interface SocialAuthButtonProps extends ComponentPropsWithoutRef<'button'> {
  app: SocialAuthApp;
}

export function SocialAuthButton(props: SocialAuthButtonProps) {
  const { app, ...restProps } = props;

  const { icon, label } = getSocialAuthAppVariant(app);

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-14 font-bold items-center justify-center rounded-3xl border-neutral-800 text-white bg-button-background',
        'disabled:pointer-events-none disabled:opacity-60',
        'md:text-[24px] sm:text-[14px]',
      )}
      {...restProps}
    >
      <img src={icon} alt={`${app}-logo`} className="mr-3 h-6 w-6" />
      {label}
    </button>
  );
}
