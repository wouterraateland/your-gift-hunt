import { EDGE_TYPES } from "data"
import React, { useCallback, useState } from "react"
import styled from "styled-components"

import useEntityGraph from "hooks/useEntityGraph"
import useGameQueries from "hooks/useGameQueries"
import useEntityDependencies from "hooks/useEntityDependencies"
import useGameMutations from "hooks/useGameMutations"

import useAsync from "hooks/useAsync"

import { ActionButton, Button, Message, Options } from "your-gift-hunt/ui"
import { Bin } from "your-gift-hunt/icons"
import EntityTag from "components/Editor/EntityTag"
import StateTag from "components/Editor/StateTag"

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
    <EntityTag entity={data.entity}>
      {" "}
      <StateTag state={data.state} />
    </EntityTag>
    {isDeletable && (
      <ActionButton color="error" onClick={onDeleteClick}>
        <Bin />
      </ActionButton>
    )}
  </UnlockContainer>
)

const Unlocks = ({ from, to }) => {
  const { edges, nodes, getNodeById } = useEntityGraph()
  const { isUnlockable } = useGameQueries()
  const { getPreviousNodes } = useEntityDependencies()

  const {
    addUnlockToStateTransition,
    removeUnlockFromStateTransition
  } = useGameMutations()

  const unlocks = edges
    .filter(
      edge =>
        edge.type === EDGE_TYPES.UNLOCK &&
        edge.from === from.id &&
        (to ? edge.to === to.id : edge.to.endsWith("-exit"))
    )
    .map(({ unlocks }) => getNodeById(unlocks))

  const [optionsVisible, setOptionsVisibility] = useState(false)
  const [{ isLoading, error }, runAsync] = useAsync()

  if (error) {
    console.error(error)
  }

  const previousNodes = getPreviousNodes(from.id)
  const options = nodes.filter(
    node => isUnlockable(node) && !previousNodes.includes(node.id)
  )

  const addUnlock = useCallback(
    runAsync(id => addUnlockToStateTransition(from.id, to ? to.id : null, id)),
    [from, to]
  )

  const removeUnlock = useCallback(
    runAsync(id =>
      removeUnlockFromStateTransition(from.id, to ? to.id : null, id)
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
            <EntityTag entity={data.entity}>
              {" "}
              <StateTag state={data.state} />
            </EntityTag>
          )
        }}
        options={options.filter(
          ({ id, entity }) =>
            entity.states.every(state => state.id !== from.id) &&
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
        color="primary"
      >
        + Add unlock
      </Button>
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

export default Unlocks
