import React, { useReducer, createContext } from 'react';

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

    return (
        <AuthContext.Provider
            value={
                {
                    user: state.user,
                    updateUserName
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}

//export
export { AuthContext, AuthProvider }