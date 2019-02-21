import React from "react"
import styled from "styled-components"

export const TRANSFORM_TRANSITION = "transform"
export const UNLOCK_TRANSITION = "unlock"

const Arrow = styled.svg`
  pointer-events: none;
  position: absolute;

  max-width: none;

  color: ${({ type }) => {
    switch (type) {
      case TRANSFORM_TRANSITION:
        return "#f93"
      case UNLOCK_TRANSITION:
        return "#39f"
      default:
        return "#ccc"
    }
  }};
`

const TransitionArrow = ({ x1, y1, x2, y2, type }) => (
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
      d={
        x1 === x2 && y1 > y2
          ? `M ${x1} ${y1} C ${x1 + 96} ${y1 + 64}, ${x2 - 96} ${y2 -
              64}, ${x2} ${y2}`
          : `M ${x1} ${y1} C ${x1} ${y1 + 64}, ${x2} ${y2 - 64}, ${x2} ${y2}`
      }
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      markerEnd={`url(#arrow-${type})`}
    />
  </Arrow>
)
TransitionArrow.TRANSFORM_TRANSITION = TRANSFORM_TRANSITION
TransitionArrow.UNLOCK_TRANSITION = UNLOCK_TRANSITION

export default TransitionArrow
