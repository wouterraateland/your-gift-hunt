import { ACTION_TYPES } from "data"

import React from "react"

import ListItem from "./ListItem"
import EntityRequirement from "./EntityRequirement"
import ValueRequirement from "./ValueRequirement"

const ActionRequirement = ({ type, payload }) => {
  switch (type) {
    case ACTION_TYPES.USE:
    case ACTION_TYPES.TARGET_OF_USE:
      return (
        <EntityRequirement
          type={type}
          requiredEntity={payload.requiredEntity}
        />
      )
    case ACTION_TYPES.INPUT:
      return <ValueRequirement requiredValues={payload.requiredValues} />
    default:
      return (
        <ListItem>
          {type}: {JSON.stringify(payload)}
        </ListItem>
      )
  }
}

export default ActionRequirement
