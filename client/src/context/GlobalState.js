import React, { createContext, useReducer } from 'react'
import userReducer from './reducers/userReducer'

// Initial State
const initialState = null


// Creating Context
export const userContext = createContext(initialState)

// Provider Component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <userContext.Provider value={{ state, dispatch }}>
            {children}
        </userContext.Provider>
    )
}