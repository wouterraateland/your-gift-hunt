import { useQuery } from "react-apollo-hooks"
import { GAME_BY_SLUG } from "gql/queries"

const useGameData = variables => {
  const { data, error } = useQuery(GAME_BY_SLUG, { variables })

  if (error) {
    throw error
  }

  return data.games.length === 1 ? data.games[0] : null
}

export default useGameData
