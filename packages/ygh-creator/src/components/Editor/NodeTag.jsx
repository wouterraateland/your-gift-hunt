import React from "react"
import EntityTag from "./EntityTag"
import StateTag from "./StateTag"

const NodeTag = ({ instance, state, type, ...otherProps }) => (
  <span {...otherProps}>
    {instance && <EntityTag {...instance.entity} />}
    <StateTag type={type}>{state && state.state.name}</StateTag>
  </span>
)

export default NodeTag
