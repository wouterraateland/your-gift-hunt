import { EDGE_TYPES } from "data"
import React, { memo, useContext } from "react"

import GameContext from "contexts/Game"

import TransitionArrow from "./TransitionArrow"

const Edge = memo(({ id, type, from, to, unlocks }) => {
  const { getNodePosition } = useContext(GameContext)

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
    case EDGE_TYPES.INFO:
    case EDGE_TYPES.USE:
      const e = fromPosition.left === toPosition.left
      const d = e ? 0 : fromPosition.left < toPosition.left ? 1 : -1
      return (
        <TransitionArrow
          key={id}
          x1={fromPosition.left + 96 + 96 * d - 96 * e}
          y1={fromPosition.top + 48}
          x2={toPosition.left + 96 - 96 * d - 96 * e}
          y2={toPosition.top + 48}
          type={type}
        />
      )
    case EDGE_TYPES.ENTRY:
      return (
        <TransitionArrow
          key={id}
          x1={fromPosition.left + 96}
          y1={fromPosition.top + 112}
          x2={toPosition.left + 96}
          y2={toPosition.top}
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
})

export default Edge
