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
    getStateTemplateById
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
    (actionRequirementId, { text, delay }) => ({
      variables: {
        actionRequirementId,
        text,
        delay
      },
      update: (proxy, { data: { createHint } }) => {
        const data = proxy.readQuery(query)

        data.games[0].entities.forEach(entity =>
          entity.states.forEach(state =>
            state.outgoingTransitions.forEach(transition =>
              transition.requiredActions.forEach(actionRequirement => {
                if (actionRequirement.id === actionRequirementId) {
                  actionRequirement.hints.push(createHint)
                }
              })
            )
          )
        )

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

      data.games[0].entities.forEach(entity =>
        entity.states.forEach(state =>
          state.outgoingTransitions.forEach(transition =>
            transition.requiredActions.forEach(actionRequirement => {
              const i = actionRequirement.hints.findIndex(
                hint => hint.id === id
              )
              if (i !== -1) {
                actionRequirement.hints.splice(i, 1)
              }
            })
          )
        )
      )

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
      variables: { from }
    })

    const { unlocks } = stateTransitions.find(t =>
      to ? t.to.id === to : t.to === null
    )

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
      variables: { from }
    })

    const { unlocks } = stateTransitions.find(t =>
      to ? t.to.id === to : t.to === null
    )

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

  const completeEntitiesWithTemplates = async gameId => {
    const { data } = await client.query(query)

    const allEntities = data.games[0].entities
    const entities = allEntities.filter(({ template }) => !!template)
    const states = allEntities.flatMap(({ states }) => states)

    const createEntityUpdate = entity => {
      const entityTemplate = getEntityTemplateById(entity.template.id)

      const createStateUpdate = state => {
        const stateTemplate = getStateTemplateById(state.template.id)

        const createHintFromTemplate = hintTemplate => ({
          template: { connect: { id: hintTemplate.id } },
          text: hintTemplate.text,
          delay: hintTemplate.delay
        })

        const createEntityRequirementFromTemplate = entityRequirementTemplate => ({
          template: { connect: { id: entityRequirementTemplate.id } },
          entityState: {
            connect: {
              id: states.find(
                state =>
                  state.template.id === entityRequirementTemplate.entityState.id
              ).id
            }
          }
        })

        const createInputRequirementFromTemplate = inputRequirementTemplate => ({
          template: { connect: { id: inputRequirementTemplate.id } },
          key: inputRequirementTemplate.key,
          comparator: inputRequirementTemplate.comparator,
          not: inputRequirementTemplate.not,

          value: inputRequirementTemplate.value,
          field: inputRequirementTemplate.field
            ? {
                connect: {
                  id: entity.fields.find(
                    field =>
                      field.template.id === inputRequirementTemplate.field.id
                  ).id
                }
              }
            : null
        })

        const createPayloadRequirementFromTemplate = payloadRequirementTemplate => ({
          template: { connect: { id: payloadRequirementTemplate.id } },
          requiredEntity: payloadRequirementTemplate.requiredEntity
            ? {
                create: createEntityRequirementFromTemplate(
                  payloadRequirementTemplate.requiredEntity
                )
              }
            : null,
          requiredInputs: {
            create: payloadRequirementTemplate.requiredInputs.map(
              createInputRequirementFromTemplate
            )
          }
        })

        const createActionRequirementFromTemplate = actionRequirementTemplate => ({
          template: { connect: { id: actionRequirementTemplate.id } },
          name: actionRequirementTemplate.name,
          description: actionRequirementTemplate.description,
          type: actionRequirementTemplate.type,
          hints: {
            create: actionRequirementTemplate.hints.map(createHintFromTemplate)
          },
          payload: {
            create: createPayloadRequirementFromTemplate(
              actionRequirementTemplate.payload
            )
          }
        })

        const createStateTransitionFromTemplate = stateTransitionTemplate => ({
          template: { connect: { id: stateTransitionTemplate.id } },
          to: stateTransitionTemplate.to
            ? {
                connect: {
                  id: states.find(
                    state => state.template.id === stateTransitionTemplate.to.id
                  ).id
                }
              }
            : null,
          requiredActions: {
            create: stateTransitionTemplate.requiredActions.map(
              createActionRequirementFromTemplate
            )
          }
        })

        return {
          where: { id: state.id },
          data: {
            availableInformationSlots: {
              connect: entity.informationSlots
                .filter(({ template }) =>
                  stateTemplate.availableInformationSlots.some(
                    ({ id }) => template.id === id
                  )
                )
                .map(({ id }) => ({ id }))
            },
            outgoingTransitions: {
              create: stateTemplate.outgoingTransitions
                .filter(
                  ({ id }) =>
                    !state.outgoingTransitions.some(
                      ({ template }) => template.id === id
                    )
                )
                .map(createStateTransitionFromTemplate)
            }
          }
        }
      }

      return {
        where: { id: entity.id },
        data: {
          defaultState: entityTemplate.defaultState
            ? {
                connect: {
                  id: entity.states.find(
                    state =>
                      state.template.id === entityTemplate.defaultState.id
                  ).id
                }
              }
            : null,
          featuredField: entityTemplate.featuredField
            ? {
                connect: {
                  id: entity.fields.find(
                    field =>
                      field.template.id === entityTemplate.featuredField.id
                  ).id
                }
              }
            : null,
          states: {
            update: entity.states.map(createStateUpdate)
          }
        }
      }
    }

    const entityUpdates = entities.map(createEntityUpdate)

    await createStateTransitions(gameId, entityUpdates)
  }

  const createNodes = async (sourceStateTemplateIds, originStateId) => {
    const originEntity = originStateId
      ? game.entities.find(({ states }) =>
          states.some(({ id }) => originStateId === id)
        )
      : null
    const originEntityTemplateId = originEntity
      ? originEntity.template.id
      : null

    const stateTemplateIds = dependencies.getAdjacentStates(
      sourceStateTemplateIds
    )
    const existingEntityTemplateIds = game.entities.map(
      ({ template: { id } }) => id
    )
    const entityTemplatesThatShouldExist = entityTemplates.filter(
      ({ states }) => states.some(({ id }) => stateTemplateIds.includes(id))
    )

    const entityTemplatesToCreate = entityTemplatesThatShouldExist.filter(
      ({ id, isObject, isItem }) =>
        id !== originEntityTemplateId &&
        (!(isObject || isItem) || !existingEntityTemplateIds.includes(id))
    )
    const entitiesToCreate = entityTemplatesToCreate.map(entityTemplate => {
      const existingEntitiesWithTemplate = game.entities.filter(
        ({ template }) => template.id === entityTemplate.id
      )
      return {
        template: { connect: { id: entityTemplate.id } },
        name: existingEntitiesWithTemplate.length
          ? `${entityTemplate.name} ${existingEntitiesWithTemplate.length + 1}`
          : entityTemplate.name,
        description: entityTemplate.description,
        isItem: entityTemplate.isItem,
        isObject: entityTemplate.isObject,
        isTrigger: entityTemplate.isTrigger,
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
            .filter(({ id }) => stateTemplateIds.includes(id))
            .map(stateTemplate => ({
              template: { connect: { id: stateTemplate.id } },
              name: stateTemplate.name,
              description: stateTemplate.description
            }))
        },
        informationSlots: {
          create: entityTemplate.informationSlots.map(
            informationSlotTemplate => ({
              template: { connect: { id: informationSlotTemplate.id } },
              name: informationSlotTemplate.name,
              description: informationSlotTemplate.description,
              allowedTypes: {
                connect: informationSlotTemplate.allowedTypes.map(({ id }) => ({
                  id
                }))
              }
            })
          )
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
                      stateTemplateIds.includes(id) &&
                      !originEntity.states.some(
                        ({ template }) => template.id === id
                      )
                  )
                  .map(stateTemplate => ({
                    template: { connect: { id: stateTemplate.id } },
                    name: stateTemplate.name,
                    description: stateTemplate.description
                  }))
              }
            }
          }
        ]
      : []

    await createEntities(game.id, entitiesToCreate, entitiesToUpdate)

    await completeEntitiesWithTemplates(game.id)
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

  const addPreviousState = async (stateTemplateId, stateId) => {
    await createNodes([stateTemplateId], stateId)
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
    const entityIds = game.entities
      .filter(({ states }) => states.every(({ id }) => nodeIds.includes(id)))
      .map(({ id }) => id)

    await deleteManyNodes(entityIds, nodeIds)
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
