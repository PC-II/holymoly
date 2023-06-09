import { initializeApp } from "firebase/app";
export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
export const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";
export const auth = getAuth(app);

import { getDatabase } from "firebase/database";
export const db = getDatabase(app);

import { getStorage } from "firebase/storage";
export const storage = getStorage(app)