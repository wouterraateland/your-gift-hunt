import React, { memo } from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import Screens from "components/screens"

export default memo(props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: Screens.Camera
  })
  return <Entities.Camera {...props} {...entityBehaviour} />
})
