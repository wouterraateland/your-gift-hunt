import { NODE_TYPES } from "data"
import React, { useContext } from "react"
import styled from "styled-components"

import InspectorContext from "contexts/Inspector"

import EntityTag from "./EntityTag"
import StateTag from "./StateTag"

const StyledEntityTag = styled(EntityTag)`
  padding-right: 0.75em;
  margin-right: -0.25em;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`

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
        <StyledEntityTag
          entity={node.instance.entity}
          name={node.instance.name}
        />
      )}
      <StateTag type={node.type} name={node.state && node.state.state.name} />
    </span>
  )
}

export default NodeTag
