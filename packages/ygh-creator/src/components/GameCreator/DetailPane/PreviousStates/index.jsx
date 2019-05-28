import React from "react"

import useGameQueries from "hooks/useGameQueries"
import useGameTemplates from "hooks/useGameTemplates"

import Section from "components/Section"
import StateTagList from "components/GameCreator/DetailPane/StateTagList"

import EditablePrevStates from "./Editable"

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

  return prevStateTemplates.length ? (
    <Section title="Previous states">
      <StateTagList states={prevStates} connector={" or "} />
      {prevStates.length < prevStateTemplates.length && (
        <EditablePrevStates
          state={state}
          prevStates={prevStates}
          prevStateTemplates={prevStateTemplates}
        />
      )}
    </Section>
  ) : null
}

export default PreviousStates
