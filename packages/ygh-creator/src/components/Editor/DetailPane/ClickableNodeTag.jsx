import React, { useContext } from "react"

import InspectorContext from "contexts/Inspector"

import NodeTag from "../NodeTag"

const ClickableNodeTag = ({ id, ...otherProps }) => {
  const { inspectNode } = useContext(InspectorContext)

  return (
    <NodeTag
      {...otherProps}
      style={{ cursor: "pointer" }}
      onMouseDown={() => inspectNode(id)}
    />
  )
}

export default ClickableNodeTag
