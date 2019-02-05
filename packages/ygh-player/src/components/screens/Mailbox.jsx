import React, { useContext } from "react"
import { createInputAction } from "actions/creators"

import GameContext from "contexts/Game"

import { Mailbox } from "your-gift-hunt/screens"

export default props => {
  const {
    dispatchAction,
    instances: { notes }
  } = useContext(GameContext)

  return (
    <Mailbox
      {...props}
      onReadNote={instanceId => {
        dispatchAction(createInputAction(instanceId))
      }}
      instances={[...notes]}
    />
  )
}
