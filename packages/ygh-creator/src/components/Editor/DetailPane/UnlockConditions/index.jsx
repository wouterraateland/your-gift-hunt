import React from "react"

import useGameQueries from "hooks/useGameQueries"
import useEntityGraph from "hooks/useEntityGraph"

import Section from "components/Editor/DetailPane/Section"

import DefaultUnlockConditions from "./Default"
import EditableUnlockConditions from "./Editable"

const UnlockConditions = ({ entity, state }) => {
  const { isUnlockable } = useGameQueries()
  const { getStateNodes } = useEntityGraph()

  return isUnlockable(state) ||
    (entity.isObject && state.id === getStateNodes(entity.id)[0].id) ? (
    <Section title="Unlock conditions">
      {entity.isObject ? (
        <DefaultUnlockConditions entity={entity} state={state} />
      ) : (
        <EditableUnlockConditions entity={entity} state={state} />
      )}
    </Section>
  ) : null
}

export default UnlockConditions
