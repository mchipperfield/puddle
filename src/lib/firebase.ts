import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { 
    PUBLIC_APIKEY,
    PUBLIC_AUTHDOMAIN,
    PUBLIC_PROJECTID,
    PUBLIC_STORAGEBUCKET,
    PUBLIC_MESSAGINGSENDERID,
    PUBLIC_APPID
 } from '$env/static/public';

const firebaseConfig = {
  apiKey: PUBLIC_APIKEY,
  authDomain: PUBLIC_AUTHDOMAIN,
  projectId: PUBLIC_PROJECTID,
  storageBucket: PUBLIC_STORAGEBUCKET,
  messagingSenderId: PUBLIC_MESSAGINGSENDERID,
  appId: PUBLIC_APPID
};

// Initialize Firebase
let app;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
}

export const auth = getAuth(app);
export const storage = getStorage(app);