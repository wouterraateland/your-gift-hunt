import React from "react"

import useGameQueries from "hooks/useGameQueries"
import useGameTemplates from "hooks/useGameTemplates"

import Section from "components/Section"
import StateTagList from "components/GameCreator/DetailPane/StateTagList"

import AddPrevState from "./AddPrevState"

const PreviousStates = ({ state }) => {
  const { getStateById } = useGameQueries()
  const { getStateTemplateById } = useGameTemplates()

  const prevStates = state.incomingTransitions.map(({ from }) =>
    getStateById(from.id)
  )

  const stateTemplate = getStateTemplateById(state.template.id)
  const prevStateTemplates = stateTemplate.incomingTransitions.map(({ from }) =>
    getStateTemplateById(from.id)
  )

  const actions =
    prevStates.length < prevStateTemplates.length ? (
      <AddPrevState
        state={state}
        prevStates={prevStates}
        prevStateTemplates={prevStateTemplates}
      />
    ) : null

  return prevStateTemplates.length ? (
    <Section actions={actions} title="Previous states">
      <StateTagList states={prevStates} connector={" or "} />
    </Section>
  ) : null
}

export default PreviousStates
