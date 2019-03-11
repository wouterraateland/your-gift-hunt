import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useContext, useState, useCallback } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { Paper, ActionButton, Button, Message } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"

import Options from "./Options"

import Transition from "./Transition"

const UnlockConditionContainer = styled.div`
  display: block;
  margin-bottom: .5em;

  &::before {
    content: ${props =>
      props.type === EDGE_TYPES.ENTRY ? '"\u2022"' : '"\u2192"'};

    margin-right: .5em;

    font-weight: bold;

    color: #39f;
  }
}),
`

const UnlockCondition = ({ data, isDeletable = true, onDeleteClick }) => (
  <UnlockConditionContainer type={data.from.type}>
    <Transition withEntity {...data} />
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockConditionContainer>
)

const DefaultUnlock = () => (
  <UnlockCondition
    data={{ from: { type: NODE_TYPES.ENTRY } }}
    isDeletable={false}
  />
)

const EditableUnlockConditions = ({ node }) => {
  const {
    edges,
    getEdgeById,
    getNodeById,
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition
  } = useContext(GameContext)

  const unlockConditions = edges
    .filter(({ unlocks }) => unlocks === node.id)
    .map(({ id }) => getEdgeById(id))

  const options = edges
    .filter(({ type }) =>
      [EDGE_TYPES.TRANSFORM, EDGE_TYPES.EXIT].includes(type)
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
        <DefaultUnlock />
      )}
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <Transition withEntity {...data} />
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

const UnlockConditions = ({ node }) => (
  <Paper>
    <Paper.Section>
      <Paper.Title size={3}>Unlocked when</Paper.Title>
      {node.instance.entity.isObject ? (
        <DefaultUnlock />
      ) : (
        <EditableUnlockConditions node={node} />
      )}
    </Paper.Section>
  </Paper>
)

const MaybeUnlockConditions = ({ node }) => {
  const { isUnlockable } = useContext(GameContext)

  return isUnlockable(node, true) && <UnlockConditions node={node} />
}

export default MaybeUnlockConditions
