import React, { useRef, useContext } from 'react'

import acceptDrop from 'hooks/acceptDrop'

import GameContext from 'contexts/Game'

import { SafeWithKeyhole } from 'your-gift-hunt/screens'

const EnhancedSafeWithKeyhole = ({ instanceId, ...props}) => {
  const keyhole = useRef(null)
  const { instances: { objects } } = useContext(GameContext)

  const instance = objects.find(instance => instance.id === instanceId)

  acceptDrop({
    element: keyhole,
    instance,
    items: [
      {
        item: { entityId: 'safe-key', stateId: 'default' },
        target: { entityId: 'safe-with-keyhole', stateId: 'locked' }
      }
    ]
  })

  return (
    <SafeWithKeyhole
      {...props}
      instance={instance}
      ref={{ keyhole }}
    />
  )
}

export default EnhancedSafeWithKeyhole
