import React, { createContext } from 'react'

import useGameState from 'hooks/useGameState'

const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  const value = {
    instances: useGameState(),
    dispatchAction: console.log,
  }

  return (
    <GameContext.Provider
      value={value}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameContext
