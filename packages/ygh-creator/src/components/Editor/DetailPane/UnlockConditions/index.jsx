import React from "react"

import useGame from "hooks/useGame"

import Section from "components/Editor/DetailPane/Section"

import DefaultUnlockConditions from "./Default"
import EditableUnlockConditions from "./Editable"

const UnlockConditions = ({ node }) => {
  const { isUnlockable } = useGame()

  return isUnlockable(node, true) ? (
    <Section title="Unlock conditions">
      {node.entity.isObject ? (
        <DefaultUnlockConditions node={node} />
      ) : (
        <EditableUnlockConditions node={node} />
      )}
    </Section>
  ) : null
}

export default UnlockConditions
