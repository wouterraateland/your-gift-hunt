import { ACTION_TYPES, EDGE_TYPES } from "data"
import { EPSILON, approximateStationaryDistribution } from "utils/math"

import useEntities from "./useEntities"
import PriorityQueue from "tinyqueue"

const useGameDependencies = ({ getNodeById, edges }) => {
  const { getEntityStateById } = useEntities()

  const targetOfUseRequiredForTransition = (fromId, toId) => {
    const from = getNodeById(fromId)
    const to = getNodeById(toId)

    const entityState = getEntityStateById(to.state.state.id)

    // TODO: what if an entityState has multiple outgoing transitions?
    return entityState.outgoingTransitions.some(({ requiredActions }) =>
      requiredActions.some(
        ({ type, payload }) =>
          type === ACTION_TYPES.TARGET_OF_USE &&
          payload.requiredEntity.entity.id === from.instance.entity.id &&
          payload.requiredEntity.state.id === from.state.state.id
      )
    )
  }

  const getDependentNodes = originNodeId => {
    const dependentNodes = new Set([originNodeId])
    const todo = new PriorityQueue([originNodeId])

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

  const getPreviousNodes = originNodeId => {
    const dependentNodes = new Set([originNodeId])
    const todo = new PriorityQueue([originNodeId])

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

  const getNextNodes = originNodeId => {
    const dependentNodes = new Set([originNodeId])
    const todo = new PriorityQueue([originNodeId])

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

  const getAdjacentEntityStates = originEntityStateIds => {
    const todo = new PriorityQueue(originEntityStateIds)
    const adjacentEntityStateIds = originEntityStateIds.slice()

    while (todo.length > 0) {
      const entityState = getEntityStateById(todo.pop())
      entityState.outgoingTransitions.forEach(({ to, requiredActions }) => {
        // Transition siblings
        if (to && !adjacentEntityStateIds.includes(to.id)) {
          adjacentEntityStateIds.push(to.id)
          todo.push(to.id)
        }

        // Use siblings
        requiredActions.forEach(({ type, payload }) => {
          if (
            [ACTION_TYPES.USE, ACTION_TYPES.TARGET_OF_USE].includes(type) &&
            !adjacentEntityStateIds.includes(payload.requiredEntity.state.id)
          ) {
            adjacentEntityStateIds.push(payload.requiredEntity.state.id)
            todo.push(payload.requiredEntity.state.id)
          }
        })
      })
    }

    return adjacentEntityStateIds
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
    getAdjacentEntityStates,
    getMinimalStateSpan
  }
}

export default useGameDependencies
