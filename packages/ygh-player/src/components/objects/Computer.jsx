import React, { useContext } from "react"
import _ from "utils"

import GameContext from "contexts/Game"
import ScreenContext from "contexts/Screen"

import { Computer } from "your-gift-hunt/objects"
import ComputerScreen from "components/screens/Computer"

const EnhancedComputer = props => {
  const { popup } = useContext(ScreenContext)
  const {
    instances: { questions, inputs }
  } = useContext(GameContext)

  return (
    <Computer
      {...props}
      state={{
        name: [...questions, ...inputs].some(
          instance =>
            _.hasState("unanswered")(instance) || _.hasState("empty")(instance)
        )
          ? "on"
          : "off"
      }}
      onClick={() => popup(ComputerScreen)}
    />
  )
}
EnhancedComputer.entityName = Computer.entityName

export default EnhancedComputer
