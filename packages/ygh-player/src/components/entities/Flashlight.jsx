import React, { memo } from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import { Flashlight } from "your-gift-hunt/entities"

export default memo(props => {
  const entityBehaviour = useEntityBehaviour(props)
  return <Flashlight {...props} {...entityBehaviour} />
})
