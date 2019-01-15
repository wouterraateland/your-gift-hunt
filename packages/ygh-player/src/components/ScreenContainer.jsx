import React from 'react'

import Screen from 'components/screens'

const ScreenContainer = ({ currentScreen }) => {
  return currentScreen
    ? <Screen screen={currentScreen} />
    : null
}

export default ScreenContainer
