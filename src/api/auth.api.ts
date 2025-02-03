import { api } from './client';

type SendSignInEmailLinkParams = {
  email: string;
  continueUrl: string;
};

export const sendSignInEmailLink = async (
  params: SendSignInEmailLinkParams,
) => {
  await api.post('auth/sign-in/email-link', {
    json: params,
  });
};
