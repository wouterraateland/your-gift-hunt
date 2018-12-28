import React from 'react'
import { withFirebase } from 'react-redux-firebase'

const Nav = ({ firebase }) => {
  return (
    <nav>
      <button onClick={() => firebase.logout()} />
    </nav>
  )
}

export default withFirebase(Nav)
