import { ACTION_TYPES, EDGE_TYPES } from "data"
import PriorityQueue from "tinyqueue"

import { useContext } from "react"

import EntityDependenciesContext from "contexts/EntityDependencies"

import useTemplates from "./useTemplates"
import useEntityGraph from "./useEntityGraph"

export const useEntityDependenciesProvider = () => {
  const { getStateTemplateById } = useTemplates()
  const { getNodeById, edges } = useEntityGraph()

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

  const getDependentNodes = sourceNodeIds => {
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
            if (to === nodeId) {
              add(from)
            }
            if (from === nodeId && targetOfUseRequiredForTransition(from, to)) {
              add(to)
            }
            break
          default:
            break
        }
      })
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

  const getAdjacentStates = sourceStateIds => {
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
        requiredActions.forEach(({ type, payload }) => {
          if (
            [ACTION_TYPES.USE, ACTION_TYPES.TARGET_OF_USE].includes(type) &&
            !adjacentStateIds.includes(payload.requiredEntity.entityState.id)
          ) {
            adjacentStateIds.push(payload.requiredEntity.entityState.id)
            todo.push(payload.requiredEntity.entityState.id)
          }
        })
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
