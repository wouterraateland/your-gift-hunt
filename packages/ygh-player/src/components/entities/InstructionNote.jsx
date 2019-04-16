import React, { memo } from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default memo(props => {
  const entityBehaviour = useEntityBehaviour(props)
  return <Entities.InstructionNote {...props} {...entityBehaviour} />
})
