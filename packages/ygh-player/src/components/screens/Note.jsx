import React, { useContext } from "react"
import { createInputAction } from "ygh-player"

import GameContext from "contexts/Game"

import { Note } from "your-gift-hunt/screens"

export default ({ entityId, ...props }) => {
  const { dispatchAction, getEntityById } = useContext(GameContext)
  const entity = getEntityById(entityId)

  return (
    <Note
      {...props}
      entity={entity}
      onReadNote={entityId => {
        dispatchAction(createInputAction(entityId))
      }}
    />
  )
}
