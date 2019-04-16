import React from "react"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import EntityDetails from "your-gift-hunt/entityDetails"

export default props => {
  const entityBehaviour = useEntityBehaviour(props)
  return <EntityDetails.Computer {...props} {...entityBehaviour} />
}
