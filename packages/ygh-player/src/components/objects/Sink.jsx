import React, { useRef } from "react"

import acceptDrop from "hooks/acceptDrop"

import { Sink } from "your-gift-hunt/objects"

const EnhancedSink = props => {
  const sink = useRef(null)

  acceptDrop({
    element: sink,
    instance: props,
    items: [
      {
        item: { entityName: "Watering can", stateName: "empty" },
        target: { entityName: "Sink", stateName: "connected" }
      }
    ]
  })

  return <Sink ref={{ sink }} {...props} />
}

EnhancedSink.entityName = Sink.entityName
export default EnhancedSink
