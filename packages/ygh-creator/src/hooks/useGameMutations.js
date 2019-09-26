import { ACTION_TYPES } from "data"
import { useContext } from "react"
import { useMutation, useApolloClient } from "react-apollo-hooks"

import _ from "ygh-utils"

import useGameTemplates from "hooks/useGameTemplates"
import useGame from "hooks/useGame"
import useEntities from "hooks/useEntities"
import useSaveState from "hooks/useSaveState"
import useEntityDependencies from "hooks/useEntityDependencies"

import GameMutationsContext from "contexts/GameMutations"

import { ENTITY_TEMPLATES, GAME_BY_ID, STATE_TRANSITIONS } from "gql/queries"
import {
  UPDATE_GAME_SETTINGS,
  UPDATE_ENTITY_NAME,
  UPDATE_ENTITY_CONTAINER,
  DISCONNECT_ENTITY_FROM_CONTAINER,
  UPDATE_FIELD_VALUE,
  CREATE_HINT,
  UPDATE_HINT,
  DELETE_HINT,
  ADD_UNLOCK_TO_STATE_TRANSITION,
  REMOVE_UNLOCK_FROM_STATE_TRANSITION,
  UPDATE_ENTITIES,
  CREATE_ENTITIES,
  DELETE_NODES,
  CONNECT_INFORMATION_SLOT_WITH_FIELD,
  DISCONNECT_INFORMATION_SLOT_FROM_FIELD,
  CREATE_ACTION_REQUIREMENT,
  UPDATE_ACTION_REQUIREMENT,
  DELETE_ACTION_REQUIREMENT,
  CONNECT_PORTAL_WITH_ENTRANCE,
  DISCONNECT_PORTAL_FROM_ENTRANCE,
  DISCONNECT_ENTRANCE_FROM_PORTAL,
  SET_START_CONTAINER
} from "gql/mutations"

const isChallenge = ({ isPlaceable, isContainer }) =>
  !isPlaceable && !isContainer

const useMutationWith = save => (mutation, transform) => {
  const actualMutation = useMutation(mutation)
  return save((...args) => actualMutation(transform(...args)))
}

