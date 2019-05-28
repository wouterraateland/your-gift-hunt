import { EDGE_TYPES } from "data"
import React, { memo } from "react"

import useEntityAreas from "hooks/useEntityAreas"

import TransitionArrow from "./TransitionArrow"

const useEdge = ({ type, from, to, unlocks }) => {
  const { getNodeArea } = useEntityAreas()

  const fromArea = getNodeArea(from)
  const toArea = getNodeArea(to)
  const unlocksArea = getNodeArea(unlocks)

  if (!fromArea || !toArea || (type === EDGE_TYPES.UNLOCK && !unlocksArea)) {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      dx1: 0,
      dy1: 0,
      dx2: 0,
      dy2: 0
    }
  }

  switch (type) {
    case EDGE_TYPES.UNLOCK:
      return {
        x1: (fromArea.centerX + toArea.centerX) / 2,
        y1: (fromArea.bottom + toArea.top) / 2,
        x2: unlocksArea.centerX,
        y2: unlocksArea.top,
        dx1: 0,
        dy1: 1,
        dx2: 0,
        dy2: -1
      }

    case EDGE_TYPES.USE:
      return {
        x1: fromArea.right,
        y1: fromArea.centerY,
        x2: toArea.left,
        y2: toArea.centerY,
        dx1: 1,
        dy1: 0,
        dx2: -1,
        dy2: 0
      }

    case EDGE_TYPES.ENTRY:
      return {
        x1: fromArea.centerX,
        y1: fromArea.centerY,
        x2: toArea.centerX,
        y2: toArea.top,
        dx1: 0,
        dy1: 1,
        dx2: 0,
        dy2: -1
      }

    case EDGE_TYPES.INFO:
    case EDGE_TYPES.PORTAL:
      return {
        x1: fromArea.centerX,
        y1: fromArea.centerY,
        x2: toArea.centerX,
        y2: toArea.centerY,
        dx1: 1,
        dy1: 0,
        dx2: -1,
        dy2: 0
      }

    case EDGE_TYPES.INFO_AVAILABILITY:
    case EDGE_TYPES.PORTAL_OPENNESS:
      return {
        x1: fromArea.right,
        y1: fromArea.centerY,
        x2: toArea.centerX,
        y2: toArea.centerY,
        dx1: 1,
        dy1: 0,
        dx2: -1,
        dy2: 0
      }

    case EDGE_TYPES.FIELD_USAGE:
      return {
        x1: fromArea.centerX,
        y1: fromArea.centerY,
        x2: toArea.left,
        y2: toArea.centerY,
        dx1: 1,
        dy1: 0,
        dx2: -1,
        dy2: 0
      }

    default:
      return {
        x1: fromArea.centerX,
        y1: fromArea.bottom,
        x2: toArea.centerX,
        y2: toArea.top,
        dx1: toArea.centerY < fromArea.centerY ? 1 : 0,
        dy1: 1,
        dx2: toArea.centerY < fromArea.centerY ? 1 : 0,
        dy2: -1
      }
  }
}

const Edge = memo(({ edge }) => {
  const { x1, y1, dx1, dy1, x2, y2, dx2, dy2 } = useEdge(edge)

  const ddx = x1 === x2 ? 32 : 64 * Math.pow(Math.abs(x2 - x1), 1 / 3)
  const ddy = y1 === y2 ? 32 : 64 * Math.pow(Math.abs(y2 - y1), 1 / 3)

  return (
    <TransitionArrow
      key={edge.id}
      type={edge.type}
      x1={x1 * 32}
      y1={y1 * 32}
      dx1={dx1 * ddx}
      dy1={dy1 * ddy}
      x2={x2 * 32}
      y2={y2 * 32}
      dx2={dx2 * ddx}
      dy2={dy2 * ddy}
    />
  )
})

export default Edge
