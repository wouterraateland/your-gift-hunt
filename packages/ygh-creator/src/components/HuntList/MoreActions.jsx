import React, { useCallback, useContext } from "react"

import AuthContext from "contexts/Auth"

import { useMutation } from "react-apollo-hooks"
import { USER_GAMES } from "gql/queries"
import { DELETE_GAME } from "gql/mutations"

import Menu from "components/Menu"

const MoreActions = ({ game }) => {
  const { user } = useContext(AuthContext)
  const userId = user.user_metadata.prismaUserId

  const deleteGameMutation = useMutation(DELETE_GAME)
  const deleteGame = useCallback(
    async () => {
      await deleteGameMutation({
        variables: {
          gameId: game.id
        },
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
    [game.id, userId]
  )
  return (
    <Menu.Container>
      <Menu.Toggle />
      <Menu>
        <Menu.Item>Test</Menu.Item>
        <Menu.Item color="error" onClick={deleteGame}>
          Delete
        </Menu.Item>
      </Menu>
    </Menu.Container>
  )
}

export default MoreActions
