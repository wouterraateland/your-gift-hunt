import React from "react"
import { createInputAction } from "ygh-player"

import useGame from "hooks/useGame"

import { Computer } from "your-gift-hunt/entityDetails"

export default props => {
  const { dispatchAction, getEntitiesByTemplateName } = useGame()

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
