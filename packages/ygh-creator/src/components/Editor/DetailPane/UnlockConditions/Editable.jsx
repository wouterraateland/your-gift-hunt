import { EDGE_TYPES } from "data"
import React, { useContext, useState, useCallback } from "react"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { Button, Message, Options } from "your-gift-hunt/ui"

import Transition from "components/Editor/Transition"

import DefaultUnlockConditions from "./Default"
import UnlockCondition from "./UnlockCondition"

const EditableUnlockConditions = ({ node }) => {
  const {
    edges,
    getEdgeById,
    getNodeById,
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition,
    getNextNodes
  } = useContext(GameContext)

  const unlockConditions = edges
    .filter(({ unlocks }) => unlocks === node.id)
    .map(({ id }) => getEdgeById(id))

  const nextNodes = getNextNodes(node.id)
  const options = edges
    .filter(
      ({ from, type }) =>
        [EDGE_TYPES.TRANSFORM, EDGE_TYPES.EXIT].includes(type) &&
        !nextNodes.includes(from)
    )
    .map(({ from, to, ...edge }) => ({
      ...edge,
      from: getNodeById(from),
      to: getNodeById(to)
    }))
    .filter(
      ({ from }) =>
        from.instance.id !== node.instance.id &&
        !unlockConditions.some(
          unlockCondition =>
            unlockCondition.from.instance.id === from.instance.id
        )
    )

  const [optionsVisible, setOptionsVisibility] = useState(false)
  const [{ isLoading, error }, runAsync] = useAsync()

  const addUnlockCondition = useCallback(
    runAsync(id => {
      const edge = getEdgeById(id)
      return addUnlockToEntityInstanceStateTransition(
        edge.from.id,
        edge.to.id,
        node.state.id
      )
    }),
    [node, edges]
  )

  const removeUnlockCondition = useCallback(
    runAsync(id => {
      const edge = getEdgeById(id)
      return removeUnlockFromEntityInstanceStateTransition(
        edge.from.id,
        edge.to.id,
        node.state.id
      )
    }),
    [node, edges]
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
            data={unlockCondition}
            onDeleteClick={() => removeUnlockCondition(unlockCondition.id)}
          />
        ))
      ) : (
        <DefaultUnlockConditions />
      )}
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <Transition {...data} />
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
        color="accent"
      >
        + Add condition
      </Button>
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

export default EditableUnlockConditions
