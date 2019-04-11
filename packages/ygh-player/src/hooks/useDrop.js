import { useEffect, useContext } from "react"
import { createUseAction } from "ygh-player"
import _ from "utils"

import DragContext from "contexts/Drag"
import GameContext from "contexts/Game"

const isChildOrSame = (element, parent) =>
  !!element &&
  (element === parent || isChildOrSame(element.parentElement, parent))

const targets = (event, target) => {
  const cursor = event.changedTouches ? event.changedTouches[0] : event
  const touchTarget = document.elementFromPoint(cursor.clientX, cursor.clientY)

  return isChildOrSame(touchTarget, target)
}

const useDrop = ({ ref, destination, sources = [], onDrop = _.noop }) => {
  const { data, enableDrop } = useContext(DragContext)
  const { dispatchAction } = useContext(GameContext)

  const handleMouseMove = enableDrop

  const handleTouchMove = event =>
    targets(event, ref.current) && handleMouseMove(event)

  const handleTouchEnd = event =>
    targets(event, ref.current) && handleDrop(event)

  const handleDrop = async () =>
    onDrop(await dispatchAction(createUseAction(data.state, destination)))

  useEffect(() => {
    if (
      data &&
      data.state &&
      destination &&
      (sources.some(source => source.id === data.state.id) ||
        data.useDestinations.some(({ id }) => id === destination.id))
    ) {
      ref.current.setAttribute("can-drop", true)

      window.addEventListener("touchmove", handleTouchMove)
      document.documentElement.addEventListener("touchend", handleTouchEnd)
      document.documentElement.addEventListener("touchcancel", handleTouchEnd)
      ref.current.addEventListener("mousemove", handleMouseMove)
      ref.current.addEventListener("mouseup", handleDrop, false)

      return () => {
        window.removeEventListener("touchmove", handleTouchMove)
        document.documentElement.removeEventListener("touchend", handleTouchEnd)
        document.documentElement.removeEventListener(
          "touchcancel",
          handleTouchEnd
        )
        ref.current.removeEventListener("mousemove", handleMouseMove)
        ref.current.removeEventListener("mouseup", handleDrop, false)
      }
    }
  }, [data, sources])
}

export default useDrop
