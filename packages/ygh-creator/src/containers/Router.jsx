import React, { useContext } from "react"
import { Router, Redirect } from "@reach/router"

import AuthContext from "contexts/Auth"

import PasswordReset from "pages/auth/password-reset"
import Login from "pages/auth/login"
import Signup from "pages/auth/signup"
import Amnesia from "pages/auth/amnesia"

import Overview from "pages/overview"
import Creator from "pages/creator"
import Profile from "pages/profile"

import NotFound from "pages/404"

const MainRouter = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? (
    <Router>
      <Overview path="/" />
      <Profile path="/profile" />
      <Creator path="/new" />
      <Creator path="/edit/:slug" />
      <NotFound default />
    </Router>
  ) : (
    <Router>
      <Login path="/auth/login" />
      <Signup path="/auth/signup" />
      <Amnesia path="/auth/amnesia" />
      <PasswordReset path="/auth/reset-password" />
      <Redirect from="/" to="/auth/login" default noThrow />
    </Router>
  )
}

export default MainRouter
