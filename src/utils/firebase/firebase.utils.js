import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBVs8PAcuhiLGQNv7kc0ayNk2KdJemCoJ0",
    authDomain: "crown-clothing-db-844be.firebaseapp.com",
    projectId: "crown-clothing-db-844be",
    storageBucket: "crown-clothing-db-844be.appspot.com",
    messagingSenderId: "240389786923",
    appId: "1:240389786923:web:f2cd940572f3705712c96e"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
    'select_account'
)

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); //Google + PopUp
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); //Google + Redirect

const db = getFirestore();

//insert documnet to collection
export const addCollectionAndDocuments = async (collcetionKey, objectsToAdd) => {
    //collectionKey is a name of collection like 'users'
    const collectionRef = collection(db, collcetionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        // object.title.toLowerCase() is our key of document
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit()
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items
        return acc;
    }, {})
    return categoryMap;
}


//Create User in Database
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    //If user not existsm create one
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (err) {
            console.log('error creating the user: ', err.message);
        }
    }

    return userDocRef;
}

//Authenticate User with email and password
export const createAuthUserWithEmailAndPassword = (email, password) => {
    if (!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password)
}

export const singInAuthUserWithEmailAndPassword = (email, password) => {
    if (!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password)
}

export const singOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);