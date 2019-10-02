import { ACTION_TYPES, EDGE_TYPES } from "data"
import PriorityQueue from "tinyqueue"

import { useContext } from "react"

import EntityDependenciesContext from "contexts/EntityDependencies"

import useGameTemplates from "./useGameTemplates"
import useEntities from "./useEntities"
import useEntityGraph from "./useEntityGraph"

export const useEntityDependenciesProvider = () => {
  const { entityTemplates, getStateTemplateById } = useGameTemplates()
  const { getNodeById, edges } = useEntityGraph()
  const { entities } = useEntities()

  const targetOfUseRequiredForTransition = (fromId, toId) => {
    const from = getNodeById(fromId)
    const to = getNodeById(toId)

    return to.state.outgoingTransitions.some(({ requiredActions }) =>
      requiredActions.some(
        ({ type, payload }) =>
          type === ACTION_TYPES.TARGET_OF_USE &&
          payload.requiredEntity.entityState.id === from.state.id
      )
    )
  }

  const getDependentNodes = (sourceNodeIds, includeUseRelations = false) => {
    const dependentStates = new Set(sourceNodeIds)
    const todo = new PriorityQueue(sourceNodeIds)

    const add = id => {
      if (!dependentStates.has(id)) {
        dependentStates.add(id)
        todo.push(id)
      }
    }

    while (todo.length > 0) {
      const nodeId = todo.pop()

      edges.forEach(({ from, to, type }) => {
        switch (type) {
          case EDGE_TYPES.TRANSFORM:
            if (to === nodeId) {
              add(from)
            }
            break
          case EDGE_TYPES.USE:
            if (includeUseRelations) {
              if (to === nodeId) {
                add(from)
              }
              if (
                from === nodeId &&
                targetOfUseRequiredForTransition(from, to)
              ) {
                add(to)
              }
            }
            break
          default:
            break
        }
      })

      const entity = entities.find(({ states }) =>
        states.some(state => state.id === nodeId)
      )
      if (entity && !entity.isPlaceable && entity.isContainer) {
        entity.entrances.forEach(({ portal }) => {
          if (portal) {
            const connectedEntity = entities.find(({ portals }) =>
              portals.some(({ id }) => id === portal.id)
            )
            if (connectedEntity) {
              connectedEntity.states
                .filter(state =>
                  state.openPortals.some(p => p.id === portal.id)
                )
                .forEach(state => add(state.id))
            }
          }
        })
      }
      if (entity && entity.isPortal) {
        const state = entity.states.find(({ id }) => id === nodeId)
        entity.portals
          .filter(
            portal =>
              portal.entrance &&
              state.openPortals.some(({ id }) => id === portal.id)
          )
          .forEach(portal => {
            const connectedEntity = entities.find(
              ({ isContainer, isPlaceable, entrances }) =>
                isContainer &&
                !isPlaceable &&
                entrances.some(entrance => entrance.portal.id === portal.id)
            )

            if (connectedEntity) {
              connectedEntity.states.forEach(state => {
                add(state.id)
              })
            }
          })
      }
    }

    return Array.from(dependentStates)
  }

  const getPreviousNodes = sourceNodeId => {
    const dependentStates = new Set([sourceNodeId])
    const todo = new PriorityQueue([sourceNodeId])

    const add = id => {
      if (!dependentStates.has(id)) {
        dependentStates.add(id)
        todo.push(id)
      }
    }

    while (todo.length > 0) {
      const nodeId = todo.pop()

      edges.forEach(({ from, to, unlocks, type }) => {
        switch (type) {
          case EDGE_TYPES.TRANSFORM:
            if (to === nodeId) {
              add(from)
            }
            if (from === nodeId) {
              add(to)
            }
            break
          case EDGE_TYPES.UNLOCK:
            if (unlocks === nodeId) {
              add(from)
              add(to)
            }
            break
          case EDGE_TYPES.USE:
            if (to === nodeId) {
              add(from)
            }
            break
          default:
            break
        }
      })
    }

    return Array.from(dependentStates)
  }

  const getNextNodes = sourceNodeId => {
    const dependentStates = new Set([sourceNodeId])
    const todo = new PriorityQueue([sourceNodeId])

    const add = id => {
      if (!dependentStates.has(id)) {
        dependentStates.add(id)
        todo.push(id)
      }
    }

    while (todo.length > 0) {
      const nodeId = todo.pop()

      edges.forEach(({ from, to, unlocks, type }) => {
        switch (type) {
          case EDGE_TYPES.TRANSFORM:
            if (from === nodeId) {
              add(to)
            }
            break
          case EDGE_TYPES.UNLOCK:
            if (from === nodeId || to === nodeId) {
              add(unlocks)
            }
            break
          case EDGE_TYPES.USE:
            if (from === nodeId) {
              add(to)
            }
            if (to === nodeId) {
              add(from)
            }
            break
          default:
            break
        }
      })
    }

    return Array.from(dependentStates)
  }

  const getAdjacentStates = (sourceStateIds, includeUseRelations = false) => {
    const todo = new PriorityQueue(sourceStateIds)
    const adjacentStateIds = sourceStateIds.slice()

    while (todo.length > 0) {
      const stateTemplate = getStateTemplateById(todo.pop())
      stateTemplate.outgoingTransitions.forEach(({ to, requiredActions }) => {
        // Transition siblings
        if (to && !adjacentStateIds.includes(to.id)) {
          adjacentStateIds.push(to.id)
          todo.push(to.id)
        }

        // Use siblings
        if (includeUseRelations) {
          requiredActions.forEach(({ type, payload }) => {
            if (
              [ACTION_TYPES.USE, ACTION_TYPES.TARGET_OF_USE].includes(type) &&
              !adjacentStateIds.includes(payload.requiredEntity.entityState.id)
            ) {
              adjacentStateIds.push(payload.requiredEntity.entityState.id)
              todo.push(payload.requiredEntity.entityState.id)
            }
          })
        }
      })
      // Non-placeable container siblings
      stateTemplate.openPortals.forEach(portalTemplate => {
        const entityTemplate = entityTemplates.find(
          ({ isPlaceable, isContainer, entrances, states }) =>
            !isPlaceable &&
            isContainer &&
            states.length > 0 &&
            entrances.some(({ connectablePortals }) =>
              connectablePortals.some(({ id }) => id === portalTemplate.id)
            )
        )

        if (entityTemplate) {
          adjacentStateIds.push(entityTemplate.states[0].id)
          todo.push(entityTemplate.states[0].id)
        }
      })
    }

    return adjacentStateIds
  }

  return {
    getDependentNodes,
    getPreviousNodes,
    getNextNodes,
    getAdjacentStates
  }
}

const useEntityDependencies = () => useContext(EntityDependenciesContext)
export default useEntityDependencies
