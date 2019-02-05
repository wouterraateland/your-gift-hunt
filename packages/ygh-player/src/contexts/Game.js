import React, { createContext } from 'react'

import useGame from 'hooks/useGame'

const GameContext = createContext({})

export const GameProvider = ({ children, creatorSlug, gameSlug }) => {
  const value = useGame(creatorSlug, gameSlug)

  return (
    <GameContext.Provider
      value={value}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameContext
