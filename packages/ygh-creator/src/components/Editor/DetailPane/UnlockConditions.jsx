import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useContext, useState, useCallback } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import { useApolloClient } from "react-apollo-hooks"
import useAsync from "hooks/useAsync"

import { ENTITY_INSTANCE_STATE_TRANSITIONS } from "gql/queries"

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
    startTriggerStateTransition,
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition,
    createEntityInstanceStateTransition
  } = useContext(GameContext)

  const client = useApolloClient()

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
    runAsync(async id => {
      if (
        !unlockConditions.find(unlockCondition => unlockCondition.id === id)
      ) {
        // if (unlockConditions.length === 0) {
        //   // If we add the first unlock condition, remove the unlock condition from the start trigger
        //   await removeUnlockFromEntityInstanceStateTransition(
        //     startTriggerStateTransition.id,
        //     node.state.id
        //   )
        // }

        const edge = getEdgeById(id)
        const {
          data: { entityInstanceStateTransitions }
        } = await client.query({
          query: ENTITY_INSTANCE_STATE_TRANSITIONS,
          variables: { from: edge.from.id, to: edge.to.id }
        })

        await (entityInstanceStateTransitions.length
          ? addUnlockToEntityInstanceStateTransition(
              entityInstanceStateTransitions[0].id,
              node.state.id
            )
          : createEntityInstanceStateTransition(
              edge.from.id,
              edge.to.id,
              node.state.id
            ))
      }
    }),
    [edges, unlockConditions]
  )

  const removeUnlockCondition = useCallback(
    runAsync(async id => {
      if (unlockConditions.find(unlockCondition => unlockCondition.id === id)) {
        // if (unlockConditions.length === 1) {
        //   // If we remove the only unlock condition, replace it with an unlock from a start trigger
        //   await addUnlockToEntityInstanceStateTransition(
        //     startTriggerStateTransition.id,
        //     node.state.id
        //   )
        // }

        const edge = getEdgeById(id)
        const {
          data: { entityInstanceStateTransitions }
        } = await client.query({
          query: ENTITY_INSTANCE_STATE_TRANSITIONS,
          variables: { from: edge.from.id, to: edge.to.id }
        })

        await removeUnlockFromEntityInstanceStateTransition(
          entityInstanceStateTransitions[0].id,
          node.state.id
        )
      }
    }),
    [edges, unlockConditions]
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
  const { edges } = useContext(GameContext)

  return !edges.some(
    ({ type, to }) => type === EDGE_TYPES.TRANSFORM && to === node.id
  ) ||
    (node.instance.entity.defaultState &&
      node.state.state.id === node.instance.entity.defaultState.id) ? (
    <UnlockConditions node={node} />
  ) : null
}

export default MaybeUnlockConditions
