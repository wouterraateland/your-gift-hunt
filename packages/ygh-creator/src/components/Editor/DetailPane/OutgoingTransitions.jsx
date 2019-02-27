import React, { useContext } from "react"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import { Paper } from "your-gift-hunt/ui"
import TransitionWithRequirements from "./TransitionWithRequirements"

const TransitionList = ({ transitions }) =>
  transitions.map(transition => (
    <TransitionWithRequirements
      key={[transition.from.id, transition.to.id]}
      {...transition}
    />
  ))

const OutgoingTransitions = ({ node }) => {
  const { getNodeByInstanceAndState } = useContext(GameContext)
  const { getEntityStateById } = useContext(EntitiesContext)

  const entityState = getEntityStateById(node.state.state.id)
  const outgoingTransitions = entityState.outgoingTransitions.map(
    transition => ({
      from: node,
      to: getNodeByInstanceAndState(node.instance, transition.to),
      requiredActions: transition.requiredActions
    })
  )

  return outgoingTransitions.length ? (
    <Paper>
      <Paper.Section>
        <Paper.Title size={3}>Transitions</Paper.Title>
        <TransitionList transitions={outgoingTransitions} />
      </Paper.Section>
    </Paper>
  ) : null
}

export default OutgoingTransitions
