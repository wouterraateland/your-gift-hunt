import React from 'react'
import { navigate } from 'gatsby'
import auth from 'utils/auth'
import { UserProvider } from 'contexts/User'

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (typeof window === 'undefined') {
    return null
  }
  
  const user = auth.currentUser()

  if (!user) {
    navigate(`/auth/login`)
    return null
  }

  return (
    <UserProvider user={user}>
      <Component {...rest} />
    </UserProvider>
  )
}

export default PrivateRoute
