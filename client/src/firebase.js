import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "my-portfolio-47ef1.firebaseapp.com",
  projectId: "my-portfolio-47ef1",
  storageBucket: "my-portfolio-47ef1.appspot.com",
  messagingSenderId: "76579972",
  appId: "1:76579972:web:27195a417e0b0765436ed1",
  measurementId: "G-S0N54GQPJX",
};

export const app = initializeApp(firebaseConfig);
