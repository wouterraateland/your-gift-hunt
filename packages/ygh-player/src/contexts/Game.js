import React, { createContext } from 'react'

import useGame from 'hooks/useGame'

const GameContext = createContext({})

export const GameProvider = ({ children }) => {
  const value = useGame()

  return (
    <GameContext.Provider
      value={value}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameContext
