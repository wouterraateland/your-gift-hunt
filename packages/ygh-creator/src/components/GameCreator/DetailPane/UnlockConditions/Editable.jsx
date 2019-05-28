import { EDGE_TYPES } from "data"
import React, { useState, useCallback } from "react"

import useEntityGraph from "hooks/useEntityGraph"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameQueries from "hooks/useGameQueries"
import useGameMutations from "hooks/useGameMutations"

import useAsync from "hooks/useAsync"

import { Button, Message, Options, VSpace } from "your-gift-hunt/ui"

import EntityTag from "components/Primitives/EntityTag"
import Transition from "components/Primitives/Transition"

import DefaultUnlockConditions from "./Default"
import UnlockCondition from "./UnlockCondition"

const EditableUnlockConditions = ({ entity, state }) => {
  const { edges, getEdgeById } = useEntityGraph()
  const { getNextNodes } = useEntityDependencies()
  const { getStateById, getEntityByStateId } = useGameQueries()
  const {
    addUnlockToStateTransition,
    removeUnlockFromStateTransition
  } = useGameMutations()

  const unlockConditions = edges
    .filter(({ unlocks }) => unlocks === state.id)
    .map(({ from, to, ...edge }) => ({
      ...edge,
      entity: getEntityByStateId(from),
      from: getStateById(from),
      to: getStateById(to)
    }))

  const nextNodes = getNextNodes(state.id)
  const options = edges
    .filter(
      ({ from, type }) =>
        [EDGE_TYPES.TRANSFORM, EDGE_TYPES.EXIT].includes(type) &&
        !nextNodes.includes(from)
    )
    .map(({ from, to, ...edge }) => ({
      ...edge,
      entity: getEntityByStateId(from),
      from: getStateById(from),
      to: getStateById(to)
    }))
    .filter(
      edge =>
        edge.entity.id !== entity.id &&
        unlockConditions.every(unlockCondition =>
          edge.entity.states.every(({ id }) => id !== unlockCondition.from.id)
        )
    )

  const [optionsVisible, setOptionsVisibility] = useState(false)
  const [{ isLoading, error }, runAsync] = useAsync()

  const addUnlockCondition = useCallback(
    runAsync(id => {
      const edge = getEdgeById(id)
      return addUnlockToStateTransition(
        edge.from,
        edge.to.endsWith("-exit") ? null : edge.to,
        state.id
      )
    }),
    [state, edges]
  )

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

  const onAddButtonClick = useCallback(() => setOptionsVisibility(true), [])
  const onOptionsClose = useCallback(() => setOptionsVisibility(false), [])
  const onOptionClick = useCallback(id => addUnlockCondition(id), [
    addUnlockCondition
  ])

  if (error) {
    console.error(error)
  }

  return (
    <>
      {unlockConditions.length ? (
        unlockConditions.map(unlockCondition => (
          <UnlockCondition
            key={unlockCondition.id}
            {...unlockCondition}
            onDeleteClick={() => removeUnlockCondition(unlockCondition.id)}
          />
        ))
      ) : (
        <DefaultUnlockConditions entity={entity} />
      )}
      <VSpace.Small />
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => (
            <EntityTag entity={data.entity}>
              <Transition from={data.from} to={data.to} />
            </EntityTag>
          )
        }}
        options={options}
        onClose={onOptionsClose}
        onOptionClick={onOptionClick}
        isVisible={optionsVisible}
      />
      <Button
        disabled={isLoading}
        onClick={onAddButtonClick}
        size="small"
        importance="primary"
        color="primary"
      >
        + Add condition
      </Button>
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

export default EditableUnlockConditions
