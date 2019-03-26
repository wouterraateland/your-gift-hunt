import { EDGE_TYPES, ACTION_TYPES } from "data"
import React, { useContext } from "react"

import GameContext from "contexts/Game"

import NodeTag from "components/Editor/NodeTag"
import ListItem from "./ListItem"

const EntityRequirement = ({ type, requiredEntity: { entityState } }) => {
  const { nodes } = useContext(GameContext)

  const node = nodes.find(
    node => node.state && node.state.id === entityState.id
  )

  return (
    <ListItem type={EDGE_TYPES.USE}>
      {type === ACTION_TYPES.USE && "Used on"}{" "}
      <NodeTag node={node} showEntity />{" "}
      {type === ACTION_TYPES.TARGET_OF_USE && "is used on this"}
    </ListItem>
  )
}

export default EntityRequirement
