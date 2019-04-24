import { useCallback } from "react"
import useAuth from "hooks/useAuth"
import { useQuery, useMutation } from "react-apollo-hooks"
import { TEST_SERVICE, USER_GAMES } from "gql/queries"
import { CREATE_GAME_PLAY, DELETE_GAME } from "gql/mutations"

const useMetaActions = game => {
  const { user } = useAuth()
  const gameId = game.id
  const userId = user.user_metadata.prismaUserId

  const { loading, data } = useQuery(TEST_SERVICE)
  const deleteGameMutation = useMutation(DELETE_GAME)
  const createGamePlayMutation = useMutation(CREATE_GAME_PLAY)

  const deleteGame = useCallback(
    async () => {
      await deleteGameMutation({
        variables: { gameId },
        update: (
          proxy,
          {
            data: {
              deleteGame: { id }
            }
          }
        ) => {
          const query = {
            query: USER_GAMES,
            variables: {
              userId,
              slugPrefix: ""
            }
          }

          const { user } = proxy.readQuery(query)
          const gameIndex = user.games.findIndex(game => game.id === id)
          if (gameIndex !== -1) {
            user.games.splice(gameIndex, 1)
          }

          proxy.writeQuery({
            ...query,
            data: {
              user
            }
          })
        }
      })
    },
    [gameId, userId]
  )

  const testGame = useCallback(
    async () => {
      if (loading) {
        return
      }

      const response = await createGamePlayMutation({
        variables: {
          gameId,
          userId,
          serviceId: data.service.id
        }
      })

      const playToken = response.data.createGamePlay.id

      window.open(
        `https://play.yourgifthunt.com/${game.creator.slug}/${
          game.slug
        }?playToken=${playToken}`,
        "_blank"
      )
    },
    [gameId, userId, loading, data]
  )

  return {
    deleteGame,
    testGame
  }
}

export default useMetaActions
