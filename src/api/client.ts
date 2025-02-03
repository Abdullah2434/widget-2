import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_PREFIX_URL,
  credentials: import.meta.env.VITE_API_CREDENTIALS,
});
