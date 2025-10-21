import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase Configuration - Your actual Firebase project values
const firebaseConfig = {
  apiKey: "AIzaSyB65Z5X26aXVVZe7bkjHN0PDHc72pGjYGw",
  authDomain: "carbon-buddy-b589f.firebaseapp.com",
  projectId: "carbon-buddy-b589f",
  storageBucket: "carbon-buddy-b589f.firebasestorage.app",
  messagingSenderId: "1034550200083",
  appId: "1:1034550200083:web:eb00ffaacc665807413ce6"
};

// Check if configuration values are still placeholders
const isPlaceholder = (value) => value.includes('your-') || value.includes('123456789');

const placeholderVars = Object.entries(firebaseConfig)
  .filter(([key, value]) => isPlaceholder(value))
  .map(([key]) => key);

if (placeholderVars.length > 0) {
  console.warn('⚠️ Firebase configuration contains placeholder values:', placeholderVars);
  console.warn('📝 Please replace the placeholder values with your actual Firebase configuration.');
  console.warn('🔗 Get your config from: https://console.firebase.google.com -> Project Settings -> Your apps');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
