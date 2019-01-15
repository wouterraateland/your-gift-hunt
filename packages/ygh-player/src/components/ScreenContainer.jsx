import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

const ScreenContainer = () => {
  const { screen, close } = useContext(ScreenContext)
  const Component = screen ? screen.component : null

  return Component
    ? <Component {...screen.props} isVisible close={close} />
    : null
}

export default ScreenContainer
