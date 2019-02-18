import React, { useContext } from "react"
import { Router, Redirect } from "@reach/router"

import AuthContext from "contexts/Auth"

import PasswordReset from "pages/auth/password-reset"
import Login from "pages/auth/login"
import Signup from "pages/auth/signup"
import Amnesia from "pages/auth/amnesia"

import Overview from "pages/overview"
import NewGame from "pages/new-game"
import Creator from "pages/creator"
import Profile from "pages/profile"

import NotFound from "pages/404"

const MainRouter = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? (
    <Router>
      <Redirect from="/auth/login" to="/" noThrow />
      <PasswordReset path="/auth/password-reset" />

      <Overview path="/" />
      <Profile path="/profile" />
      <NewGame path="/new" />
      <Creator path="/:creatorSlug/:gameSlug/*" />
      <NotFound default />
    </Router>
  ) : (
    <Router>
      <Login path="/auth/login" />
      <Signup path="/auth/signup" />
      <Amnesia path="/auth/amnesia" />
      <PasswordReset path="/auth/password-reset" />
      <Login path="/" default />
    </Router>
  )
}

export default MainRouter
