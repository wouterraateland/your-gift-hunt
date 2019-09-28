import { useEffect } from "react"
import { useYGHPlayerContext } from "ygh-sdk"

import { useApolloClient } from "react-apollo-hooks"

import { GAME_BY_ID, GAMES_WITHOUT_CREATOR } from "gql/queries"
import { UPDATE_GAME_CREATOR } from "gql/mutations"

const useAuth = () => {
  const client = useApolloClient()

  const {
    user,
    loginUser,
    registerUser,
    logoutUser,
    resetPassword,
    requestPasswordReset,
    isResetTokenValid
  } = useYGHPlayerContext()

  useEffect(() => {
    const claimCreatorlessGames = async () => {
      if (!!user) {
        const myGameIds =
          JSON.parse(window.localStorage.getItem("ygh-creator.my-games")) || []

        const {
          data: { games }
        } = await client.query({
          query: GAMES_WITHOUT_CREATOR,
          variables: { gameIds: myGameIds }
        })

        await Promise.all(
          games.map(({ id }) =>
            client.mutate({
              mutation: UPDATE_GAME_CREATOR,
              variables: { gameId: id, userId: user.id },
              refetchQueries: [
                {
                  query: GAME_BY_ID,
                  variables: { gameId: id }
                }
              ]
            })
          )
        )

        window.localStorage.setItem("ygh-creator.my-games", JSON.stringify([]))
      }
    }

    claimCreatorlessGames()
  }, [!!user])

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
