import React from "react"

import useGameQueries from "hooks/useGameQueries"

import Section from "components/Editor/DetailPane/Section"
import TransitionWithRequirements from "./TransitionWithRequirements"

const OutgoingTransitions = ({ state }) => {
  const { getStateById } = useGameQueries()
  const outgoingTransitions = state.outgoingTransitions.map(
    outgoingTransition => ({
      ...outgoingTransition,
      from: state,
      to: outgoingTransition.to ? getStateById(outgoingTransition.to.id) : null
    })
  )

  return outgoingTransitions.length ? (
    <Section title="Transitions" wrapChildren>
      {outgoingTransitions.map(transition => (
        <TransitionWithRequirements key={transition.to} {...transition} />
      ))}
    </Section>
  ) : null
}

export default OutgoingTransitions
