import React, { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'

import { Router, Redirect } from '@reach/router'

import Action from 'pages/auth/action'
import Login from 'pages/auth/login'
import Signup from 'pages/auth/signup'
import Amnesia from 'pages/auth/amnesia'

import Overview from 'pages/overview'
import Creator from 'pages/creator'

import NotFound from 'pages/404'

const MainRouter = ({ firebase }) => {
  const { storeState } = useContext(ReactReduxContext)
  const { auth } = storeState.firebase

  return (
    <Router>
      <Action path="/auth/action" />
      <Login path="/auth/login" />
      <Signup path="/auth/signup" />
      <Amnesia path="/auth/amnesia" />
      {auth.isEmpty && <Redirect from="/" to="/auth/login" noThrow />}
      {!auth.isEmpty && <Overview path="/" />}
      {!auth.isEmpty && <Creator path="/:userName/:projectName" />}
      <NotFound default />
    </Router>
  )
}

export default withFirebase(MainRouter)
