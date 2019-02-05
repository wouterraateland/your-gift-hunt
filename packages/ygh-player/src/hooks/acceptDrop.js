import { useEffect, useContext } from "react"
import { createUseAction } from "actions/creators"
import _ from "utils"

import DragContext from "contexts/Drag"
import GameContext from "contexts/Game"

const isChildOrSame = (element, parent) =>
  element &&
  (element === parent || isChildOrSame(element.parentElement, parent))

const targets = (event, target) => {
  const cursor = event.changedTouches ? event.changedTouches[0] : event
  const touchTarget = document.elementFromPoint(cursor.clientX, cursor.clientY)

  return isChildOrSame(touchTarget, target)
}

const acceptDrop = ({
  element,
  instance,
  items,
  onDropActionPerformed = _.noop
}) => {
  const { data, enableDrop } = useContext(DragContext)
  const { dispatchAction } = useContext(GameContext)

  useEffect(() => {
    if (
      items.some(
        ({ item, target }) =>
          _.hasState(item.stateName)(data) &&
          _.hasState(target.stateName)(instance)
      )
    ) {
      const handleMouseMove = enableDrop

      const handleTouchMove = event =>
        targets(event, element.current) && handleMouseMove(event)

      const handleTouchEnd = event =>
        targets(event, element.current) && handleDrop(event)

      const handleDrop = async () =>
        onDropActionPerformed(
          await dispatchAction(createUseAction(instance.id, data.id))
        )

      element.current.setAttribute("can-drop", true)

      window.addEventListener("touchmove", handleTouchMove)
      document.documentElement.addEventListener("touchend", handleTouchEnd)
      document.documentElement.addEventListener("touchcancel", handleTouchEnd)
      element.current.addEventListener("mousemove", handleMouseMove)
      element.current.addEventListener("mouseup", handleDrop, false)

      return () => {
        window.removeEventListener("touchmove", handleTouchMove)
        document.documentElement.removeEventListener("touchend", handleTouchEnd)
        document.documentElement.removeEventListener(
          "touchcancel",
          handleTouchEnd
        )
        element.current.removeEventListener("mousemove", handleMouseMove)
        element.current.removeEventListener("mouseup", handleDrop, false)
      }
    } else {
      return _.noop
    }
  }, [data, instance])
}

export default acceptDrop
