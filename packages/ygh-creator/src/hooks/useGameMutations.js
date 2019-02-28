import { useMutation } from "react-apollo-hooks"

import { UPDATE_GAME, UPDATE_INSTANCE_NAME } from "gql/mutations"

const useGameMutations = save => {
  const updateGameSettingsMutation = useMutation(UPDATE_GAME)
  const updateInstanceNameMutation = useMutation(UPDATE_INSTANCE_NAME)

  const updateGameSettings = save((gameId, values) =>
    updateGameSettingsMutation({
      variables: {
        gameId,
        values
      }
    })
  )

  const updateInstanceName = save((instanceId, name) =>
    updateInstanceNameMutation({
      variables: {
        instanceId,
        name
      }
    })
  )

  return {
    updateGameSettings,
    updateInstanceName
  }
}

export default useGameMutations
