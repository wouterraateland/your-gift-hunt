import { NODE_TYPES } from "data"
import React, { useContext } from "react"

import GameContext from "contexts/Game"

import Section from "components/Editor/DetailPane/Section"
import TransitionWithRequirements from "./TransitionWithRequirements"

const OutgoingTransitions = ({ node }) => {
  const { getNodeById } = useContext(GameContext)

  const outgoingTransitions = node.state.outgoingTransitions.map(
    outgoingTransition => ({
      ...outgoingTransition,
      from: node,
      to: getNodeById(
        outgoingTransition.to
          ? outgoingTransition.to.id
          : `${node.entity.id}-${NODE_TYPES.EXIT}`
      )
    })
  )

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
