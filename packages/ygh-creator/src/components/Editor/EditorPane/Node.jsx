import React from "react"
import _ from "utils"

import EntryNode from "./EntryNode"
import ExitNode from "./ExitNode"
import InstanceCard from "./InstanceCard"

import { NODE_TYPES } from "data"

const Node = ({
  id,
  instance,
  position,
  state,
  type,
  onNodeClick = _.noop
}) => {
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
          onClick={() => onNodeClick(id)}
        />
      )
    case NODE_TYPES.EXIT:
      return <ExitNode position={position} />
    default:
      return null
  }
}

export default Node
