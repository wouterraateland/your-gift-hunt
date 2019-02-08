import React, { createContext } from "react"
import { useNetlifyIdentity } from "react-netlify-identity"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const identity = useNetlifyIdentity("https://create.yourgifthunt.com")
  return (
    <AuthContext.Provider value={identity}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
