import React, { memo } from "react"
import Entities from "your-gift-hunt/entities"
import EntityDetails from "components/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default memo(props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: EntityDetails.Camera
  })
  return <Entities.Camera {...props} {...entityBehaviour} />
})
