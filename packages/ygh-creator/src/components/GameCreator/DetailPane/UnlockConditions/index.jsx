import React from "react"

import useGameQueries from "hooks/useGameQueries"
import useEntityGraph from "hooks/useEntityGraph"

import Section from "components/Section"

import DefaultUnlockConditions from "./Default"
import EditableUnlockConditions from "./Editable"
import EditAction from "./EditAction"

const UnlockConditions = ({ entity, state }) => {
  const { isUnlockable } = useGameQueries()
  const { getStateNodes } = useEntityGraph()

  const stateNodes = getStateNodes(entity.id)

  const actions = entity.isObject ? null : (
    <EditAction entity={entity} state={state} />
  )

  return stateNodes.length &&
    (isUnlockable(state) ||
      (entity.isObject && state.id === stateNodes[0].id)) ? (
    <Section actions={actions} title="Unlock conditions">
      {entity.isObject ? (
        <DefaultUnlockConditions entity={entity} state={state} />
      ) : (
        <EditableUnlockConditions entity={entity} state={state} />
      )}
    </Section>
  ) : null
}

export default UnlockConditions
