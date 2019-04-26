import { NODE_TYPES } from "data"

import React, { memo, useMemo, useCallback } from "react"

import useEditor from "hooks/useEditor"
import useInspector from "hooks/useInspector"
import useGame from "hooks/useGame"

import NodePosition from "./NodePosition"
import EntryNode from "./EntryNode"
import ExitNode from "./ExitNode"
import EntityCard from "./EntityCard"

const Node = ({ id, entity, state, type }) => {
  const { ACTION_TYPES, upcomingAction } = useEditor()
  const { inspectNode, isOpen, nodeId } = useInspector()
  const { getNodePosition } = useGame()
  const position = getNodePosition(id)

  const Component = useMemo(
    () => {
      switch (type) {
        case NODE_TYPES.ENTRY:
          return memo(EntryNode)
        case NODE_TYPES.STATE:
          return memo(EntityCard)
        case NODE_TYPES.EXIT:
          return memo(ExitNode)
        default:
          return null
      }
    },
    [type]
  )

  const onClick = useCallback(
    () => type === NODE_TYPES.STATE && inspectNode(id),
    [id, type]
  )

  return (
    <NodePosition position={position}>
      <Component
        entity={entity}
        state={state}
        isFocussed={isOpen && nodeId === id}
        mayBeDeleted={
          upcomingAction &&
          upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
          upcomingAction.payload.dependentNodes.includes(id)
        }
        onClick={onClick}
      />
    </NodePosition>
  )
}

export default Node
