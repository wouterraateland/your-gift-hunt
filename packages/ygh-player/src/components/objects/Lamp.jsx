import React, { useContext } from "react"
import _ from "utils"
import { createInputAction } from "actions/creators"

import GameContext from "contexts/Game"

import { Lamp } from "your-gift-hunt/objects"

const EnhancedLamp = props => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Lamp
      {...props}
      onClick={() =>
        dispatchAction(
          createInputAction(props.id, {
            power: _.hasState("on")(props) ? "off" : "on"
          })
        )
      }
    />
  )
}
EnhancedLamp.entityName = Lamp.entityName

export default EnhancedLamp
