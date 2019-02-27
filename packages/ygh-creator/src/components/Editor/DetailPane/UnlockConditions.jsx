import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useContext } from "react"

import GameContext from "contexts/Game"

import { Paper } from "your-gift-hunt/ui"
import ListItem from "./ListItem"
import Transition from "./Transition"

const Unlocks = ({ unlocks }) =>
  unlocks.map(({ from, to }, i) => (
    <ListItem
      key={i}
      type={
        from.type === NODE_TYPES.ENTRY ? EDGE_TYPES.ENTRY : EDGE_TYPES.UNLOCK
      }
    >
      {i !== 0 && " and "}
      {from.type === NODE_TYPES.ENTRY ? (
        "Game starts"
      ) : (
        <Transition withEntity from={from} to={to} />
      )}
    </ListItem>
  ))

const UnlockConditions = ({ node }) => {
  const { edges, getNodeById } = useContext(GameContext)

  const unlocks = edges
    .filter(
      ({ unlocks, type, to }) =>
        unlocks === node.id || (type === NODE_TYPES.ENTRY && to === node.id)
    )
    .map(({ from, to }) => ({
      from: getNodeById(from),
      to: getNodeById(to)
    }))

  return unlocks.length ? (
    <Paper>
      <Paper.Section>
        <Paper.Title size={3}>Unlocked when</Paper.Title>
        <Unlocks unlocks={unlocks} />
      </Paper.Section>
    </Paper>
  ) : null
}

export default UnlockConditions
