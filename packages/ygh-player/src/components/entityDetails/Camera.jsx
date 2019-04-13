import React from "react"

import useGame from "hooks/useGame"
import { ACTION_TYPES } from "ygh-player"

import { Camera } from "your-gift-hunt/entityDetails"

export default props => {
  const { dispatchAction, getEntitiesByTemplateName } = useGame()

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
