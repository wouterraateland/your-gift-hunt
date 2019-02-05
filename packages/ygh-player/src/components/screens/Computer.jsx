import React, { useContext } from "react"
import { createInputAction } from "actions/creators"

import GameContext from "contexts/Game"

import { Computer } from "your-gift-hunt/screens"

export default props => {
  const {
    dispatchAction,
    instances: { questions, inputs }
  } = useContext(GameContext)

  return (
    <Computer
      {...props}
      onSubmitAnswer={(instanceId, answer) => {
        dispatchAction(createInputAction(instanceId, { answer }))
      }}
      instances={[...questions, ...inputs]}
    />
  )
}
