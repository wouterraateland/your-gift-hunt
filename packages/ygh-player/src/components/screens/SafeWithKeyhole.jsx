import React, { useRef, useContext } from "react"

import acceptDrop from "hooks/acceptDrop"

import GameContext from "contexts/Game"

import { SafeWithKeyhole } from "your-gift-hunt/screens"

const EnhancedSafeWithKeyhole = ({ instanceId, ...props }) => {
  const keyhole = useRef(null)
  const {
    instances: { objects },
    pickupItem
  } = useContext(GameContext)

  const instance = objects.find(instance => instance.id === instanceId)

  acceptDrop({
    element: keyhole,
    instance,
    items: [
      {
        item: { entityName: "Safe key", stateName: "default" },
        target: { entityName: "Safe with keyhole", stateName: "locked" }
      }
    ],
    onDropActionPerformed: updatedInstances => {
      updatedInstances
        .filter(({ entity: { isItem }, state }) => isItem && state)
        .map(({ id }) => pickupItem(id))
    }
  })

  return <SafeWithKeyhole {...props} instance={instance} ref={{ keyhole }} />
}

export default EnhancedSafeWithKeyhole
