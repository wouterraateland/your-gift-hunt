import React, { useRef } from 'react'

import acceptDrop from 'hooks/acceptDrop'

import { PlantPot } from 'your-gift-hunt/objects'

const EnhancedPlantPot = (props) => {
  const plantPot = useRef(null)

  acceptDrop({
    element: plantPot,
    instance: props,
    items: [
      {
        item: { entityId: 'seeds', stateId: 'default' },
        target: { entityId: 'plant-pot', stateId: 'empty' },
      },
      {
        item: { entityId: 'watering-can', stateId: 'filled' },
        target: { entityId: 'plant-pot', stateId: 'planted' },
      },
      {
        item: { entityId: 'flashlight', stateId: 'on' },
        target: { entityId: 'plant-pot', stateId: 'planted' },
      },
    ]
  })

  return (
    <PlantPot
      ref={{ plantPot }}
      {...props}
    />
  )
}

EnhancedPlantPot.entityId = PlantPot.entityId
export default EnhancedPlantPot
