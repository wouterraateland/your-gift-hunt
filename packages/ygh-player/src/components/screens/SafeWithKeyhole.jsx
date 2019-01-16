import React, { useRef, useEffect, useContext } from 'react'

import DragContext from 'contexts/Drag'
import GameContext from 'contexts/Game'

import { SafeWithKeyhole } from 'your-gift-hunt/screens'

const EnhancedSafeWithKeyhole = ({ instanceId, ...props}) => {
  const keyhole = useRef(null)
  const { state: { objects }, dispatchAction } = useContext(GameContext)
  const { data, enableDrop } = useContext(DragContext)

  const instance = objects.find(instance => instance.id === instanceId)

  const handleDragOverKeyhole = (event) => {
    event.path.includes(keyhole.current) &&
    data && data.entity && data.entity.id === '/entities/safe-key' && enableDrop()
  }

  function handleDropKeyhole(event) {
    // event.preventDefault()
    //
    // console.log('hoi')
    // console.log(event.dataTransfer.getData('text/plain'))
    // console.log(event.dataTransfer.getData('application/json'))
    // const item = event.dataTransfer.getData('application/json')
    //
    // dispatchAction({
    //   type: '/actions/use',
    //   payload: {
    //     itemId: item.id,
    //     instanceId: instance.id,
    //   }
    // })
  }

  useEffect(() => {
    keyhole.current.setAttribute('can-drop', true)
    keyhole.current.addEventListener('touchmove', handleDragOverKeyhole)
    keyhole.current.addEventListener('mousemove', handleDragOverKeyhole)
    keyhole.current.addEventListener('touchend', handleDropKeyhole)
    keyhole.current.addEventListener('mouseup', handleDropKeyhole)

    return () => {
      keyhole.current.removeEventListener('touchmove', handleDragOverKeyhole)
      keyhole.current.removeEventListener('mousemove', handleDragOverKeyhole)
      keyhole.current.removeEventListener('touchend', handleDropKeyhole)
      keyhole.current.removeEventListener('mouseup', handleDropKeyhole)
    }
  }, [data])

  return (
    <SafeWithKeyhole
      {...props}
      instance={instance}
      ref={{ keyhole }}
    />
  )
}

export default EnhancedSafeWithKeyhole
