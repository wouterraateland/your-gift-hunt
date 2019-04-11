import React from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import InstructionNoteScreen from "components/screens/InstructionNote"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: InstructionNoteScreen
  })
  return <Entities.InstructionNote {...props} {...entityBehaviour} />
}
