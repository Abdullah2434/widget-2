import { buildLocalStorageService } from './utils.ts';

const LS_SIGN_IN_EMAIL_KEY = 'auth_sign_in_email';

export const signInEmailStorage =
  buildLocalStorageService(LS_SIGN_IN_EMAIL_KEY);
