import { useYGHPlayerContext } from "ygh-player/react-hook"

const useAuth = () => {
  const { user, loginUser, registerUser, logoutUser } = useYGHPlayerContext()

  return {
    user,
    isLoggedIn: !!user,
    loginUser,
    registerUser,
    logoutUser
  }
}

export default useAuth
