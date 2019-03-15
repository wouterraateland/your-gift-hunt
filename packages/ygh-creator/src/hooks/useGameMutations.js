import { useMutation, useApolloClient } from "react-apollo-hooks"
import useEntities from "hooks/useEntities"
import useGameData from "hooks/useGameData"

import { GAME_BY_SLUG, ENTITY_INSTANCE_STATE_TRANSITIONS } from "gql/queries"
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
  CREATE_ENTITY_INSTANCE_STATE_TRANSITIONS,
  CREATE_ENTITY_INSTANCES,
  DELETE_NODES,
  CONNECT_INFORMATION_WITH_FIELD_VALUE,
  DISCONNECT_INFORMATION_FROM_FIELD_VALUE
} from "gql/mutations"

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

const useGameMutations = (variables, save, dependencies) => {
  const { entities, getEntityById, getEntityStateById } = useEntities()
  const useMutationWithSave = useMutationWith(save)
  const game = useGameData(variables)
  const client = useApolloClient()

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

  const updateFieldValue = useMutationWithSave(
    UPDATE_ENTITY_INSTANCE_FIELD,
    (FieldValueId, value) => ({
      variables: {
        FieldValueId,
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

  const addUnlockToEntityInstanceStateTransitionMutation = useMutationWithSave(
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

  const addUnlockToEntityInstanceStateTransition = async (from, to, unlock) => {
    const {
      data: { entityInstanceStateTransitions }
    } = await client.query({
      query: ENTITY_INSTANCE_STATE_TRANSITIONS,
      variables: { from, to }
    })

    const unlocks = entityInstanceStateTransitions[0].unlocks

    if (!unlocks.some(({ id }) => unlock === id)) {
      await addUnlockToEntityInstanceStateTransitionMutation(
        entityInstanceStateTransitions[0].id,
        unlock
      )
    }
  }

  const removeUnlockFromEntityInstanceStateTransitionMutation = useMutationWithSave(
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

  const removeUnlockFromEntityInstanceStateTransition = async (
    from,
    to,
    unlock
  ) => {
    const {
      data: { entityInstanceStateTransitions }
    } = await client.query({
      query: ENTITY_INSTANCE_STATE_TRANSITIONS,
      variables: { from, to }
    })

    const unlocks = entityInstanceStateTransitions[0].unlocks

    if (unlocks.some(({ id }) => unlock === id)) {
      await removeUnlockFromEntityInstanceStateTransitionMutation(
        entityInstanceStateTransitions[0].id,
        unlock
      )
    }
  }

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

  const createEntityInstanceStateTransitions = useMutationWithSave(
    CREATE_ENTITY_INSTANCE_STATE_TRANSITIONS,
    (gameId, entityInstanceUpdates) => ({
      variables: {
        gameId,
        entityInstanceUpdates
      }
    })
  )

  const ensureEntityInstanceTransitions = async gameId => {
    const { data } = await client.query(query)

    const instances = data.games[0].instances
    const instanceStates = instances.flatMap(({ states }) => states)

    const entityInstanceUpdates = instances
      .map(instance => ({
        where: { id: instance.id },
        data: {
          states: {
            update: instance.states
              .map(state => ({
                where: { id: state.id },
                data: {
                  outgoingTransitions: {
                    create: getEntityStateById(state.state.id)
                      .outgoingTransitions.filter(
                        entityStateTransition =>
                          !state.outgoingTransitions.some(instanceTransition =>
                            instanceTransition.to === null
                              ? entityStateTransition.to === null
                              : entityStateTransition.to &&
                                entityStateTransition.to.id ===
                                  instanceStates.find(
                                    instanceState =>
                                      instanceState.id ===
                                      instanceTransition.to.id
                                  ).state.id
                          )
                      )
                      .map(entityStateTransition => ({
                        to: entityStateTransition.to
                          ? {
                              connect: {
                                id: instance.states.find(
                                  toState =>
                                    toState.state.id ===
                                    entityStateTransition.to.id
                                ).id
                              }
                            }
                          : null
                      }))
                  }
                }
              }))
              .filter(
                update => update.data.outgoingTransitions.create.length > 0
              )
          }
        }
      }))
      .filter(update => update.data.states.update.length > 0)

    await createEntityInstanceStateTransitions(gameId, entityInstanceUpdates)
  }

  const createNodes = async (
    entityStateIdsToCreate,
    originEntityInstanceStateId
  ) => {
    const originInstance = originEntityInstanceStateId
      ? game.instances.find(({ states }) =>
          states.some(({ id }) => originEntityInstanceStateId === id)
        )
      : null
    const originEntityId = originInstance ? originInstance.entity.id : null

    const entityStateIds = dependencies.getAdjacentEntityStates(
      entityStateIdsToCreate
    )
    const existingEntityIds = game.instances.map(({ entity: { id } }) => id)
    const entitiesThatShouldExist = entities.filter(({ states }) =>
      states.some(({ id }) => entityStateIds.includes(id))
    )

    const entitiesToCreate = entitiesThatShouldExist.filter(
      ({ id, isObject, isItem }) =>
        id !== originEntityId &&
        (!(isObject || isItem) || !existingEntityIds.includes(id))
    )
    const entityInstancesToCreate = entitiesToCreate.map(
      ({ id, name, states, fields, informationSlots }) => {
        const existingEntityInstances = game.instances.filter(
          ({ entity }) => entity.id === id
        )
        return {
          name: existingEntityInstances.length
            ? `${name} ${existingEntityInstances.length + 1}`
            : name,
          entity: { connect: { id } },
          fieldValues: {
            create: fields.map(field => ({
              field: { connect: { id: field.id } },
              value: ""
            }))
          },
          states: {
            create: states
              .filter(({ id }) => entityStateIds.includes(id))
              .map(({ id }) => ({ state: { connect: { id } } }))
          },
          information: {
            create: informationSlots.map(({ id }) => ({
              slot: { connect: { id } }
            }))
          }
        }
      }
    )

    const entityInstancesToUpdate = originInstance
      ? [
          {
            where: { id: originInstance.id },
            data: {
              states: {
                create: getEntityById(originEntityId)
                  .states.filter(
                    ({ id }) =>
                      entityStateIds.includes(id) &&
                      !originInstance.states.some(
                        entityInstanceState =>
                          entityInstanceState.state.id === id
                      )
                  )
                  .map(({ id }) => ({
                    state: { connect: { id } }
                  }))
              }
            }
          }
        ]
      : []

    await createEntityInstances(
      game.id,
      entityInstancesToCreate,
      entityInstancesToUpdate
    )

    await ensureEntityInstanceTransitions(game.id)
  }

  const createEntityInstance = async entityId => {
    const entity = getEntityById(entityId)
    const entityStates = dependencies.getMinimalStateSpan(entity.states)

    if (
      entityStates.length === 1 &&
      !entity.isObject &&
      !entity.isItem &&
      !entity.isTrigger &&
      entityStates[0].incomingTransitions.length > 0
    ) {
      entityStates.push(entityStates[0].incomingTransitions[0].from)
    }

    await createNodes(entityStates.map(({ id }) => id))
  }

  const addPreviousState = async (entityStateId, entityInstanceStateId) => {
    await createNodes([entityStateId], entityInstanceStateId)
  }

  const deleteManyNodes = useMutationWithSave(
    DELETE_NODES,
    (entityInstanceIds, entityInstanceStateIds) => ({
      variables: {
        entityInstanceIds,
        entityInstanceStateIds
      },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.games[0].instances = data.games[0].instances.filter(
          ({ id }) => !entityInstanceIds.includes(id)
        )

        data.games[0].instances.forEach(instance => {
          instance.states = instance.states.filter(
            ({ id }) => !entityInstanceStateIds.includes(id)
          )

          instance.states.forEach(state => {
            state.outgoingTransitions.forEach(outgoingTransition => {
              outgoingTransition.unlocks = outgoingTransition.unlocks.filter(
                ({ id }) => !entityInstanceStateIds.includes(id)
              )
            })
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const deleteNodes = async nodeIds => {
    const entityInstanceIds = game.instances
      .filter(({ states }) => states.every(({ id }) => nodeIds.includes(id)))
      .map(({ id }) => id)

    await deleteManyNodes(entityInstanceIds, nodeIds)
  }

  const connectInformationWithFieldValue = useMutationWithSave(
    CONNECT_INFORMATION_WITH_FIELD_VALUE,
    (informationId, fieldValueId) => ({
      variables: {
        informationId,
        fieldValueId
      }
    })
  )

  const disconnectInformationFromFieldValue = useMutationWithSave(
    DISCONNECT_INFORMATION_FROM_FIELD_VALUE,
    informationId => ({
      variables: {
        informationId
      }
    })
  )

  return {
    updateGameSettings,
    updateEntityInstanceName,
    updateFieldValue,

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
    createEntityInstance,
    addPreviousState,
    deleteNodes,

    connectInformationWithFieldValue,
    disconnectInformationFromFieldValue
  }
}

export default useGameMutations
