import React, { useRef } from "react"

import acceptDrop from "hooks/acceptDrop"

import { PlantPot } from "your-gift-hunt/objects"

const EnhancedPlantPot = props => {
  const plantPot = useRef(null)

  acceptDrop({
    element: plantPot,
    instance: props,
    items: [
      {
        item: { entityName: "Seeds", stateName: "default" },
        target: { entityName: "Plant pot", stateName: "empty" }
      },
      {
        item: { entityName: "Watering can", stateName: "filled" },
        target: { entityName: "Plant pot", stateName: "planted" }
      },
      {
        item: { entityName: "Flashlight", stateName: "on" },
        target: { entityName: "Plant pot", stateName: "planted" }
      }
    ]
  })

  return <PlantPot ref={{ plantPot }} {...props} />
}

EnhancedPlantPot.entityName = PlantPot.entityName
export default EnhancedPlantPot
