// import { useEffect } from "react"
// import { useNetlifyIdentity } from "react-netlify-identity"
// import { navigate } from "@reach/router"
// import { useMutation } from "react-apollo-hooks"
// import { CREATE_USER } from "gql/mutations"
// import _ from "utils"

const useAuth = () => {
  return {
    isLoggedIn: true,
    user: {
      user_metadata: {
        prismaUserId: "cjrw8q9hl0048083350x6rril"
      }
    }
  }
}

// const useAuth = url => {
//   const identity = useNetlifyIdentity(url)
//   const createUser = useMutation(CREATE_USER)
//
//   useEffect(() => {
//     const user = identity.user
//     if (user && user.user_metadata && !user.user_metadata.prismaUserId) {
//       const { full_name } = user.user_metadata
//
//       createUser({
//         variables: {
//           netlifyUserId: user.id,
//           name: full_name,
//           slug: _.toSlug(full_name)
//         }
//       })
//         .then(response =>
//           identity.updateUser({
//             data: {
//               prismaUserId: response.data.createUser.id
//             }
//           })
//         )
//         .catch(e => {
//           console.log(e)
//         })
//     }
//   }, [identity.user])
//
//   useEffect(() => {
//     const hash = window.location.hash.substring(1)
//     if (hash.slice(0, 15) === "recovery_token=") {
//       // we are in a recovery!
//       const token = hash.slice(15)
//       identity
//         .recoverAccount(token, true)
//         .then(() => navigate("/auth/password-reset"))
//         .catch(() => navigate("/auth/password-reset"))
//     }
//   }, [])
//
//   return identity
// }

export default useAuth
