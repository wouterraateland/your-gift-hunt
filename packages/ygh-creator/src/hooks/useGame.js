import { useContext } from "react"
import { useQuery } from "react-apollo-hooks"
import { GAME_BY_SLUG } from "gql/queries"

import GameContext from "contexts/Game"

export const useGameProvider = variables => {
  const { data, error } = useQuery(GAME_BY_SLUG, { variables })

  if (error) {
    throw error
  }

  return data.games.length === 1
    ? {
        gameExists: true,
        game: data.games[0],
        variables
      }
    : {
        gameExists: false,
        variables
      }
}

const useGame = () => useContext(GameContext)
export default useGame
