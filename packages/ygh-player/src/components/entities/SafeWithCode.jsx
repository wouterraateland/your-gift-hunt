import React from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import SafeWithCodeScreen from "components/screens/SafeWithCode"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: SafeWithCodeScreen
  })
  return <Entities.SafeWithCode {...props} {...entityBehaviour} />
}
