import { useMutation } from "react-apollo-hooks"

import { GAME_BY_SLUG } from "gql/queries"
import {
  UPDATE_GAME_SETTINGS,
  UPDATE_ENTITY_INSTANCE_NAME,
  UPDATE_ENTITY_INSTANCE_FIELD,
  CONNECT_ACTION_REQUIREMENT_TO_ENTITY_INSTANCE,
  DISCONNECT_ACTION_REQUIREMENT_FROM_ENTITY_INSTANCE,
  CREATE_HINT,
  UPDATE_HINT,
  DELETE_HINT
} from "gql/mutations"

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

const useGameMutations = (variables, save) => {
  const useMutationWithSave = useMutationWith(save)
  const query = { query: GAME_BY_SLUG, variables }

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

  const connectActionRequirementToEntityInstance = useMutationWithSave(
    CONNECT_ACTION_REQUIREMENT_TO_ENTITY_INSTANCE,
    (entityInstanceId, actionRequirementId) => ({
      variables: {
        entityInstanceId,
        actionRequirementId
      }
    })
  )

  const disconnectActionRequirementFromEntityInstance = useMutationWithSave(
    DISCONNECT_ACTION_REQUIREMENT_FROM_ENTITY_INSTANCE,
    (entityInstanceId, actionRequirementId) => ({
      variables: {
        entityInstanceId,
        actionRequirementId
      }
    })
  )

  const createHint = useMutationWithSave(
    CREATE_HINT,
    (entityInstanceId, actionRequirementId, { text, delay }) => ({
      variables: {
        entityInstanceId,
        actionRequirementId,
        text,
        delay
      },
      update: (proxy, { data: { createHint } }) => {
        const data = proxy.readQuery(query)
        const instance = data.games[0].instances.find(
          instance => instance.id === createHint.entityInstance.id
        )

        instance.hints.push(createHint)

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const updateHint = useMutationWithSave(
    UPDATE_HINT,
    (hintId, { text, delay }) => ({
      variables: {
        hintId,
        text,
        delay
      }
    })
  )

  const deleteHint = useMutationWithSave(DELETE_HINT, hintId => ({
    variables: {
      hintId
    },
    update: (
      proxy,
      {
        data: {
          deleteHint: { id }
        }
      }
    ) => {
      const data = proxy.readQuery(query)

      data.games[0].instances.forEach(instance => {
        const i = instance.hints.findIndex(hint => hint.id === id)
        if (i !== -1) {
          instance.hints.splice(i, 1)
        }
      })

      proxy.writeQuery({ ...query, data })
    }
  }))

  return {
    updateGameSettings,
    updateEntityInstanceName,
    updateEntityInstanceField,

    // Hint related actions
    connectActionRequirementToEntityInstance,
    disconnectActionRequirementFromEntityInstance,
    createHint,
    updateHint,
    deleteHint
  }
}

export default useGameMutations
