import { EDGE_TYPES, ACTION_TYPES } from "data"
import React from "react"

import useEntityGraph from "hooks/useEntityGraph"
// import useGameQueries from "hooks/useGameQueries"

import EntityTag from "components/GameCreator/ClickableEntityTag"
// import StateTag from "components/GameCreator/ClickableStateTag"
import ListItem from "./ListItem"

const EntityRequirement = ({ type, requiredEntity: { entityState } }) => {
  const { nodes } = useEntityGraph()
  // const { getStateById } = useGameQueries()

  const entity = nodes.find(
    node => node.state && node.state.id === entityState.id
  ).entity
  // const state = getStateById(entityState.id)

  return (
    <ListItem type={EDGE_TYPES.USE}>
      {type === ACTION_TYPES.USE && "Used on"}{" "}
      <EntityTag entity={entity}>
        {/* {" "}
        <StateTag state={state} /> */}
      </EntityTag>{" "}
      {type === ACTION_TYPES.TARGET_OF_USE && "is used on this"}
    </ListItem>
  )
}

export default EntityRequirement
