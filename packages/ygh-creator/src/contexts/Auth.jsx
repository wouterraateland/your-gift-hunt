import React, { createContext } from "react"
import useAuth from "hooks/useAuth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const auth = useAuth("https://create.yourgifthunt.com")
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthContext
