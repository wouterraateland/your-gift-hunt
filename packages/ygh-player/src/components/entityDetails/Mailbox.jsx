import React, { useContext } from "react"
import { createInputAction } from "ygh-player"

import GameContext from "contexts/Game"

import { Mailbox } from "your-gift-hunt/entityDetails"

export default props => {
  const { dispatchAction, getEntitiesByTemplateName } = useContext(GameContext)

  return (
    <Mailbox
      {...props}
      onReadNote={entityId => {
        dispatchAction(createInputAction(entityId))
      }}
      entities={[...getEntitiesByTemplateName("Note")]}
    />
  )
}
