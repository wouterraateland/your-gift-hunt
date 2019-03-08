import { useMutation } from "react-apollo-hooks"
import useEntities from "hooks/useEntities"
import useGameData from "hooks/useGameData"

import { GAME_BY_SLUG } from "gql/queries"
import {
  UPDATE_GAME_SETTINGS,
  UPDATE_ENTITY_INSTANCE_NAME,
  UPDATE_ENTITY_INSTANCE_FIELD,
  CONNECT_ACTION_REQUIREMENT_TO_ENTITY_INSTANCE,
  DISCONNECT_ACTION_REQUIREMENT_FROM_ENTITY_INSTANCE,
  CREATE_HINT,
  UPDATE_HINT,
  DELETE_HINT,
  ADD_UNLOCK_TO_ENTITY_INSTANCE_STATE_TRANSITION,
  REMOVE_UNLOCK_FROM_ENTITY_INSTANCE_STATE_TRANSITION,
  CREATE_ENTITY_INSTANCE_STATE_TRANSITION,
  CREATE_ENTITY_INSTANCES
} from "gql/mutations"

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

const useGameMutations = (variables, save, dependencies) => {
  const { entities, getEntityById, getEntityStateById } = useEntities()
  const useMutationWithSave = useMutationWith(save)
  const game = useGameData(variables)
  const existingEntityIds = game.instances.map(({ entity: { id } }) => id)
  const existingEntityStateIds = game.instances.flatMap(({ states }) =>
    states.map(({ state: { id } }) => id)
  )

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

  const addUnlockToEntityInstanceStateTransition = useMutationWithSave(
    ADD_UNLOCK_TO_ENTITY_INSTANCE_STATE_TRANSITION,
    (entityInstanceStateTransitionId, entityInstanceStateId) => ({
      variables: { entityInstanceStateTransitionId, entityInstanceStateId },
      update: (proxy, { data: { updateEntityInstanceStateTransition } }) => {
        const data = proxy.readQuery(query)

        data.games[0].instances.forEach(instance => {
          instance.states.forEach(state => {
            if (state.id === entityInstanceStateId) {
              const index = state.unlockedBy.findIndex(
                ({ id }) => entityInstanceStateTransitionId === id
              )
              if (index === -1) {
                const { unlocks, ...rest } = updateEntityInstanceStateTransition
                state.unlockedBy.push(rest)
              }
            }
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const removeUnlockFromEntityInstanceStateTransition = useMutationWithSave(
    REMOVE_UNLOCK_FROM_ENTITY_INSTANCE_STATE_TRANSITION,
    (entityInstanceStateTransitionId, entityInstanceStateId) => ({
      variables: { entityInstanceStateTransitionId, entityInstanceStateId },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.games[0].instances.forEach(instance => {
          instance.states.forEach(state => {
            if (state.id === entityInstanceStateId) {
              const index = state.unlockedBy.findIndex(
                ({ id }) => entityInstanceStateTransitionId === id
              )
              if (index !== -1) {
                state.unlockedBy.splice(index, 1)
              }
            }
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const createEntityInstanceStateTransition = useMutationWithSave(
    CREATE_ENTITY_INSTANCE_STATE_TRANSITION,
    (from, to, unlocks) => ({
      variables: { from, to, unlocks },
      update: (proxy, { data: { createEntityInstanceStateTransition } }) => {
        const data = proxy.readQuery(query)

        data.games[0].instances.forEach(instance => {
          instance.states.forEach(state => {
            if (state.id === unlocks) {
              const {
                to,
                unlocks,
                ...rest
              } = createEntityInstanceStateTransition
              state.unlockedBy.push(rest)
            }
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const createEntityInstances = useMutationWithSave(
    CREATE_ENTITY_INSTANCES,
    (gameId, entityInstancesToCreate, entityInstancesToUpdate) => ({
      variables: {
        gameId,
        entityInstancesToCreate,
        entityInstancesToUpdate
      }
    })
  )

  const createNodes = async originEntityStateIds => {
    const entityStateIds = dependencies.getAdjacentEntityStates(
      originEntityStateIds
    )
    // const entityStatesThatShouldExist = entityStateIds.map(getEntityStateById)
    const entitiesThatShouldExist = entities.filter(({ states }) =>
      states.some(({ id }) => entityStateIds.includes(id))
    )

    // TODO: handle entities where isObject or isItem
    // const entityStatesToCreate = entityStatesThatShouldExist.filter(
    //   ({ id }) => !existingEntityStateIds.includes(id)
    // )
    const entitiesToCreate = entitiesThatShouldExist.filter(
      ({ id, isObject, isItem }) =>
        (!isObject && !isItem) || !existingEntityIds.includes(id)
    )

    // console.log(entityStatesToCreate)
    // console.log(entitiesToCreate)
    const entityInstancesToCreate = entitiesToCreate.map(
      ({ id, isObject, isItem, name, states, fields }) => ({
        name:
          isObject || isItem
            ? name
            : `${name} ${game.instances.filter(({ entity }) => entity.id === id)
                .length + 1}`,
        entity: { connect: { id } },
        fields: {
          create: fields.map(field => ({
            field: { connect: { id: field.id } },
            value: ""
          }))
        },
        states: {
          create: states
            .filter(({ id }) => entityStateIds.includes(id))
            .map(({ id }) => ({ state: { connect: { id } } }))
        }
      })
    )

    const entityInstancesToUpdate = []
    // [
    //   {
    //     name: $name
    //     entity: { connect: { id: $entityId } }
    //     states: { create: [{ state: { connect: { id: $entityStateId } } }] }
    //     fields: {
    //       create: [
    //         { field: { connect: { id: $entityFieldId } }, value: "" }
    //       ]
    //     }
    //   }
    // ]

    await createEntityInstances(
      game.id,
      entityInstancesToCreate,
      entityInstancesToUpdate
    )
  }

  const createEntityInstance = async entityId => {
    const entity = getEntityById(entityId)
    const entityStates = dependencies.getMinimalStateSpan(entity.states)

    await createNodes(entityStates.map(({ id }) => id))
  }

  return {
    updateGameSettings,
    updateEntityInstanceName,
    updateEntityInstanceField,

    // Hint mutations
    connectActionRequirementToEntityInstance,
    disconnectActionRequirementFromEntityInstance,
    createHint,
    updateHint,
    deleteHint,

    // Unlock mutations
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition,
    createEntityInstanceStateTransition,

    // Creation and deletion mutations
    createEntityInstance
  }
}

export default useGameMutations
