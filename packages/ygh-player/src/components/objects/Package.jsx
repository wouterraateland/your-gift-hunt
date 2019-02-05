import React, { useContext, useState } from "react"

import GameContext from "contexts/Game"

import { Package } from "your-gift-hunt/objects"

const EnhancedPackage = props => {
  const [state, setState] = useState("closed")

  const { pickupItem } = useContext(GameContext)

  return (
    <Package
      {...props}
      state={{ name: state }}
      onClick={() => {
        switch (state) {
          case "closed":
            return setState("open")
          case "open":
            pickupItem(props.id)
            return setState("empty")
          default:
            return
        }
      }}
    />
  )
}
EnhancedPackage.entityName = Package.entityName

export default EnhancedPackage
