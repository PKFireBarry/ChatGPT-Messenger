import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg-DR7pa6zC6Qd3OXp7gj2twSPOVo7Io4",
  authDomain: "chat-gpt-clone-9c17f.firebaseapp.com",
  projectId: "chat-gpt-clone-9c17f",
  storageBucket: "chat-gpt-clone-9c17f.appspot.com",
  messagingSenderId: "695778521511",
  appId: "1:695778521511:web:05eccc52bdb8d489190682"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


