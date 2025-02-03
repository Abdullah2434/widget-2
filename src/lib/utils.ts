import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function to<T, E = Error>(promise: Promise<T>) {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[E, undefined]>((err) => [err, undefined]);
}

export function buildLocalStorageService(lsKey: string) {
  return {
    set: (value: string) => {
      window.localStorage.setItem(lsKey, value);
    },
    get: () => {
      return window.localStorage.getItem(lsKey);
    },
    clear: () => {
      window.localStorage.removeItem(lsKey);
    },
  };
}
