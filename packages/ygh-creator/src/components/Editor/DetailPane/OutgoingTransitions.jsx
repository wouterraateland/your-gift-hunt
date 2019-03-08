import { NODE_TYPES } from "data"
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
  const { getNodeById } = useContext(GameContext)
  const { getEntityStateById } = useContext(EntitiesContext)

  const getRequiredActions = (from, to) =>
    getEntityStateById(from.state.state.id).outgoingTransitions.find(
      outgoingTransition =>
        to.state === null
          ? outgoingTransition.to === null
          : outgoingTransition.to &&
            outgoingTransition.to.id === to.state.state.id
    ).requiredActions

  const outgoingTransitions = node.state.outgoingTransitions
    .map(({ to }) =>
      getNodeById(to ? to.id : `${node.instance.id}-${NODE_TYPES.EXIT}`)
    )
    .map(to => ({
      from: node,
      to,
      requiredActions: getRequiredActions(node, to).map(
        ({ hints, ...actionRequirement }) => ({
          ...actionRequirement,
          defaultHints: hints,
          customHints: node.instance.hints.filter(
            hint => hint.actionRequirement.id === actionRequirement.id
          )
        })
      )
    }))

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
