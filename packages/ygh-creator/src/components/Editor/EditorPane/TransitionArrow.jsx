import React from "react"
import styled from "styled-components"

import { EDGE_TYPES } from "data"

const Arrow = styled.svg`
  pointer-events: none;
  position: absolute;

  max-width: none;

  color: ${({ type }) => {
    switch (type) {
      case EDGE_TYPES.TRANSFORM:
      case EDGE_TYPES.EXIT:
        return "#f93"
      case EDGE_TYPES.UNLOCK:
      case EDGE_TYPES.ENTRY:
        return "#39f"
      case EDGE_TYPES.USE:
        return "#3f9"
      case EDGE_TYPES.INFO:
        return "#f39"
      default:
        return "#ccc"
    }
  }};
`

const getD = (x1, y1, x2, y2, type) => {
  switch (type) {
    case EDGE_TYPES.USE:
    case EDGE_TYPES.INFO:
      return x1 < x2
        ? `M ${x1} ${y1} C ${x1 + 64} ${y1}, ${x2 - 64} ${y2}, ${x2} ${y2}`
        : x1 === x2
        ? `M ${x1} ${y1} C ${x1 - 32} ${y1}, ${x2 - 32} ${y2}, ${x2} ${y2}`
        : `M ${x1} ${y1} C ${x1 - 64} ${y1}, ${x2 + 64} ${y2}, ${x2} ${y2}`
    case EDGE_TYPES.UNLOCK:
      return x1 === x2 && y1 > y2
        ? `M ${x1} ${y1} C ${x1 + 96} ${y1 + 32}, ${x2 - 96} ${y2 -
            32}, ${x2} ${y2}`
        : `M ${x1} ${y1} C ${x1} ${y1 + 32}, ${x2} ${y2 - 32}, ${x2} ${y2}`
    default:
      return x1 === x2 && y1 > y2
        ? `M ${x1} ${y1} C ${x1 + 96} ${y1 + 64}, ${x2 - 96} ${y2 -
            64}, ${x2} ${y2}`
        : `M ${x1} ${y1} C ${x1} ${y1 + 64}, ${x2} ${y2 - 64}, ${x2} ${y2}`
  }
}

const TransitionArrow = ({ x1, y1, x2, y2, type }) => {
  const d = getD(x1, y1, x2, y2, type)
  return (
    <Arrow
      viewBox={`
      ${Math.min(x1, x2) - 32} ${Math.min(y1, y2) - 32}
      ${Math.abs(x2 - x1) + 64} ${Math.abs(y2 - y1) + 64}`}
      height={Math.abs(y2 - y1) + 64}
      style={{
        left: `${Math.min(x1, x2) - 32}px`,
        top: `${Math.min(y1, y2) - 32}px`
      }}
      type={type}
    >
      <defs>
        <marker
          id={`circle-${type}`}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          markerUnits="strokeWidth"
          orient="auto"
        >
          <path
            d="M 5, 5 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0"
            fill="currentColor"
          />
        </marker>
        <marker
          id={`arrow-${type}`}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          markerUnits="strokeWidth"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        markerStart={`url(#circle-${type})`}
        markerEnd={`url(#arrow-${type})`}
      />
    </Arrow>
  )
}

export default TransitionArrow
