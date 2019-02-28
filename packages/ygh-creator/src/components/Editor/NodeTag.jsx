import React from "react"
import InstanceTag from "./InstanceTag"
import StateTag from "./StateTag"

const NodeTag = ({ instance, state, type, ...otherProps }) => (
  <span {...otherProps}>
    {instance && <InstanceTag {...instance} />}
    <StateTag type={type}>{state && state.state.name}</StateTag>
  </span>
)

export default NodeTag
