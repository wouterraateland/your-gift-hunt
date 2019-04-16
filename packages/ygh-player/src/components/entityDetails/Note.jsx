import React from "react"
import EntityDetails from "your-gift-hunt/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"

export default props => {
  const entityBehaviour = useEntityBehaviour(props)
  return <EntityDetails.Note {...props} {...entityBehaviour} />
}
