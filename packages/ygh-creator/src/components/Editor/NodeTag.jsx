import { NODE_TYPES } from "data"
import React, { useContext } from "react"

import InspectorContext from "contexts/Inspector"

import EntityTag from "./EntityTag"
import StateTag from "./StateTag"

const NodeTag = ({ node, isClickable = true, showEntity = false }) => {
  const { inspectNode } = useContext(InspectorContext)

  const containerProps =
    isClickable && node.type === NODE_TYPES.STATE
      ? {
          onClick: () => inspectNode(node.id),
          style: { cursor: "pointer" }
        }
      : {}

  return (
    <span {...containerProps}>
      {showEntity && (
        <EntityTag entity={node.instance.entity} name={node.instance.name} />
      )}
      <StateTag type={node.type} name={node.state && node.state.state.name} />
    </span>
  )
}

export default NodeTag
