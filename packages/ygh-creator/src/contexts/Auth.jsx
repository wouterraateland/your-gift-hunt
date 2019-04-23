import React, { createContext } from "react"
import { useAuthProvider } from "hooks/useAuth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const value = useAuthProvider("https://create.yourgifthunt.com")
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
