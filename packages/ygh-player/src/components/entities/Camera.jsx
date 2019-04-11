import React from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import CameraScreen from "components/screens/Camera"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: CameraScreen
  })
  return <Entities.Camera {...props} {...entityBehaviour} />
}
