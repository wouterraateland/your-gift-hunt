import React from "react"
import { createInputAction } from "ygh-player"

import useGame from "hooks/useGame"

import { Mailbox } from "your-gift-hunt/entityDetails"

export default props => {
  const { dispatchAction, getEntitiesByTemplateName } = useGame()

  return (
    <Mailbox
      {...props}
      onReadNote={state => {
        dispatchAction(createInputAction(state))
      }}
      entities={[...getEntitiesByTemplateName("Note")]}
    />
  )
}
