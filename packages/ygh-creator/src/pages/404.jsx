import React from "react"
import { Redirect } from "@reach/router"

const NotFoundPage = () => {
  return <Redirect default to={`/my-games`} noThrow />
}

export default NotFoundPage
