import React from "react"

import useGameQueries from "hooks/useGameQueries"
import useTemplates from "hooks/useTemplates"

import Section from "components/Editor/DetailPane/Section"
import StateTagList from "components/Editor/DetailPane/StateTagList"

import EditablePrevStates from "./Editable"

const PreviousStates = ({ state }) => {
  const { getStateById } = useGameQueries()
  const { getStateTemplateById } = useTemplates()

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
