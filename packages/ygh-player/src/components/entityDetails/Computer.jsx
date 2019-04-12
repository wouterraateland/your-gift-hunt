import React, { useContext } from "react"
import { createInputAction } from "ygh-player"

import GameContext from "contexts/Game"

import { Computer } from "your-gift-hunt/entityDetails"

export default props => {
  const { dispatchAction, getEntitiesByTemplateName } = useContext(GameContext)

  return (
    <Computer
      {...props}
      onSubmitAnswer={(entityId, answer) => {
        dispatchAction(createInputAction(entityId, { answer }))
      }}
      entities={[
        ...getEntitiesByTemplateName("Question"),
        ...getEntitiesByTemplateName("Input")
      ]}
    />
  )
}
