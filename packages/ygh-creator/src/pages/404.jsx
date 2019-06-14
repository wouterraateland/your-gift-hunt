import { navigate } from "@reach/router"

import useAuth from "hooks/useAuth"

const NotFoundPage = () => {
  const { user } = useAuth()
  navigate(`/${user.username}/games`)
  return null
}

export default NotFoundPage
