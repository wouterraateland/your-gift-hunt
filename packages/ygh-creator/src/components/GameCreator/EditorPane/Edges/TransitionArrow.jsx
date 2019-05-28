import React from "react"
import styled, { keyframes } from "styled-components"

import { getArrowColor } from "./ArrowDefs"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Arrow = styled.path`
  animation: ${fadeIn} 0.5s ease-out forwards;

  pointer-events: stroke;
`

const getD = (x1, y1, dx1, dy1, x2, y2, dx2, dy2) =>
  `M ${x1} ${y1} C ${x1 + dx1} ${y1 + dy1}, ${x2 + dx2} ${y2 +
    dy2}, ${x2} ${y2}`

const TransitionArrow = ({ x1, y1, dx1, dy1, x2, y2, dx2, dy2, type }) => (
  <Arrow
    d={getD(x1, y1, dx1, dy1, x2, y2, dx2, dy2)}
    type={type}
    style={{ color: getArrowColor(type) }}
    stroke="currentColor"
    strokeWidth={2}
    fill="none"
    markerStart={`url(#start-${type})`}
    markerEnd={`url(#end-${type})`}
  />
)

export default TransitionArrow
