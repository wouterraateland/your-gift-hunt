import { navigate } from "@reach/router"

import useUser from "hooks/useUser"

const NotFoundPage = () => {
  const { user } = useUser()
  navigate(`/${user.slug}/games`)
  return null
}

export default NotFoundPage
