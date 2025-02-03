import { useForm, type SubmitHandler } from 'react-hook-form';
import { setPersistence, inMemoryPersistence, getAuth } from 'firebase/auth';
import { to } from '../../lib/utils.ts';
import { sendSignInEmailLink } from '../../api/auth.api.ts';
import { signInEmailStorage } from '../../lib/auth.ts';
import { app } from '../../firebase/client.ts';
import { SocialAuthButton } from '../Buttons/SocialAuthButton.tsx';
import { useSignInWithSocial } from './../../hooks/use-signin-with-social.ts';
import type { SocialAuthApp } from '../../types/shared.types.ts';
import { useState } from 'react';
import { CustomButton } from '../Buttons/CustomButton.tsx';
import PoweredBy from '../PoweredBy.tsx';
import Header from '../Header.tsx';
const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

type SignInFieldValues = {
  email: string;
};

type SignInComponentProps = {
  isOpen: boolean;
  getNextUrl?: () => string;
  onClose: () => void;
  onSignInSuccess: (redirectUrl: string) => void;
};

export function SignInComponent(props: SignInComponentProps) {
  const { isOpen, getNextUrl, onClose, onSignInSuccess } = props;

  const [emailLinkSentTo, setEmailLinkSentTo] = useState<string | null>(null);
  const [ signInWithSocial] = useSignInWithSocial();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignInFieldValues>({
    defaultValues: { email: '' },
  });

  const handleSignInWithSocial = async (app: SocialAuthApp) => {
    if (typeof signInWithSocial === 'function') {
      const [err] = await to(signInWithSocial(app));
  
      if (err) {
        console.error(err);
        return;
      }
  
      // Get nextUrlProp and provide a fallback in case it's undefined
      const nextUrlProp = getNextUrl?.() || `${window.location.pathname}${window.location.search}`;
  
      onSignInSuccess(nextUrlProp);  // This will now always be a string
    } else {
      console.error('signInWithSocial is not a function');
    }
  };
  
  

  const handleSubmitSignInWithEmail: SubmitHandler<SignInFieldValues> = async (
    data,
  ) => {
    alert(data)
    const nextUrlProp = getNextUrl?.();
    const nextUrl = nextUrlProp
      ? nextUrlProp
      : `${window.location.pathname}${window.location.search}`;

    const [err] = await to(
      sendSignInEmailLink({
        email: data.email,
        continueUrl: `${'https://vipass-dev-api.web.app'}/auth/callback/email-link?next=${encodeURIComponent(
          nextUrl,
        )}`,
      }),
    );

    if (err) {
      console.error(err);
      setError('root.send_error', {
        type: 'manual',
        message: 'Failed to send sign in email link. Please try again later.',
      });
      return;
    }

    signInEmailStorage.set(data.email);
    setEmailLinkSentTo(data.email);
  };

  
  const displayEmailLinkSent = emailLinkSentTo !== null;
  const viewMode = displayEmailLinkSent ? 'emailLinkSent' : 'form';

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-full md:w-1/2 mt-6 md:mt-0">
      <div className="relative grid gap-4 rounded-lg bg-background p-4">
        <Header title="Sign In" onBackClick={() => {
          setEmailLinkSentTo(null);
          reset();
          onClose();
        }} />

        {viewMode === 'form' && (
          <>
            <div className="mt-2 flex flex-col gap-3">
              <SocialAuthButton
                app="apple"
                onClick={() => handleSignInWithSocial('apple')}
               
              />
              <SocialAuthButton
                app="google"
                onClick={() => handleSignInWithSocial('google')}
               
              />
            </div>
            <div className="relative mt-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800"></div>
              </div>
              <span className="relative z-10 bg-white dark:bg-black px-3 font-light text-black dark:text-white">
                or
              </span>
            </div>
            <form
              className="mt-2"
              onSubmit={handleSubmit(handleSubmitSignInWithEmail)}
            >
              <div className="mb-4">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border text-black dark:text-white px-4 py-2 border-black dark:border-white"
                  
                />
              </div>
              <CustomButton fullWidth isLoading={isSubmitting} type="submit">
                Sign in with Email
              </CustomButton>
              {errors.root?.send_error && (
                <div className="mt-2 text-sm text-red-600">
                  {errors.root.send_error.message}
                </div>
              )}
            </form>
            <PoweredBy logoSrc="/logo.png" altText="Vipass logo image" />
          </>
        )}

        {viewMode === 'emailLinkSent' && (
          <div className="flex flex-col items-center text-center">
            <img
              src="/logo.png"
              alt="Vipass logo image"
              width={80}
              height={80}
            />
            <h2 className="text-3xl font-normal">Email link sent</h2>
            <div className="mt-6">
              <span>
                We sent an email to{' '}
                <strong className="text-foreground">{emailLinkSentTo}</strong>.
                Click the link in the email to sign in.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
