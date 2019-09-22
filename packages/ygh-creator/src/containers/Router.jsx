import React from "react"
import { Router } from "@reach/router"

import useAuth from "hooks/useAuth"

import PasswordReset from "pages/auth/password-reset"
import Login from "pages/auth/login"
import Signup from "pages/auth/signup"
import Amnesia from "pages/auth/amnesia"

import Profile from "pages/profile"

import GamesOverview from "pages/games-overview"
import GameCreator from "pages/game-creator"

import TemplateSetsOverview from "pages/template-sets-overview"
import TemplateSetCreator from "pages/template-set-creator"

import NotFound from "pages/404"

const MainRouter = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? (
    <Router>
      <Login path="/auth/login" />
      <Signup path="/auth/signup" />
      <Amnesia path="/auth/amnesia" />
      <PasswordReset path="/auth/password-reset" />
      <Profile path="/profile" />

      <GamesOverview path="/my-games" />
      <GameCreator path="/edit/:gameId/*" />

      <TemplateSetsOverview path="/my-template-sets" />
      <TemplateSetCreator path="/edit-template-set/:templateSetId/*" />

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
