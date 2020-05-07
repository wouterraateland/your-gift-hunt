import { useEffect } from "react"
import { useYGHPlayerContext } from "ygh-sdk"

const AuthCheck = () => {
  const { listGames, logoutUser } = useYGHPlayerContext()

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        await listGames()
      } catch (error) {
        if (error && error.message === "Unauthorized: JWT token invalid") {
          logoutUser()
        }
      }
    }
    checkAuthToken()
  }, [listGames, logoutUser])

  return null
}

export default AuthCheck
