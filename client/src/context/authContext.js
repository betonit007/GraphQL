import React, { useReducer, createContext } from 'react';
import { auth } from '../firebase/firebase.utils'

//reducer 
const firebaseReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            console.log(action.payload)
            return { ...state, user: action.payload }

        default:
            return state
    }
}

// create context
const AuthContext = createContext()

//context provider
const AuthProvider = ({ children }) => { //takes children component and return it with the authContext

    //state
    const initalState = {
        user: null,
    }

    //useReducer takes two args; the reducer itself and the initial state, returns state and dispatch function. 
    const [state, dispatch] = useReducer(firebaseReducer, initalState)


    //functions
    const updateUserName = () => {
        dispatch({
            type: "LOGGED_IN_USER",
            payload: "Tim"
        })
    }

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

    return (
        <AuthContext.Provider
            value={
                {
                    user: state.user,
                    updateUserName,
                    completeUserRegistration
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}

//export
export { AuthContext, AuthProvider }