import React from "react"
import styled from "styled-components"

import useGameMutations from "hooks/useGameMutations"

import { ActionButton } from "ygh-ui"
import { Bin, Pen } from "ygh-icons"

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`

const Text = styled.span`
  flex-grow: 1;
`

const Delay = styled.span`
  width: 2rem;
  flex-shrink: 0;
  color: ${props => props.theme.color.caption};
`

const Actions = styled.div`
  flex-shrink: 0;
`

const Hint = ({ hint: { id, text, delay }, onEditClick }) => {
  const { deleteHint } = useGameMutations()

  return (
    <Container>
      <Delay>{delay}s</Delay>
      <Text>{text}</Text>
      <Actions>
        <ActionButton color="error" onClick={() => deleteHint(id)}>
          <Bin />
        </ActionButton>
        <ActionButton onClick={onEditClick}>
          <Pen />
        </ActionButton>
      </Actions>
    </Container>
  )
}

export default Hint
