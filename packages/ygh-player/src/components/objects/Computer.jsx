import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { Computer } from 'your-gift-hunt/objects'
import ComputerScreen from 'components/screens/Computer'

export default (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <Computer
      {...props}
      onClick={() => popup(ComputerScreen, {})}
    />
  )
}
