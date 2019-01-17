import { useEffect, useContext } from 'react'
import _ from 'utils'

import DragContext from 'contexts/Drag'
import GameContext from 'contexts/Game'

const isChildOrSame = (element, parent) =>
  element && (
    element === parent ||
    isChildOrSame(element.parentElement, parent)
  )

const acceptDrop = ({ element, instance, items }) => {
  const { data, enableDrop } = useContext(DragContext)
  const { dispatchAction } = useContext(GameContext)

  useEffect(() => {
    if (
      items.some(({ item, target }) => (
        _.hasState(item.entityId, item.stateId)(data) &&
        _.hasState(target.entityId, target.stateId)(instance)
      ))
    ) {
      const handleMouseMove = enableDrop

      const handleTouchMove = (event) => {
        const cursor = event.touches ? event.touches[0] : event
        const touchTarget = document.elementFromPoint(cursor.clientX, cursor.clientY)

        if (isChildOrSame(touchTarget, element.current)) {
          handleMouseMove(event)
        }
      }

      const handleDrop = () => dispatchAction({
        type: '/actions/use',
        payload: {
          itemId: data.id,
          instanceId: instance.id,
        }
      })

      element.current.setAttribute('can-drop', true)
      window.addEventListener('touchmove', handleTouchMove)
      element.current.addEventListener('mousemove', handleMouseMove)
      element.current.addEventListener('touchend', handleDrop, false)
      element.current.addEventListener('mouseup', handleDrop, false)

      return () => {
        window.removeEventListener('touchmove', handleTouchMove)
        element.current.removeEventListener('mousemove', handleMouseMove)
        element.current.removeEventListener('touchend', handleDrop)
        element.current.removeEventListener('mouseup', handleDrop, false)
      }
    } else {
      return _.noop
    }
  }, [data, instance])
}

export default acceptDrop
