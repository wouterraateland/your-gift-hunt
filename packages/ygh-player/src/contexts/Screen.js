import React, { createContext, useState } from 'react'

const ScreenContext = createContext({})

export const ScreenProvider = ({ children }) => {
  const [screen, setScreen] = useState(null)

  const value = {
    screen,
    popup: (component, props) => setScreen({
      component,
      props
    }),
    close: () => setScreen(null)
  }

  return (
    <ScreenContext.Provider
      value={value}
    >
      {children}
    </ScreenContext.Provider>
  )
}

export default ScreenContext
