import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { ServiceAccount } from 'firebase-admin'; // ✅ Use Firebase's ServiceAccount type

const serviceAccount: ServiceAccount = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string, 
  privateKey: (import.meta.env.VITE_FIREBASE_PRIVATE_KEY as string)?.replace(/\\n/g, '\n'), 
  clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL as string, 
};

const activeApps = getApps();

const initApp = () => {
  if (import.meta.env.PROD) {
    console.info('PROD env detected. Using default service account.');
    return initializeApp();
  }

  console.info('Loading service account from env.');
  return initializeApp({
    credential: cert(serviceAccount), // ✅ Now TypeScript will accept this
  });
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
