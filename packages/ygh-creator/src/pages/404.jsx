import React from "react"
import { Redirect } from "@reach/router"

import useAuth from "hooks/useAuth"

const NotFoundPage = () => {
  const { user } = useAuth()
  return <Redirect default to={`/${user.username}/games`} noThrow />
}

export default NotFoundPage
