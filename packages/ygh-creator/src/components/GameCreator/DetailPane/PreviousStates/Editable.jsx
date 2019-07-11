import React, { useState } from "react"

import useGameMutations from "hooks/useGameMutations"

import useAsync from "hooks/useAsync"

import { Button, Message, Options, VSpace } from "ygh-ui"
import StateTag from "components/Primitives/StateTag"

const EditablePrevStates = ({ state, prevStates, prevStateTemplates }) => {
  const { addPreviousState } = useGameMutations()
  const [{ isLoading, error }, runAsync] = useAsync()
  const [optionsVisible, setOptionsVisibility] = useState(false)

  const options = prevStateTemplates.filter(({ id }) =>
    prevStates.every(state => state.template.id !== id)
  )
  const onOptionClick = runAsync(stateTemplateId =>
    addPreviousState(stateTemplateId, state.id)
  )

  if (error) {
    console.error(error)
  }

  const onOptionsClose = () => setOptionsVisibility(false)
  const onAddButtonClick = () => setOptionsVisibility(true)

  const hasUnlocks = state.unlockedBy.length > 0

  return (
    <>
      <VSpace.Small />
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <StateTag state={data} />
        }}
        options={options}
        onClose={onOptionsClose}
        onOptionClick={onOptionClick}
        isVisible={optionsVisible}
      />
      <Button
        disabled={isLoading || hasUnlocks}
        onClick={onAddButtonClick}
        size="small"
        importance="primary"
        color="primary"
      >
        + Add previous state
      </Button>
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

export default EditablePrevStates
