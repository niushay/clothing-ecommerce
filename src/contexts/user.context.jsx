import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'
import { createAction } from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
})

const UserReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case (USER_ACTION_TYPES.SET_CURRENT_USER):
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error('Unhandled type ${type} in userReducer');
    }
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        return dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

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