import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvdiPAzLSy4oAFotjlLdxZ7fR7PDc2dMI",
  authDomain: "pariksha-9668a.firebaseapp.com",
  projectId: "pariksha-9668a",
  storageBucket: "pariksha-9668a.appspot.com",
  messagingSenderId: "197054164325",
  appId: "1:197054164325:web:ea757a416270679f12458c",
  measurementId: "G-FD37LW5N6Q",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
