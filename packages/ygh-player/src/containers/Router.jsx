import React from "react"
import { Router } from "@reach/router"

import PasswordReset from "pages/auth/password-reset"
import Login from "pages/auth/login"
import Signup from "pages/auth/signup"
import Amnesia from "pages/auth/amnesia"

import IndexPage from "pages/index"
import GamePage from "pages/game"
import GamePlayPage from "pages/play"
import NotFoundPage from "pages/404"

const MainRouter = () => (
  <Router>
    <Login path="/auth/login" />
    <Signup path="/auth/signup" />
    <Amnesia path="/auth/amnesia" />
    <PasswordReset path="/auth/password-reset" />

    <IndexPage path="/" />
    <GamePlayPage path="/play/:creatorSlug/:gameSlug" />
    <GamePage path="/:creatorSlug/:gameSlug" />
    <NotFoundPage default />
  </Router>
)

export default MainRouter