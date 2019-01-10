import React, { useState } from 'react'
import { withFirebase } from 'react-redux-firebase'

import { AuthProvider } from 'contexts/Auth'

const Auth = ({ firebase, children }) => {
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser)

  async function reloadAuth() {
    await firebase.reloadAuth()
    setCurrentUser(firebase.auth().currentUser)
  }

  return (
    <AuthProvider auth={{
      reloadAuth,
      authenticated: currentUser !== null,
      userRef: currentUser
        ? firebase.firestore().collection('users').doc(currentUser.uid)
        : null,
      currentUser
    }}>
      {children}
    </AuthProvider>
  )
}

export default withFirebase(Auth)
