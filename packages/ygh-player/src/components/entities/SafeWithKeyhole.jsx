import React from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import SafeWithKeyholeScreen from "components/screens/SafeWithKeyhole"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: SafeWithKeyholeScreen
  })
  return <Entities.SafeWithKeyhole {...props} {...entityBehaviour} />
}
