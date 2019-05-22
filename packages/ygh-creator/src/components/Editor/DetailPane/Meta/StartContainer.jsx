import React, { useCallback } from "react"

import useGame from "hooks/useGame"
import useGameMutations from "hooks/useGameMutations"
import useAsync from "hooks/useAsync"

import { Button, Message } from "your-gift-hunt/ui"

const Container = ({ entity }) => {
  const {
    game: { startContainer }
  } = useGame()
  const { setStartContainer } = useGameMutations
  const [{ error, isLoading }, runAsync] = useAsync()

  const handleOnClick = useCallback(
    runAsync(() => setStartContainer(entity.id)),
    [entity.id]
  )

  const isStartContainer = startContainer && startContainer.id === entity.id

  return isStartContainer ? (
    <em>This container is the current start environment</em>
  ) : (
    <>
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
