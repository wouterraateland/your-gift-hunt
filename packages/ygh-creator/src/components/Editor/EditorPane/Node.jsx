import { NODE_TYPES } from "data"

import React, { useContext } from "react"

import EditorContext from "contexts/Editor"
import InspectorContext from "contexts/Inspector"

import EntryNode from "./EntryNode"
import ExitNode from "./ExitNode"
import InstanceCard from "./InstanceCard"

const Node = ({ id, instance, position, state, type }) => {
  const { ACTION_TYPES, upcomingAction } = useContext(EditorContext)
  const { inspectNode } = useContext(InspectorContext)

  switch (type) {
    case NODE_TYPES.ENTRY:
      return <EntryNode position={position} />
    case NODE_TYPES.STATE:
      return (
        <InstanceCard
          key={id}
          position={position}
          instance={instance}
          state={state.state.name}
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
}

export default Node
