import React, { createContext } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ user, ...rest }) => {
  return (
    <UserContext.Provider
      value={user}
      {...rest}
    />
  )
}

export default UserContext
