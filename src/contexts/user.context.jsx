import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        })
    }, [])
    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}