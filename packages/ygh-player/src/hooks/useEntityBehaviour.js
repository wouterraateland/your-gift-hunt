import { useCallback, useRef } from "react"

import useGame from "hooks/useGame"
import useScreen from "hooks/useScreen"
import useDrop from "hooks/useDrop"
import { createInputAction } from "ygh-sdk"

import Screens from "components/screens"

const useEntityBehaviour = (props, options = {}) => {
  const ref = useRef(null)
  const { dispatchAction, isInInventory, pickupEntity } = useGame()
  const { popup, close } = useScreen()

  useDrop({
    ref,
    sources: props.useSources,
    destination: props.state,
    onDrop: options.onDrop
  })

  const dispatchInputAction = useCallback(
    async (state, key, value) => {
      if (state) {
        const gameState = await dispatchAction(
          createInputAction(state, key ? [{ key, value }] : [])
        )
        options.onInput && options.onInput(gameState)
      }
    },
    [dispatchAction, options.onInput]
  )

  const inspect = useCallback(
    () => popup(options.detailScreen || Screens.SingleDetail, props.id),
    [(options.detailScreen, props.id)]
  )

  const closeInspector = close

  return props.isReachable && props.isItem && !isInInventory(props.id)
    ? {
        ref,
        dispatchInputAction,
        inspect,
        closeInspector,
        onMouseDownCapture: event => {
          event.stopPropagation()
          event.preventDefault()
          pickupEntity(props.id)
        }
      }
    : { ref, dispatchInputAction, inspect, closeInspector }
}

export default useEntityBehaviour
