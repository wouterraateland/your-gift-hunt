import { NODE_TYPES, EDGE_TYPES } from "data"
import React, { useCallback, useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import { useApolloClient } from "react-apollo-hooks"
import useAsync from "hooks/useAsync"

import { ActionButton, Button } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"
import NodeTag from "../NodeTag"
import ClickableNodeTag from "./ClickableNodeTag"
import Options from "./Options"

import { ENTITY_INSTANCE_STATE_TRANSITIONS } from "gql/queries"

const UnlockContainer = styled.div`
  display: block;
  margin-bottom: 0.5em;

  &::before {
    content: "\u2192";

    margin-right: 0.5em;

    font-weight: bold;

    color: #39f;
  }
`

const Unlock = ({ data, isDeletable = true, onDeleteClick }) => (
  <UnlockContainer>
    <ClickableNodeTag {...data} />
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockContainer>
)

const Em = styled.em`
  display: block;
  margin-bottom: 0.5em;
`

const Unlocks = ({ from, to }) => {
  const {
    edges,
    nodes,
    getNodeById,
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition,
    startTriggerStateTransition
  } = useContext(GameContext)

  const unlockEdges = edges.filter(
    edge =>
      edge.type === EDGE_TYPES.UNLOCK &&
      edge.from === from.id &&
      edge.to === to.id
  )

  const unlocks = unlockEdges.map(({ unlocks }) => getNodeById(unlocks))

  const client = useApolloClient()
  const [optionsVisible, setOptionsVisibility] = useState(false)
  const [{ isLoading }, runAsync] = useAsync()

  const options = nodes.filter(
    ({ id, instance, type }) =>
      type === NODE_TYPES.STATE &&
      !instance.entity.isObject &&
      !edges.some(({ type, to }) => type === EDGE_TYPES.TRANSFORM && to === id)
  )

  const addUnlock = useCallback(
    runAsync(async id => {
      if (!unlocks.find(unlock => unlock.id === id)) {
        const unlockConditions = edges.filter(({ unlocks }) => unlocks === id)

        if (unlockConditions.length === 0) {
          // If we add the first unlock condition to a node, remove the unlock condition from the start trigger
          await removeUnlockFromEntityInstanceStateTransition(
            startTriggerStateTransition.id,
            id
          )
        }

        const {
          data: { entityInstanceStateTransitions }
        } = await client.query({
          query: ENTITY_INSTANCE_STATE_TRANSITIONS,
          variables: { from: from.id, to: to.id }
        })

        await addUnlockToEntityInstanceStateTransition(
          entityInstanceStateTransitions[0].id,
          id
        )
      }
    }),
    [unlocks, from, to]
  )

  const removeUnlock = useCallback(
    runAsync(async id => {
      // if (unlocks.find(unlock => unlock.id === id)) {
      //   if (unlocks.length === 1) {
      //     // If we remove the only unlock condition, replace it with an unlock from a start trigger
      //     await addUnlockToEntityInstanceStateTransition(
      //       startTriggerStateTransition.id,
      //       node.state.id
      //     )
      //   }
      //
      //   const edge = getEdgeById(id)
      //   const {
      //     data: { entityInstanceStateTransitions }
      //   } = await client.query({
      //     query: ENTITY_INSTANCE_STATE_TRANSITIONS,
      //     variables: { from: edge.from.id, to: edge.to.id }
      //   })
      //
      //   await removeUnlockFromEntityInstanceStateTransition(
      //     entityInstanceStateTransitions[0].id,
      //     node.state.id
      //   )
      // }
    }),
    [edges, unlocks]
  )

  const onAddButtonClick = useCallback(() => setOptionsVisibility(true), [])
  const onOptionsClose = useCallback(() => setOptionsVisibility(false), [])
  const onOptionClick = useCallback(id => addUnlock(id), [addUnlock])

  return (
    <>
      {unlocks.length ? (
        unlocks.map(unlock => (
          <Unlock
            key={unlock.id}
            data={unlock}
            onDeleteClick={() => removeUnlock(unlock.id)}
          />
        ))
      ) : (
        <Em>Nothing</Em>
      )}
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <NodeTag {...data} />
        }}
        options={options.filter(
          ({ id, instance }) =>
            instance.id !== from.instance.id &&
            !unlocks.find(unlock => unlock.id === id)
        )}
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
        + Add unlock
      </Button>
    </>
  )
}

export default Unlocks
