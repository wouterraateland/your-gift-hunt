import React from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"

import { ActionButton, Float } from "your-gift-hunt/ui"
import { Bin, Pen } from "your-gift-hunt/icons"

const Text = styled.span`
  display: inline-block;
  max-width: calc(100% - 3.5em);
`

const Delay = styled.em`
  font-size: smaller;
`

const Hint = ({ hint: { id, text, delay }, onEditClick }) => {
  const { deleteHint } = useGame()

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
