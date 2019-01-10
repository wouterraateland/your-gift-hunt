import React, { createContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ auth, ...rest }) => {
  return (
    <AuthContext.Provider
      value={auth}
      {...rest}
    />
  )
}

export default AuthContext
