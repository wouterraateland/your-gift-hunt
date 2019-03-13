import { EDGE_TYPES, ACTION_TYPES } from "data"
import React, { useContext } from "react"

import GameContext from "contexts/Game"

import NodeTag from "components/Editor/NodeTag"
import ListItem from "./ListItem"

const EntityRequirement = ({ type, requiredEntity: { entity, state } }) => {
  const { nodes } = useContext(GameContext)

  const node = nodes.find(
    node =>
      node.instance.entity.id === entity.id &&
      node.state &&
      node.state.state.id === state.id
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
