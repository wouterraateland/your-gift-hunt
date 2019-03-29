import { useMutation, useApolloClient } from "react-apollo-hooks"
import useTemplates from "hooks/useTemplates"
import useGameData from "hooks/useGameData"

import { GAME_BY_SLUG, STATE_TRANSITIONS } from "gql/queries"
import {
  UPDATE_GAME_SETTINGS,
  UPDATE_ENTITY_NAME,
  UPDATE_FIELD_VALUE,
  CREATE_HINT,
  UPDATE_HINT,
  DELETE_HINT,
  ADD_UNLOCK_TO_STATE_TRANSITION,
  REMOVE_UNLOCK_FROM_STATE_TRANSITION,
  CREATE_STATE_TRANSITIONS,
  CREATE_ENTITIES,
  DELETE_NODES,
  CONNECT_INFORMATION_SLOT_WITH_FIELD,
  DISCONNECT_INFORMATION_SLOT_FROM_FIELD
} from "gql/mutations"

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

const useGameMutations = (variables, save, dependencies) => {
  const {
    entityTemplates,
    getEntityTemplateById,
    getEntityStateTemplateById
  } = useTemplates()
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

  const updateEntityName = useMutationWithSave(
    UPDATE_ENTITY_NAME,
    (entityId, name) => ({
      variables: {
        entityId,
        name
      }
    })
  )

  const updateFieldValue = useMutationWithSave(
    UPDATE_FIELD_VALUE,
    (fieldId, value) => ({
      variables: {
        fieldId,
        value
      }
    })
  )

  const createHint = useMutationWithSave(
    CREATE_HINT,
    (entityId, actionRequirementId, { text, delay }) => ({
      variables: {
        entityId,
        actionRequirementId,
        text,
        delay
      },
      update: (proxy, { data: { createHint } }) => {
        const data = proxy.readQuery(query)
        const instance = data.games[0].entities.find(
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

      data.games[0].entities.forEach(instance => {
        const i = instance.hints.findIndex(hint => hint.id === id)
        if (i !== -1) {
          instance.hints.splice(i, 1)
        }
      })

      proxy.writeQuery({ ...query, data })
    }
  }))

  const addUnlockToStateTransitionMutation = useMutationWithSave(
    ADD_UNLOCK_TO_STATE_TRANSITION,
    (stateTransitionId, stateId) => ({
      variables: { stateTransitionId, stateId },
      update: (proxy, { data: { updateStateTransition } }) => {
        const data = proxy.readQuery(query)

        data.games[0].entities.forEach(entity => {
          entity.states.forEach(state => {
            if (state.id === stateId) {
              const index = state.unlockedBy.findIndex(
                ({ id }) => stateTransitionId === id
              )
              if (index === -1) {
                const { unlocks, ...rest } = updateStateTransition
                state.unlockedBy.push(rest)
              }
            }
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const addUnlockToStateTransition = async (from, to, unlock) => {
    const {
      data: { stateTransitions }
    } = await client.query({
      query: STATE_TRANSITIONS,
      variables: { from, to }
    })

    const unlocks = stateTransitions[0].unlocks

    if (!unlocks.some(({ id }) => unlock === id)) {
      await addUnlockToStateTransitionMutation(stateTransitions[0].id, unlock)
    }
  }

  const removeUnlockFromStateTransitionMutation = useMutationWithSave(
    REMOVE_UNLOCK_FROM_STATE_TRANSITION,
    (stateTransitionId, stateId) => ({
      variables: { stateTransitionId, stateId },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.games[0].entities.forEach(instance => {
          instance.states.forEach(state => {
            if (state.id === stateId) {
              const index = state.unlockedBy.findIndex(
                ({ id }) => stateTransitionId === id
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

  const removeUnlockFromStateTransition = async (from, to, unlock) => {
    const {
      data: { stateTransitions }
    } = await client.query({
      query: STATE_TRANSITIONS,
      variables: { from, to }
    })

    const unlocks = stateTransitions[0].unlocks

    if (unlocks.some(({ id }) => unlock === id)) {
      await removeUnlockFromStateTransitionMutation(
        stateTransitions[0].id,
        unlock
      )
    }
  }

  const createEntities = useMutationWithSave(
    CREATE_ENTITIES,
    (gameId, entitiesToCreate, entitiesToUpdate) => ({
      variables: {
        gameId,
        entitiesToCreate,
        entitiesToUpdate
      }
    })
  )

  const createStateTransitions = useMutationWithSave(
    CREATE_STATE_TRANSITIONS,
    (gameId, entityUpdates) => ({
      variables: {
        gameId,
        entityUpdates
      }
    })
  )

  const ensureStateTransitions = async gameId => {
    const { data } = await client.query(query)

    const entities = data.games[0].entities
    const entityStates = entities.flatMap(({ states }) => states)

    const entityUpdates = entities
      .map(instance => ({
        where: { id: instance.id },
        data: {
          states: {
            update: instance.states
              .map(state => ({
                where: { id: state.id },
                data: {
                  outgoingTransitions: {
                    create: getEntityStateTemplateById(state.template.id)
                      .outgoingTransitions.filter(
                        stateTransitionTemplate =>
                          !state.outgoingTransitions.some(stateTransition =>
                            stateTransition.to === null
                              ? stateTransitionTemplate.to === null
                              : stateTransitionTemplate.to &&
                                stateTransitionTemplate.to.id ===
                                  entityStates.find(
                                    entityState =>
                                      entityState.id === stateTransition.to.id
                                  ).template.id
                          )
                      )
                      .map(stateTransitionTemplate => ({
                        to: stateTransitionTemplate.to
                          ? {
                              connect: {
                                id: instance.states.find(
                                  to =>
                                    to.template.id ===
                                    stateTransitionTemplate.to.id
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

    await createStateTransitions(gameId, entityUpdates)
  }

  const createNodes = async (stateIdsToCreate, originStateId) => {
    const originEntity = originStateId
      ? game.entities.find(({ states }) =>
          states.some(({ id }) => originStateId === id)
        )
      : null
    const originEntityTemplateId = originEntity
      ? originEntity.template.id
      : null

    const entityStateIds = dependencies.getAdjacentEntityStates(
      stateIdsToCreate
    )
    const existingEntityTemplateIds = game.entities.map(
      ({ template: { id } }) => id
    )
    const entityTemplatesThatShouldExist = entityTemplates.filter(
      ({ states }) => states.some(({ id }) => entityStateIds.includes(id))
    )

    const entityTemplatesToCreate = entityTemplatesThatShouldExist.filter(
      ({ id, isObject, isItem }) =>
        id !== originEntityTemplateId &&
        (!(isObject || isItem) || !existingEntityTemplateIds.includes(id))
    )
    const entitiesToCreate = entityTemplatesToCreate.map(entityTemplate => {
      const existingEntitiesWithName = game.entities.filter(
        ({ name }) => name === entityTemplate.name
      )
      return {
        name: existingEntitiesWithName.length
          ? `${entityTemplate.name} ${existingEntitiesWithName.length + 1}`
          : entityTemplate.name,
        template: { connect: { id: entityTemplate.id } },
        fields: {
          create: entityTemplate.fields.map(fieldTemplate => ({
            template: { connect: { id: fieldTemplate.id } },
            name: fieldTemplate.name,
            description: fieldTemplate.description,
            type: { connect: { id: fieldTemplate.type.id } },
            isSecret: fieldTemplate.isSecret
          }))
        },
        states: {
          create: entityTemplate.states
            .filter(({ id }) => entityStateIds.includes(id))
            .map(({ id }) => ({ template: { connect: { id } } }))
        },
        informationSlots: {
          create: entityTemplate.informationSlots.map(({ id }) => ({
            template: { connect: { id } }
          }))
        }
      }
    })

    const entitiesToUpdate = originEntity
      ? [
          {
            where: { id: originEntity.id },
            data: {
              states: {
                create: getEntityTemplateById(originEntityTemplateId)
                  .states.filter(
                    ({ id }) =>
                      entityStateIds.includes(id) &&
                      !originEntity.states.some(
                        entityInstanceState =>
                          entityInstanceState.state.id === id
                      )
                  )
                  .map(({ id }) => ({
                    template: { connect: { id } }
                  }))
              }
            }
          }
        ]
      : []

    await createEntities(game.id, entitiesToCreate, entitiesToUpdate)

    await ensureStateTransitions(game.id)
  }

  const createEntity = async entityTemplateId => {
    const entityTemplate = getEntityTemplateById(entityTemplateId)
    const entityStateTemplates = dependencies.getMinimalStateSpan(
      entityTemplate.states
    )

    if (
      entityStateTemplates.length === 1 &&
      !entityTemplate.isObject &&
      !entityTemplate.isItem &&
      !entityTemplate.isTrigger &&
      entityStateTemplates[0].incomingTransitions.length > 0
    ) {
      entityStateTemplates.push(
        entityStateTemplates[0].incomingTransitions[0].from
      )
    }

    await createNodes(entityStateTemplates.map(({ id }) => id))
  }

  const addPreviousState = async (entityStateId, stateId) => {
    await createNodes([entityStateId], stateId)
  }

  const deleteManyNodes = useMutationWithSave(
    DELETE_NODES,
    (entityIds, stateIds) => ({
      variables: {
        entityIds,
        stateIds
      },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.games[0].entities = data.games[0].entities.filter(
          ({ id }) => !entityIds.includes(id)
        )

        data.games[0].entities.forEach(entity => {
          entity.states = entity.states.filter(
            ({ id }) => !stateIds.includes(id)
          )

          entity.states.forEach(state => {
            state.outgoingTransitions.forEach(outgoingTransition => {
              outgoingTransition.unlocks = outgoingTransition.unlocks.filter(
                ({ id }) => !stateIds.includes(id)
              )
            })
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const deleteNodes = async nodeIds => {
    const stateIds = game.entities
      .filter(({ states }) => states.every(({ id }) => nodeIds.includes(id)))
      .map(({ id }) => id)

    await deleteManyNodes(stateIds, nodeIds)
  }

  const connectInformationSlotWithField = useMutationWithSave(
    CONNECT_INFORMATION_SLOT_WITH_FIELD,
    (informationSlotId, fieldValueId) => ({
      variables: {
        informationSlotId,
        fieldValueId
      }
    })
  )

  const disconnectInformationSlotFromField = useMutationWithSave(
    DISCONNECT_INFORMATION_SLOT_FROM_FIELD,
    informationSlotId => ({
      variables: {
        informationSlotId
      }
    })
  )

  return {
    updateGameSettings,
    updateEntityName,
    updateFieldValue,

    // Hint mutations
    createHint,
    updateHint,
    deleteHint,

    // Unlock mutations
    addUnlockToStateTransition,
    removeUnlockFromStateTransition,

    // Creation and deletion mutations
    createEntity,
    addPreviousState,
    deleteNodes,

    connectInformationSlotWithField,
    disconnectInformationSlotFromField
  }
}

export default useGameMutations
