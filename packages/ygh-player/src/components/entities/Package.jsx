import React, { useCallback, useState } from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import useGame from "hooks/useGame"

export default props => {
  const [state, setState] = useState("closed")
  const entityBehaviour = useEntityBehaviour(props)

  const { pickupEntity } = useGame()

  const dispatchInputAction = useCallback(
    (key, value) => {
      if (key === "state") {
        setState(value)
        if (value === "empty") {
          pickupEntity(props.id)
        }
      }
    },
    [props.id]
  )

  return (
    <Entities.Package
      {...props}
      {...entityBehaviour}
      dispatchInputAction={dispatchInputAction}
      state={state}
    />
  )
}
