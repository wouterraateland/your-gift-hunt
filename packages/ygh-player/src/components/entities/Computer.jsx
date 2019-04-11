import React, { useContext } from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import _ from "utils"
import GameContext from "contexts/Game"
import ComputerScreen from "components/screens/Computer"

export default props => {
  const { getEntitiesByTemplateName } = useContext(GameContext)
  const entities = [
    ...getEntitiesByTemplateName("Question"),
    ...getEntitiesByTemplateName("Input")
  ]
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: ComputerScreen
  })
  return (
    <Entities.Computer
      {...props}
      {...entityBehaviour}
      state={
        entities.some(_.or(_.hasState("unanswered"), _.hasState("empty")))
          ? "on"
          : "off"
      }
    />
  )
}
