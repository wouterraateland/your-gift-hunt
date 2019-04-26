import React from "react"
import styled, { keyframes } from "styled-components"

import { EDGE_TYPES } from "data"
import { getArrowColor } from "./ArrowDefs"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Arrow = styled.svg`
  pointer-events: none;
  position: absolute;

  max-width: none;

  transition-property: left, top;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;

  animation: ${fadeIn} 0.5s ease-out forwards;

  & path {
    pointer-events: stroke;
  }
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
        top: `${Math.min(y1, y2) - 32}px`,
        color: getArrowColor(type)
      }}
      type={type}
    >
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
