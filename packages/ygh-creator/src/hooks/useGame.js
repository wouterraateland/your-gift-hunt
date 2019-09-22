import { useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import { GAME_BY_ID } from "gql/queries"

import GameContext from "contexts/Game"

export const useGameProvider = variables => {
  const { data, error } = useQuery(GAME_BY_ID, { variables })

  if (error) {
    throw error
  }

  return data.games
    ? data.games.length === 1
      ? {
          gameExists: true,
          game: data.games[0],
          variables
        }
      : {
          gameExists: false,
          variables
        }
    : data.game
    ? {
        gameExists: true,
        game: data.game,
        variables
      }
    : {
        gameExists: false,
        variables
      }
}

const useGame = () => useContext(GameContext)
export default useGame
