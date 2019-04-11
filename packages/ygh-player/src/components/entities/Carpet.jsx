import React from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default props => {
  const entityBehaviour = useEntityBehaviour(props)
  return <Entities.Carpet {...props} {...entityBehaviour} />
}
