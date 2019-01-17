import React, { useRef } from 'react'

import acceptDrop from 'hooks/acceptDrop'

import { Sink } from 'your-gift-hunt/objects'

const EnhancedSink = (props) => {
  const sink = useRef(null)

  acceptDrop({
    element: sink,
    instance: props,
    items: [
      {
        item: { entityId: 'watering-can', stateId: 'empty' },
        target: { entityId: 'sink', stateId: 'connected' },
      }
    ]
  })

  return (
    <Sink
      ref={{ sink }}
      {...props}
    />
  )
}

EnhancedSink.entityId = Sink.entityId
export default EnhancedSink
