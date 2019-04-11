import React from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import { Flashlight } from "your-gift-hunt/entities"

export default props => {
  const entityBehaviour = useEntityBehaviour(props)
  return <Flashlight {...props} {...entityBehaviour} />
}
