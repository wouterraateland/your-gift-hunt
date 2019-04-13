import React, { memo } from "react"
import Entities from "your-gift-hunt/entities"
import EntityDetails from "components/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import _ from "utils"
import useGame from "hooks/useGame"

export default memo(props => {
  const { getEntitiesByTemplateName } = useGame()
  const entities = [
    ...getEntitiesByTemplateName("Question"),
    ...getEntitiesByTemplateName("Input")
  ]
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: EntityDetails.Computer
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
})
