import { NODE_TYPES } from "data"

import React, { memo, useContext } from "react"

import EditorContext from "contexts/Editor"
import InspectorContext from "contexts/Inspector"
import GameContext from "contexts/Game"

import EntryNode from "./EntryNode"
import ExitNode from "./ExitNode"
import EntityCard from "./EntityCard"

const Node = memo(({ id, entity, state, type }) => {
  const { ACTION_TYPES, upcomingAction } = useContext(EditorContext)
  const { inspectNode, isOpen, nodeId } = useContext(InspectorContext)
  const { getNodePosition } = useContext(GameContext)
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
          state={state.name}
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
