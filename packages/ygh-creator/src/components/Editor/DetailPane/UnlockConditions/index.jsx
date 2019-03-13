import React, { useContext } from "react"

import GameContext from "contexts/Game"

import Section from "components/Editor/DetailPane/Section"

import DefaultUnlockConditions from "./Default"
import EditableUnlockConditions from "./Editable"

const UnlockConditions = ({ node }) => {
  const { isUnlockable } = useContext(GameContext)

  return isUnlockable(node, true) ? (
    <Section title="Unlock conditions">
      {node.instance.entity.isObject ? (
        <DefaultUnlockConditions node={node} />
      ) : (
        <EditableUnlockConditions node={node} />
      )}
    </Section>
  ) : null
}

export default UnlockConditions
