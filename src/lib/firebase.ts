import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBUcmRlSzBveR3-YJLqp_e-LLmHKI4WdSg",
  authDomain: "dovec-914b9.firebaseapp.com",
  projectId: "dovec-914b9",
  storageBucket: "dovec-914b9.appspot.com",
  messagingSenderId: "955066765441",
  appId: "1:955066765441:web:f7fb2a9c72136e6cb9fd80",
  measurementId: "G-ECB8B1RMLQ"
};

console.log('Firebase config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : 'missing',
  appId: firebaseConfig.appId ? '***' : 'missing'
});

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

console.log('Firebase initialized:', {
  appInitialized: !!app,
  dbInitialized: !!db,
  authInitialized: !!auth,
  storageInitialized: !!storage,
  storageBucket: storage.app.options.storageBucket
});

console.log('Firebase Storage bucket:', storage.app.options.storageBucket);

export { app, db, auth, storage }; 