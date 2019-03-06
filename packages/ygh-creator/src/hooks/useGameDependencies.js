import { ACTION_TYPES, EDGE_TYPES } from "data"

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

  return {
    getDependentNodes
  }
}

export default useGameDependencies
