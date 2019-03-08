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

    while (todo.length > 0) {
      const nodeId = todo.pop()

      // Normal dependencies
      edges
        .filter(
          ({ from, to, type }) =>
            [EDGE_TYPES.TRANSFORM, EDGE_TYPES.USE].includes(type) &&
            to === nodeId &&
            !dependentNodes.has(from)
        )
        .forEach(({ from }) => {
          dependentNodes.add(from)
          todo.push(from)
        })

      // Inverse use dependencies
      edges
        .filter(
          ({ from, to, type }) =>
            type === EDGE_TYPES.USE &&
            from === nodeId &&
            !dependentNodes.has(to) &&
            targetOfUseRequiredForTransition(from, to)
        )
        .forEach(({ to }) => {
          dependentNodes.add(to)
          todo.push(to)
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
    getAdjacentEntityStates,
    getMinimalStateSpan
  }
}

export default useGameDependencies
