import React, { useReducer, createContext, useEffect } from 'react';
import { auth } from '../firebase/firebase.utils'

//reducer 
const firebaseReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return { ...state, user: action.payload }

        default:
            return state
    }
}

// create context
const AuthContext = createContext()

//context provider
const AuthProvider = ({ children }) => { //takes children component and return it with the authContext

    //listen / check for current user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const idTokenResult = await auth.currentUser.getIdTokenResult()

                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: { email: user.email, token: idTokenResult.token }
                })
            } else {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: null
                })
            }
        })
        //clean up
        return () => unsubscribe()
    }, [])

    //state
    const initalState = {
        user: null,
    }

    //useReducer takes two args; the reducer itself and the initial state, returns state and dispatch function. 
    const [state, dispatch] = useReducer(firebaseReducer, initalState)


    //functions
    const completeUserRegistration = async (password) => {
        localStorage.removeItem("emailFormRegistration")
        await auth.currentUser.updatePassword(password)
        const idTokenResult = await auth.currentUser.getIdTokenResult()

        const userInfo = {
            email: auth.currentUser.email,
            token: idTokenResult.token
        }

        dispatch({
            type: 'LOGGED_IN_USER',
            payload: userInfo
        })
        //make api request to save/update user in mongodb

    }

    const logout = () => {
        auth.signOut();
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: null
        })
    }

    const login = (user, token) => {
        dispatch({ 
            type: 'LOGGED_IN_USER',
            payload: {user, token}
        })
    }

    return (
        <AuthContext.Provider
            value={
                {
                    user: state.user,
                    completeUserRegistration,
                    logout,
                    login
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}

//export
export { AuthContext, AuthProvider }