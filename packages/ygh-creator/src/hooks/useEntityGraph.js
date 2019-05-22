import { NODE_TYPES } from "data"
import _ from "utils"
import { useContext } from "react"

import EntityGraphContext from "contexts/EntityGraph"

import useEntities from "hooks/useEntities"

export const useEntityGraphProvider = () => {
  const { entities } = useEntities()
  const nodes = _.calcNodes(entities)
  const edges = _.calcEdges(nodes)

  const getNodeById = nodeId => nodes.find(({ id }) => id === nodeId)
  const getEdgeById = edgeId => edges.find(({ id }) => id === edgeId)
  const getEntryNode = entityId =>
    nodes.find(
      ({ type, entity }) => type === NODE_TYPES.ENTRY && entity.id === entityId
    )
  const getStateNodes = entityId =>
    nodes.filter(
      ({ type, entity }) => type === NODE_TYPES.STATE && entity.id === entityId
    )
  const getExitNode = entityId =>
    nodes.find(
      ({ type, entity }) => type === NODE_TYPES.EXIT && entity.id === entityId
    )

  return {
    nodes,
    edges,
    getNodeById,
    getEdgeById,
    getEntryNode,
    getStateNodes,
    getExitNode
  }
}

const useEntityGraph = () => useContext(EntityGraphContext)
export default useEntityGraph
