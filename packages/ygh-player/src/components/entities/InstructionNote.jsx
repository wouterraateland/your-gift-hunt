import React from "react"
import Entities from "your-gift-hunt/entities"
import EntityDetails from "components/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: EntityDetails.InstructionNote
  })
  return <Entities.InstructionNote {...props} {...entityBehaviour} />
}
