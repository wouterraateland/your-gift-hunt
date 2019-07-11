import { useYGHPlayerContext } from "ygh-sdk"

const useAuth = () => {
  const {
    user,
    loginUser,
    registerUser,
    logoutUser,
    resetPassword,
    requestPasswordReset,
    isResetTokenValid
  } = useYGHPlayerContext()

  return {
    user,
    isLoggedIn: !!user,
    loginUser,
    registerUser,
    logoutUser,
    resetPassword,
    requestPasswordReset,
    isResetTokenValid
  }
}

export default useAuth
