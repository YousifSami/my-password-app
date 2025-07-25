// config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJVqJX46wO2svTrnPw14I8EilR1NOG7qU",
  authDomain: "password-manager-99564.firebaseapp.com",
  projectId: "password-manager-99564",
  storageBucket: "password-manager-99564.firebasestorage.app",
  messagingSenderId: "145827320488",
  appId: "1:145827320488:web:6fbcdf3c8a57ca090ba89d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
