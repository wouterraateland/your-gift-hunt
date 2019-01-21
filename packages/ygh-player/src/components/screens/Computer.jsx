import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Computer } from 'your-gift-hunt/screens'

export default (props) => {
  const {
    dispatchAction,
    instances: { questions, inputs }
  } = useContext(GameContext)

  return (
    <Computer
      {...props}
      onSubmitAnswer={(instanceId, answer) => {
        dispatchAction({
          type: 'input',
          payload: {
            instanceId,
            inputValues: { answer },
          },
        })
      }}
      instances={[...questions, ...inputs]}
    />
  )
}
