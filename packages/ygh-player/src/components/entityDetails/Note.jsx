import React from "react"
import { createInputAction } from "ygh-player"

import useGame from "hooks/useGame"

import { Note } from "your-gift-hunt/entityDetails"

export default ({ entityId, ...props }) => {
  const { dispatchAction, getEntityById } = useGame()
  const entity = getEntityById(entityId)

  return (
    <Note
      {...props}
      entity={entity}
      onReadNote={state => {
        dispatchAction(createInputAction(state))
      }}
    />
  )
}
