import React, { useContext } from "react"
import _ from "utils"
import { createInputAction } from "actions/creators"

import GameContext from "contexts/Game"

import { Door } from "your-gift-hunt/objects"

const EnhancedDoor = props => {
  const { dispatchAction } = useContext(GameContext)

  return (
    <Door
      {...props}
      onClick={() =>
        dispatchAction(
          createInputAction(props.id, {
            state: _.hasState("open")(props) ? "closed" : "open"
          })
        )
      }
    />
  )
}
EnhancedDoor.entityName = Door.entityName

export default EnhancedDoor
