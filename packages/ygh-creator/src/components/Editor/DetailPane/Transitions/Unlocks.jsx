import { EDGE_TYPES } from "data"
import React, { useCallback, useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { ActionButton, Button, Message, Options } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"
import NodeTag from "components/Editor/NodeTag"

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

const Em = styled.em`
  display: block;
  margin-bottom: 0.5em;
`

const Unlock = ({ data, isDeletable = true, onDeleteClick }) => (
  <UnlockContainer>
    <NodeTag node={data} showEntity />
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockContainer>
)

const Unlocks = ({ from, to }) => {
  const {
    edges,
    nodes,
    getNodeById,
    isUnlockable,
    addUnlockToEntityInstanceStateTransition,
    removeUnlockFromEntityInstanceStateTransition,
    getPreviousNodes
  } = useContext(GameContext)

  const unlocks = edges
    .filter(
      edge =>
        edge.type === EDGE_TYPES.UNLOCK &&
        edge.from === from.id &&
        edge.to === to.id
    )
    .map(({ unlocks }) => getNodeById(unlocks))

  const [optionsVisible, setOptionsVisibility] = useState(false)
  const [{ isLoading, error }, runAsync] = useAsync()

  const previousNodes = getPreviousNodes(from.id)
  const options = nodes.filter(
    node => isUnlockable(node) && !previousNodes.includes(node.id)
  )

  const addUnlock = useCallback(
    runAsync(id =>
      addUnlockToEntityInstanceStateTransition(from.id, to.id, id)
    ),
    [from, to]
  )

  const removeUnlock = useCallback(
    runAsync(id =>
      removeUnlockFromEntityInstanceStateTransition(from.id, to.id, id)
    ),
    [from, to]
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
          Option: ({ data }) => (
            <NodeTag node={data} showEntity isClickable={false} />
          )
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
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

export default Unlocks
