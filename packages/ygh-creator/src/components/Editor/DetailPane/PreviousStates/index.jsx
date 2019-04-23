import React from "react"

import useGame from "hooks/useGame"
import useTemplates from "hooks/useTemplates"

import Section from "components/Editor/DetailPane/Section"

import StateTagList from "./StateTagList"
import EditablePrevStates from "./Editable"

const PreviousStates = ({ node }) => {
  const { getNodeById } = useGame()
  const { getStateTemplateById } = useTemplates()

  const prevNodes = node.state.incomingTransitions.map(({ from }) =>
    getNodeById(from.id)
  )

  const stateTemplate = getStateTemplateById(node.state.template.id)
  const prevStateTemplates = stateTemplate.incomingTransitions.map(({ from }) =>
    getStateTemplateById(from.id)
  )

  return prevStateTemplates.length ? (
    <Section title="Previous states">
      <StateTagList nodes={prevNodes} connector={" or "} />
      {prevNodes.length < prevStateTemplates.length && (
        <EditablePrevStates
          node={node}
          prevNodes={prevNodes}
          prevStateTemplates={prevStateTemplates}
        />
      )}
    </Section>
  ) : null
}

export default PreviousStates
