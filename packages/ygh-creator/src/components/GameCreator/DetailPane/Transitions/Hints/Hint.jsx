import React from "react"
import styled from "styled-components"

import useGameMutations from "hooks/useGameMutations"

import { ActionButton, Float } from "ygh-ui"
import { Bin, Pen } from "ygh-icons"

const Text = styled.span`
  display: inline-block;
  max-width: calc(100% - 3.5em);
`

const Delay = styled.em`
  font-size: smaller;
`

const Hint = ({ hint: { id, text, delay }, onEditClick }) => {
  const { deleteHint } = useGameMutations()

  return (
    <>
      <Float.Right>
        <ActionButton color="error" onClick={() => deleteHint(id)}>
          <Bin />
        </ActionButton>
        <ActionButton onClick={onEditClick}>
          <Pen />
        </ActionButton>
      </Float.Right>
      <Text>{text}</Text>
      <br />
      <Delay>After {delay}s</Delay>{" "}
    </>
  )
}

export default Hint
