import React, { useContext } from "react"

import GameContext from "contexts/Game"

import { Camera } from "your-gift-hunt/screens"

export default props => {
  const {
    dispatchAction,
    entities: { codes }
  } = useContext(GameContext)

  return (
    <Camera
      {...props}
      onScanCode={code => {
        dispatchAction({
          type: "SCAN",
          payload: { code }
        })
      }}
      instances={[...codes]}
    />
  )
}
