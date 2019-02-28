import { useMutation } from "react-apollo-hooks"

import { UPDATE_GAME } from "gql/mutations"

const useGameMutations = save => {
  const gameSettingsMutation = useMutation(UPDATE_GAME)

  const updateGameSettings = save((gameId, values) =>
    gameSettingsMutation({
      variables: {
        gameId,
        values
      }
    })
  )

  return {
    updateGameSettings
  }
}

export default useGameMutations
