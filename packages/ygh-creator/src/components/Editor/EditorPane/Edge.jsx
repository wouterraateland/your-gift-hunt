import React from "react"
import TransitionArrow from "./TransitionArrow"

import { EDGE_TYPES } from "data"

const Edge = ({ id, type, from, to, unlocks, getNodePosition }) => {
  const fromPosition = getNodePosition(from)
  const toPosition = to
    ? getNodePosition(to)
    : { x: fromPosition.x, y: fromPosition.y + 32 }
  const unlocksPosition = getNodePosition(unlocks)

  switch (type) {
    case EDGE_TYPES.UNLOCK:
      return (
        <TransitionArrow
          key={id}
          x1={(fromPosition.left + 96 + toPosition.left + 96) / 2}
          y1={(fromPosition.top + 96 + toPosition.top) / 2}
          x2={unlocksPosition.left + 96}
          y2={unlocksPosition.top}
          type={type}
        />
      )
    default:
      return (
        <TransitionArrow
          key={id}
          x1={fromPosition.left + 96}
          y1={fromPosition.top + 96}
          x2={toPosition.left + 96}
          y2={toPosition.top}
          type={type}
        />
      )
  }
}

export default Edge
