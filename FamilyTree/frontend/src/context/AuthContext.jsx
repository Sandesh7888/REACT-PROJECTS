import React, { createContext, useState, useEffect } from 'react'


export const AuthContext = createContext()


export function AuthProvider({ children }){
const [user, setUser] = useState(() => {
try { return JSON.parse(localStorage.getItem('vanshval_user')) } catch { return null }
})


useEffect(() => {
localStorage.setItem('vanshval_user', JSON.stringify(user))
}, [user])


const login = (userData) => setUser(userData)
const logout = () => setUser(null)


return (
<AuthContext.Provider value={{user, login, logout}}>
{children}
</AuthContext.Provider>
)
}