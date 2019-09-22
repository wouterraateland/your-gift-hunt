import React, { useCallback } from "react"

import useEntityGraph from "hooks/useEntityGraph"
import useGameQueries from "hooks/useGameQueries"
import useGameMutations from "hooks/useGameMutations"

import { useAsync } from "ygh-hooks"

import DefaultUnlockConditions from "./Default"
import UnlockCondition from "./UnlockCondition"

const EditableUnlockConditions = ({ entity, state }) => {
  const { edges, getEdgeById } = useEntityGraph()
  const { getStateById, getEntityByStateId } = useGameQueries()
  const { removeUnlockFromStateTransition } = useGameMutations()

  const unlockConditions = edges
    .filter(({ unlocks }) => unlocks === state.id)
    .map(({ from, to, ...edge }) => ({
      ...edge,
      entity: getEntityByStateId(from),
      from: getStateById(from),
      to: getStateById(to)
    }))

  const [{ error }, runAsync] = useAsync()

  const removeUnlockCondition = useCallback(
    runAsync(id => {
      const edge = getEdgeById(id)
      return removeUnlockFromStateTransition(
        edge.from,
        edge.to.endsWith("-exit") ? null : edge.to,
        state.id
      )
    }),
    [state, edges]
  )

  if (error) {
    console.error(error)
  }

  return unlockConditions.length ? (
    unlockConditions.map(unlockCondition => (
      <UnlockCondition
        key={unlockCondition.id}
        {...unlockCondition}
        onDeleteClick={() => removeUnlockCondition(unlockCondition.id)}
      />
    ))
  ) : (
    <DefaultUnlockConditions entity={entity} />
  )
}

export default EditableUnlockConditions
