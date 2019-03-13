import { NODE_TYPES } from "data"
import React, { useContext } from "react"

import GameContext from "contexts/Game"
import EntitiesContext from "contexts/Entities"

import Section from "components/Editor/DetailPane/Section"
import TransitionWithRequirements from "./TransitionWithRequirements"

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
    <Section title="Transitions" wrapChildren>
      {outgoingTransitions.map(transition => (
        <TransitionWithRequirements
          key={[transition.from.id, transition.to.id]}
          {...transition}
        />
      ))}
    </Section>
  ) : null
}

export default OutgoingTransitions
