import { useCallback, useState } from 'react';
import {
  OAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { app } from '../firebase/client';
import { to } from '../lib/utils';
import type { SocialAuthApp } from '../types/shared.types.ts';

const auth = getAuth(app);

function getSocialAuthProvider(app: SocialAuthApp) {
  if (app === 'google') {
    return new GoogleAuthProvider();
  }

  if (app === 'facebook') {
    return new FacebookAuthProvider();
  }

  if (app === 'apple') {
    return new OAuthProvider('apple.com');
  }

  return null;
}

export function useSignInWithSocial() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignInWithSocial = useCallback(async (app: SocialAuthApp) => {
    const authProvider = getSocialAuthProvider(app);
    if (!authProvider) {
      setIsSigningIn(false);
      return;
    }

    const [providerErr, userCredential] = await to(
      signInWithPopup(auth, authProvider)
    );

    if (providerErr) {
      console.error(providerErr);
      setIsSigningIn(false);
      return;
    }

    // Use getIdToken() to get the access token
    const user = userCredential?.user;
    if (user) {
      const accessToken = await user.getIdToken();
      localStorage.setItem('accessToken', accessToken);
    }

    setIsSigningIn(false);
  }, []);
  
  return [isSigningIn, handleSignInWithSocial];
}
