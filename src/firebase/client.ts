import { initializeApp, type FirebaseOptions } from 'firebase/app';


const config: FirebaseOptions = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

export const app = initializeApp(config);
