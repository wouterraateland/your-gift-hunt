import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Computer } from 'your-gift-hunt/screens'

export default (props) => {
  const { dispatchAction, state } = useContext(GameContext)
  const { questions, inputs } = state

  return (
    <Computer
      {...props}
      onSubmitAnswer={(entity, answer) => {
        dispatchAction({
          entity,
          type: '/actions/act',
          payload: { answer },
        })
      }}
      entities={[...questions, ...inputs]}
    />
  )
}
