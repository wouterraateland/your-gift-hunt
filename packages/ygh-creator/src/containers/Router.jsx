import React, { useContext } from 'react'
import { Router, Redirect } from '@reach/router'

import AuthContext from 'contexts/Auth'

import Action from 'pages/auth/action'
import Login from 'pages/auth/login'
import Signup from 'pages/auth/signup'
import Amnesia from 'pages/auth/amnesia'

import Overview from 'pages/overview'
import Creator from 'pages/creator'
import Profile from 'pages/profile'

import NotFound from 'pages/404'

const MainRouter = () => {
  const { authenticated } = useContext(AuthContext)

  return authenticated
    ? (
      <Router>
        <Overview path="/" />
        <Profile path="/profile" />
        <Creator path="/new" />
        <Creator path="/edit/:slug" />
        <NotFound default />
      </Router>
    )
    : (
      <Router>
        <Action path="/auth/action" />
        <Login path="/auth/login" />
        <Signup path="/auth/signup" />
        <Amnesia path="/auth/amnesia" />
        <Redirect from="/" to="/auth/login" default noThrow />
      </Router>
    )
}

export default MainRouter
