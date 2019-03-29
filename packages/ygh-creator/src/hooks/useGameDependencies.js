import { ACTION_TYPES, EDGE_TYPES } from "data"
import { EPSILON, approximateStationaryDistribution } from "utils/math"

import useTemplates from "./useTemplates"
import PriorityQueue from "tinyqueue"

const useGameDependencies = ({ getNodeById, edges }) => {
  const { getStateTemplateById } = useTemplates()

  const targetOfUseRequiredForTransition = (fromId, toId) => {
    const from = getNodeById(fromId)
    const to = getNodeById(toId)

    // const stateTemplate = getStateTemplateById(to.state.template.id)

    // TODO: what if an stateTemplate has multiple outgoing transitions?
    return to.state.outgoingTransitions.some(({ requiredActions }) =>
      requiredActions.some(
        ({ type, payload }) =>
          type === ACTION_TYPES.TARGET_OF_USE &&
          payload.requiredEntity.entityState.id === from.state.id
      )
    )
  }

  const getDependentNodes = sourceNodeId => {
    const dependentNodes = new Set([sourceNodeId])
    const todo = new PriorityQueue([sourceNodeId])

    const add = id => {
      if (!dependentNodes.has(id)) {
        dependentNodes.add(id)
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

    return Array.from(dependentNodes)
  }

  const getPreviousNodes = sourceNodeId => {
    const dependentNodes = new Set([sourceNodeId])
    const todo = new PriorityQueue([sourceNodeId])

    const add = id => {
      if (!dependentNodes.has(id)) {
        dependentNodes.add(id)
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

    return Array.from(dependentNodes)
  }

  const getNextNodes = sourceNodeId => {
    const dependentNodes = new Set([sourceNodeId])
    const todo = new PriorityQueue([sourceNodeId])

    const add = id => {
      if (!dependentNodes.has(id)) {
        dependentNodes.add(id)
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

    return Array.from(dependentNodes)
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

  const getMinimalStateSpan = states => {
    if (states.length === 1) {
      return states
    }

    const stateIds = states.map(({ id }) => id)
    const transitionMatrix = states.map(({ id, outgoingTransitions }) => {
      const actualTransitions = outgoingTransitions.flatMap(({ to }) =>
        to ? [to.id] : []
      )
      return stateIds.map(stateId =>
        actualTransitions.length
          ? actualTransitions.includes(stateId)
            ? 1 / actualTransitions.length
            : 0
          : stateId === id
          ? 1
          : 0
      )
    })

    const stationaryDistribution = approximateStationaryDistribution(
      transitionMatrix
    )

    return states.filter((_, i) => stationaryDistribution[i] > EPSILON)
  }

  return {
    getDependentNodes,
    getPreviousNodes,
    getNextNodes,
    getAdjacentStates,
    getMinimalStateSpan
  }
}

export default useGameDependencies
