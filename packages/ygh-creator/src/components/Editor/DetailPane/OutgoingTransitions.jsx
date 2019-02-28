import React, { useContext } from "react"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import { Paper } from "your-gift-hunt/ui"
import TransitionWithRequirements from "./TransitionWithRequirements"

const TransitionList = ({ transitions }) =>
  transitions.map(transition => (
    <Paper.Section key={[transition.from.id, transition.to.id]}>
      <TransitionWithRequirements {...transition} />
    </Paper.Section>
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
    <>
      <h4>Transitions</h4>
      <Paper>
        <TransitionList transitions={outgoingTransitions} />
      </Paper>
    </>
  ) : null
}

export default OutgoingTransitions
