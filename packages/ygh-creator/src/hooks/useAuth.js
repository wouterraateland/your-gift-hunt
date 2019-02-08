import { useEffect } from "react"
import { useNetlifyIdentity } from "react-netlify-identity"
import { navigate } from "@reach/router"

const useAuth = url => {
  const identity = useNetlifyIdentity(url)

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash.slice(0, 15) === "recovery_token=") {
      // we are in a recovery!
      const token = hash.slice(15)
      identity
        .recoverAccount(token, true)
        .then(() => navigate("/auth/password-reset"))
        .catch(() => navigate("/auth/password-reset"))
    }
  }, [])

  return identity
}

export default useAuth
