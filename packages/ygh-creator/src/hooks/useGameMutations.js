import { useMutation } from "react-apollo-hooks"

import {
  UPDATE_GAME_SETTINGS,
  UPDATE_ENTITY_INSTANCE_NAME,
  UPDATE_ENTITY_INSTANCE_FIELD
} from "gql/mutations"

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

const useGameMutations = save => {
  const useMutationWithSave = useMutationWith(save)

  const updateGameSettings = useMutationWithSave(
    UPDATE_GAME_SETTINGS,
    (gameId, values) => ({
      variables: {
        gameId,
        values
      }
    })
  )

  const updateEntityInstanceName = useMutationWithSave(
    UPDATE_ENTITY_INSTANCE_NAME,
    (instanceId, name) => ({
      variables: {
        instanceId,
        name
      }
    })
  )

  const updateEntityInstanceField = useMutationWithSave(
    UPDATE_ENTITY_INSTANCE_FIELD,
    (entityInstanceFieldId, value) => ({
      variables: {
        entityInstanceFieldId,
        value
      }
    })
  )

  return {
    updateGameSettings,
    updateEntityInstanceName,
    updateEntityInstanceField
  }
}

export default useGameMutations
