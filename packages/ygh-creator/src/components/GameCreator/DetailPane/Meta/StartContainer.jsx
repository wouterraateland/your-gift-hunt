import React, { useCallback } from "react"
import styled from "styled-components"

import useGame from "hooks/useGame"
import useGameMutations from "hooks/useGameMutations"
import { useAsync } from "ygh-hooks"

import { Button, Message, VSpace } from "ygh-ui"

const Start = styled.span`
  padding: 0 0.25rem;
  border-radius: ${props => props.theme.borderRadius};

  background-color: ${props => props.theme.color.emphasis};
  color: #fff;
`

const Container = ({ entity }) => {
  const {
    game: { startContainer }
  } = useGame()
  const { setStartContainer } = useGameMutations()
  const [{ error, isLoading }, runAsync] = useAsync()

  const handleOnClick = useCallback(
    runAsync(() => setStartContainer(entity.id)),
    [entity.id]
  )

  const isStartContainer = startContainer && startContainer.id === entity.id

  return isStartContainer ? (
    <>
      <VSpace.Medium />
      <em>
        This container is the current <Start>start</Start> environment
      </em>
    </>
  ) : (
    <>
      <VSpace.Medium />
      <Button
        onClick={handleOnClick}
        color="primary"
        importance="primary"
        size="small"
        isDisabled={isStartContainer || isLoading}
      >
        Make start environment
      </Button>
      {error && <Message.Error>{error}</Message.Error>}
    </>
  )
}

export default Container
