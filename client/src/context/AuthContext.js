import { createContext, useReducer, useEffect } from 'react'
import Loading from '../pages/Loading'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        case 'STOP_LOADING':
            return { ...state, isLoading: false }
        case 'SET_USER_DATA':
            return { ...state, userData: action.payload }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoading: true,
        userData: null,
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }

        dispatch({ type: 'STOP_LOADING' })

    }, [])


    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{
            ...state, dispatch
        }}>
            {state.isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    )

}