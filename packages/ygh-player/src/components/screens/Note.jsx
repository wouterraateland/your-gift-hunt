import React, { useContext } from "react"
import { createInputAction } from "actions/creators"

import GameContext from "contexts/Game"

import { Note } from "your-gift-hunt/screens"

export default ({ instanceId, ...props }) => {
  const {
    dispatchAction,
    entities: { all }
  } = useContext(GameContext)
  const instance = all.find(instance => instance.id === instanceId)

  return (
    <Note
      {...props}
      instance={instance}
      onReadNote={instanceId => {
        dispatchAction(createInputAction(instanceId))
      }}
    />
  )
}
