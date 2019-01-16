import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { Computer } from 'your-gift-hunt/objects'
import ComputerScreen from 'components/screens/Computer'

const EnhancedComputer = (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <Computer
      {...props}
      onClick={() => popup(ComputerScreen)}
    />
  )
}
EnhancedComputer.entityId = Computer.entityId

export default EnhancedComputer
