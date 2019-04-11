import React, { useContext } from "react"

import GameContext from "contexts/Game"
import { ACTION_TYPES } from "ygh-player"

import { Camera } from "your-gift-hunt/screens"

export default props => {
  const { dispatchAction, getEntitiesByTemplateName } = useContext(GameContext)

  return (
    <Camera
      {...props}
      onScanCode={code => {
        dispatchAction({
          type: ACTION_TYPES.SCAN,
          payload: { code }
        })
      }}
      entities={getEntitiesByTemplateName("Code")}
    />
  )
}