export const useGameMutationsProvider = () => {
  const {
    entityTemplates,
    getEntityTemplateById,
    getStateTemplateById
  } = useGameTemplates()
  const { game, variables } = useGame()
  const { entities } = useEntities()
  const { getAdjacentStates } = useEntityDependencies()
  const { save } = useSaveState()

  const useMutationWithSave = useMutationWith(save)
  const client = useApolloClient()

  const query = { query: GAME_BY_ID, variables }

  const updateGameSettings = useMutationWithSave(
    UPDATE_GAME_SETTINGS,
    (gameId, values) => ({
      variables: {
        gameId,
        values
      },
      refetchQueries: () => [{ query: ENTITY_TEMPLATES, variables: { gameId } }]
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

  const updateEntityContainer = useMutationWithSave(
    UPDATE_ENTITY_CONTAINER,
    (entityId, containerId) => ({
      variables: {
        entityId,
        containerId
      },
      update: proxy => {
        const data = proxy.readQuery(query)
        const entities = data.game.entities
        entities.forEach(entity => {
          if (entity.id === containerId) {
            entity.containedEntities.push(
              entities.find(({ id }) => id === entityId)
            )
          } else if (entity.isContainer && entity.containedEntities.length) {
            entity.containedEntities = entity.containedEntities.filter(
              ({ id }) => id !== entityId
            )
          }
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const disconnectEntityFromContainer = useMutationWithSave(
    DISCONNECT_ENTITY_FROM_CONTAINER,
    entityId => ({
      variables: { entityId },
      update: proxy => {
        const data = proxy.readQuery(query)
        const entities = data.game.entities
        entities.forEach(entity => {
          if (entity.isContainer && entity.containedEntities.length) {
            entity.containedEntities = entity.containedEntities.filter(
              ({ id }) => id !== entityId
            )
          }
        })

        proxy.writeQuery({ ...query, data })
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

        data.game.entities.forEach(entity =>
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

      data.game.entities.forEach(entity =>
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

        data.game.entities.forEach(entity => {
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
      to ? t.to && t.to.id === to : t.to === null
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

        data.game.entities.forEach(instance => {
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

  const updateEntities = useMutationWithSave(
    UPDATE_ENTITIES,
    (gameId, entityUpdates) => ({
      variables: {
        gameId,
        entityUpdates
      }
    })
  )

  const completeEntitiesWithTemplates = async gameId => {
    const { data } = await client.query(query)

    const allEntities = data.game.entities
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

        const createPayloadRequirementFromTemplate = (
          type,
          payloadRequirementTemplate
        ) => ({
          template: { connect: { id: payloadRequirementTemplate.id } },
          requiredEntity:
            [ACTION_TYPES.USE, ACTION_TYPES.TARGET_OF_USE].includes(type) &&
            payloadRequirementTemplate.requiredEntity
              ? {
                  create: createEntityRequirementFromTemplate(
                    payloadRequirementTemplate.requiredEntity
                  )
                }
              : null,
          requiredInput:
            type === ACTION_TYPES.INPUT &&
            payloadRequirementTemplate.requiredInput
              ? {
                  create: createInputRequirementFromTemplate(
                    payloadRequirementTemplate.requiredInput
                  )
                }
              : null
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
              actionRequirementTemplate.type,
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
                    state =>
                      entity.states.some(({ id }) => id === state.id) &&
                      state.template.id === stateTransitionTemplate.to.id
                  ).id
                }
              }
            : null,
          requiredActions: {
            create: stateTransitionTemplate.requiredActions
              .filter(({ type }) => type === ACTION_TYPES.INPUT)
              .map(createActionRequirementFromTemplate)
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
            openPortals: {
              connect: entity.portals
                .filter(({ template }) =>
                  stateTemplate.openPortals.some(({ id }) => template.id === id)
                )
                .map(({ id }) => ({ id }))
            },
            outgoingTransitions: {
              create: stateTemplate.outgoingTransitions
                .filter(
                  ({ id, to }) =>
                    !state.outgoingTransitions.some(
                      ({ template }) => template.id === id
                    ) &&
                    (!to ||
                      (to &&
                        entity.states.some(
                          state => state.template.id === to.id
                        )))
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

    await updateEntities(gameId, entityUpdates)
  }

  const moveEntities = async (gameId, entityMoves) => {
    const entityUpdates = entityMoves.map(
      ({ id, graphPosition: { top, left } }) => ({
        where: { id },
        data: {
          graphPosition: {
            upsert: {
              create: { top, left },
              update: { top, left }
            }
          }
        }
      })
    )

    await updateEntities(gameId, entityUpdates)
  }

  const updateEntityPositions = async (gameId, entityPositions) => {
    const entityUpdates = entityPositions.map(
      ({ id, physicalPosition: { id: positionId, ...rest } }) => ({
        where: { id },
        data: {
          physicalPosition: {
            upsert: {
              create: rest,
              update: rest
            }
          }
        }
      })
    )

    await updateEntities(gameId, entityUpdates)
  }

  const createNodes = async (
    sourceStateTemplateIds,
    originStateId,
    graphCenter,
    physicalCenter
  ) => {
    const originEntity = originStateId
      ? entities.find(({ states }) =>
          states.some(({ id }) => originStateId === id)
        )
      : null
    const originEntityTemplateId = originEntity
      ? originEntity.template.id
      : null

    const stateTemplateIds = getAdjacentStates(sourceStateTemplateIds)
    const entityTemplatesThatShouldExist = entityTemplates.filter(
      ({ states }) => states.some(({ id }) => stateTemplateIds.includes(id))
    )

    const entityTemplatesToCreate = entityTemplatesThatShouldExist.filter(
      ({ id }) => id !== originEntityTemplateId
    )
    const entitiesToCreate = entityTemplatesToCreate.map(
      (entityTemplate, i) => {
        const existingEntitiesWithTemplate = entities.filter(
          ({ template }) => template.id === entityTemplate.id
        )
        return {
          template: { connect: { id: entityTemplate.id } },
          name: existingEntitiesWithTemplate.length
            ? `${entityTemplate.name} ${existingEntitiesWithTemplate.length +
                1}`
            : entityTemplate.name,
          description: entityTemplate.description,
          isItem: entityTemplate.isItem,
          isObject: entityTemplate.isObject,
          isTrigger: entityTemplate.isTrigger,
          isContainer: entityTemplate.isContainer,
          isPortal: entityTemplate.isPortal,
          isPlaceable: entityTemplate.isPlaceable,
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
          entrances: {
            create: entityTemplate.entrances.map(entranceTemplate => ({
              template: { connect: { id: entranceTemplate.id } },
              name: entranceTemplate.name,
              description: entranceTemplate.description
            }))
          },
          portals: {
            create: entityTemplate.portals.map(portalTemplate => ({
              template: { connect: { id: portalTemplate.id } },
              name: portalTemplate.name,
              description: portalTemplate.description
            }))
          },
          informationSlots: {
            create: entityTemplate.informationSlots.map(
              informationSlotTemplate => ({
                template: { connect: { id: informationSlotTemplate.id } },
                name: informationSlotTemplate.name,
                description: informationSlotTemplate.description,
                allowedTypes: {
                  connect: informationSlotTemplate.allowedTypes.map(
                    ({ id }) => ({
                      id
                    })
                  )
                }
              })
            )
          },
          graphPosition: {
            create: {
              top: graphCenter ? graphCenter.top - 2 : 0,
              left: graphCenter ? graphCenter.left - 3 : 0
            }
          },
          physicalPosition: {
            create: {
              top: physicalCenter ? physicalCenter.top : 0,
              left: physicalCenter ? physicalCenter.left : 0,
              z: entities.length + i
            }
          }
        }
      }
    )

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

  const createEntity = async (
    entityTemplateId,
    graphCenter,
    physicalCenter
  ) => {
    const entityTemplate = getEntityTemplateById(entityTemplateId)
    const entityStateTemplates = _.getMinimalStateSpan(entityTemplate.states)

    if (
      entityStateTemplates.length === 1 &&
      isChallenge(entityTemplate) &&
      entityStateTemplates[0].incomingTransitions.length > 0
    ) {
      entityStateTemplates.push(
        entityStateTemplates[0].incomingTransitions[0].from
      )
    }

    await createNodes(
      entityStateTemplates.map(({ id }) => id),
      null,
      graphCenter,
      physicalCenter
    )
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

        data.game.entities = data.game.entities.filter(
          ({ id }) => !entityIds.includes(id)
        )

        data.game.entities.forEach(entity => {
          entity.states = entity.states.filter(
            ({ id }) => !stateIds.includes(id)
          )

          if (entity.container && entityIds.includes(entity.container.id)) {
            entity.container = null
          }

          entity.states.forEach(state => {
            state.incomingTransitions = state.incomingTransitions.filter(
              incomingTransition =>
                !stateIds.includes(incomingTransition.from.id)
            )

            state.outgoingTransitions.forEach(outgoingTransition => {
              outgoingTransition.unlocks = outgoingTransition.unlocks.filter(
                ({ id }) => !stateIds.includes(id)
              )
            })
          })

          entity.containedEntities = entity.containedEntities.filter(
            ({ id }) => !entityIds.includes(id)
          )
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const deleteNodes = async nodeIds => {
    const entityIds = entities
      .filter(({ states }) => states.every(({ id }) => nodeIds.includes(id)))
      .map(({ id }) => id)

    await deleteManyNodes(entityIds, nodeIds)
  }

  const createActionRequirement = useMutationWithSave(
    CREATE_ACTION_REQUIREMENT,
    (transitionId, type, stateId) => ({
      variables: {
        transitionId,
        type,
        stateId
      }
    })
  )

  const updateActionRequirement = useMutationWithSave(
    UPDATE_ACTION_REQUIREMENT,
    (actionRequirementId, type, stateId) => ({
      variables: {
        actionRequirementId,
        type,
        stateId
      }
    })
  )

  const deleteActionRequirement = useMutationWithSave(
    DELETE_ACTION_REQUIREMENT,
    actionRequirementId => ({
      variables: { actionRequirementId },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.game.entities.forEach(entity =>
          entity.states.forEach(state =>
            state.outgoingTransitions.forEach(transition => {
              const i = transition.requiredActions.findIndex(
                ({ id }) => id === actionRequirementId
              )
              if (i !== -1) {
                transition.requiredActions.splice(i, 1)
              }
            })
          )
        )

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const connectInformationSlotWithField = useMutationWithSave(
    CONNECT_INFORMATION_SLOT_WITH_FIELD,
    (informationSlotId, fieldId) => ({
      variables: {
        informationSlotId,
        fieldId
      },
      update: (proxy, { data: { updateInformationSlot } }) => {
        const data = proxy.readQuery(query)

        data.game.entities.forEach(entity => {
          entity.fields.forEach(field => {
            if (field.id === fieldId) {
              const index = field.informationSlots.findIndex(
                ({ id }) => informationSlotId === id
              )
              if (index === -1) {
                field.informationSlots.push(updateInformationSlot)
              }
            }
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const disconnectInformationSlotFromField = useMutationWithSave(
    DISCONNECT_INFORMATION_SLOT_FROM_FIELD,
    informationSlotId => ({
      variables: {
        informationSlotId
      },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.game.entities.forEach(entity => {
          entity.fields.forEach(field => {
            const index = field.informationSlots.findIndex(
              ({ id }) => informationSlotId === id
            )
            if (index !== -1) {
              field.informationSlots.splice(index, 1)
            }
          })
        })

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  const connectPortalWithEntrance = useMutationWithSave(
    CONNECT_PORTAL_WITH_ENTRANCE,
    (portalId, entranceId) => ({
      variables: {
        portalId,
        entranceId
      }
    })
  )

  const disconnectPortalFromEntrance = useMutationWithSave(
    DISCONNECT_PORTAL_FROM_ENTRANCE,
    entranceId => ({
      variables: {
        entranceId
      }
    })
  )

  const disconnectEntranceFromPortal = useMutationWithSave(
    DISCONNECT_ENTRANCE_FROM_PORTAL,
    portalId => ({
      variables: {
        portalId
      }
    })
  )

  const setStartContainer = useMutationWithSave(
    SET_START_CONTAINER,
    containerId => ({
      variables: {
        gameId: game.id,
        containerId
      },
      update: proxy => {
        const data = proxy.readQuery(query)

        data.game.startContainer = data.game.entities.find(
          ({ id }) => id === containerId
        )

        proxy.writeQuery({ ...query, data })
      }
    })
  )

  return {
    updateGameSettings,
    updateEntityName,
    updateEntityContainer,
    disconnectEntityFromContainer,
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
    moveEntities,
    updateEntityPositions,

    createActionRequirement,
    updateActionRequirement,
    deleteActionRequirement,

    connectInformationSlotWithField,
    disconnectInformationSlotFromField,

    connectPortalWithEntrance,
    disconnectPortalFromEntrance,
    disconnectEntranceFromPortal,
    setStartContainer
  }
}

const useGameMutations = () => useContext(GameMutationsContext)
export default useGameMutations
