import { NODE_TYPES } from "data"
import React, { useContext } from "react"

import InspectorContext from "contexts/Inspector"

import StateTag from "../StateTag"

const ClickableStateTag = ({ id, type, state }) => {
  const { inspectNode } = useContext(InspectorContext)

  return type === NODE_TYPES.STATE ? (
    <StateTag style={{ cursor: "pointer" }} onClick={() => inspectNode(id)}>
      {state.state.name}
    </StateTag>
  ) : (
    <StateTag type={type} />
  )
}

export default ClickableStateTag
