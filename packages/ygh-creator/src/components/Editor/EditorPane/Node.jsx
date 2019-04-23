import { NODE_TYPES } from "data"

import React, { memo } from "react"

import useEditor from "hooks/useEditor"
import useInspector from "hooks/useInspector"
import useGame from "hooks/useGame"

import EntryNode from "./EntryNode"
import ExitNode from "./ExitNode"
import EntityCard from "./EntityCard"

const Node = memo(({ id, entity, state, type }) => {
  const { ACTION_TYPES, upcomingAction } = useEditor()
  const { inspectNode, isOpen, nodeId } = useInspector()
  const { getNodePosition } = useGame()
  const position = getNodePosition(id)

  switch (type) {
    case NODE_TYPES.ENTRY:
      return <EntryNode position={position} />
    case NODE_TYPES.STATE:
      return (
        <EntityCard
          key={id}
          position={position}
          entity={entity}
          state={state}
          isFocussed={isOpen && nodeId === id}
          mayBeDeleted={
            upcomingAction &&
            upcomingAction.type === ACTION_TYPES.DELETE_NODE &&
            upcomingAction.payload.dependentNodes.includes(id)
          }
          onClick={() => inspectNode(id)}
        />
      )
    case NODE_TYPES.EXIT:
      return <ExitNode position={position} />
    default:
      return null
  }
})
Node.whyDidYouRender = true

export default Node
