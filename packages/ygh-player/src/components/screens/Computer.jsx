import React, { useContext } from 'react'

import GameContext from 'contexts/Game'

import { Computer } from 'your-gift-hunt/screens'

export default (props) => {
  const { state } = useContext(GameContext)
  const { questions, inputs } = state

  return (
    <Computer
      {...props}
      entities={[...questions, ...inputs]}
    />
  )
}
