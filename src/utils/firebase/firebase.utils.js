import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBVs8PAcuhiLGQNv7kc0ayNk2KdJemCoJ0",
    authDomain: "crown-clothing-db-844be.firebaseapp.com",
    projectId: "crown-clothing-db-844be",
    storageBucket: "crown-clothing-db-844be.appspot.com",
    messagingSenderId: "240389786923",
    appId: "1:240389786923:web:f2cd940572f3705712c96e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters(
    'select_account'
)

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); //Google + PopUp