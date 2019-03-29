import React, { useContext, useState } from "react"
import styled from "styled-components"

import GameContext from "contexts/Game"

import useAsync from "hooks/useAsync"

import { Button, Message, Options } from "your-gift-hunt/ui"
import StateTag from "components/Editor/StateTag"

const VSpace = styled.div`
  margin-bottom: 0.5em;
`

const EditablePrevStates = ({ node, prevNodes, prevStateTemplates }) => {
  const { addPreviousState } = useContext(GameContext)
  const [{ isLoading, error }, runAsync] = useAsync()
  const [optionsVisible, setOptionsVisibility] = useState(false)

  const options = prevStateTemplates.filter(({ id }) =>
    prevNodes.every(node => node.state.template.id !== id)
  )
  const onOptionClick = runAsync(stateTemplateId =>
    addPreviousState(stateTemplateId, node.id)
  )

  if (error) {
    console.error(error)
  }

  const onOptionsClose = () => setOptionsVisibility(false)
  const onAddButtonClick = () => setOptionsVisibility(true)

  const hasUnlocks = node.state.unlockedBy.length > 0

  return (
    <>
      <VSpace />
      <Options
        closeOnClick
        components={{
          Option: ({ data }) => <StateTag name={data.name} />
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
        color="accent"
      >
        + Add previous state
      </Button>
      {error && <Message.Error>{error.message}</Message.Error>}
    </>
  )
}

export default EditablePrevStates
