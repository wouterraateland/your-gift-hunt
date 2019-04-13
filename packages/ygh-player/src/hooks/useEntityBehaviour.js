import { useCallback, useRef } from "react"

import useGame from "hooks/useGame"
import useScreen from "hooks/useScreen"
import useDrop from "hooks/useDrop"
import { createInputAction } from "ygh-player"

const useEntityBehaviour = (props, options = {}) => {
  const ref = useRef(null)
  const { dispatchAction } = useGame()
  const { popup } = useScreen()

  useDrop({
    ref,
    sources: props.useSources,
    destination: props.state,
    onDrop: options.onDrop
  })

  const dispatchInputAction = useCallback(
    async (key, value) => {
      if (props.state) {
        const gameState = await dispatchAction(
          createInputAction(props.state, [{ key, value }])
        )
        options.onInput && options.onInput(gameState)
      }
    },
    [dispatchAction, props.state, options.onInput]
  )

  const inspect = useCallback(
    () =>
      options.detailScreen &&
      popup(options.detailScreen, { entityId: props.id }),
    [(options.detailScreen, props.id)]
  )

  return {
    ref,
    dispatchInputAction,
    inspect,
    state: props.state ? props.state.name : null
  }
}

export default useEntityBehaviour
