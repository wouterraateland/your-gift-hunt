import React from "react"
import styled from "styled-components"

import useEntityAreas from "hooks/useEntityAreas"

import Edge from "./Edge"
import ArrowDefs from "./ArrowDefs"

const EdgeContainer = styled.svg`
  position: absolute;
  z-index: 1;

  max-width: none;
  pointer-events: none;
`

const Edges = ({ edges }) => {
  const { getCompleteArea } = useEntityAreas()

  const { top, left, width, height } = getCompleteArea()

  return (
    <EdgeContainer
      viewBox={`
      ${(left - 1) * 32} ${(top - 1) * 32}
      ${(width + 2) * 32} ${(height + 2) * 32}`}
      height={(height + 2) * 32}
      style={{
        top: `${(top - 1) * 32}px`,
        left: `${(left - 1) * 32}px`
      }}
    >
      <ArrowDefs />
      {edges.map(edge => (
        <Edge key={edge.id} edge={edge} />
      ))}
    </EdgeContainer>
  )
}

export default Edges
