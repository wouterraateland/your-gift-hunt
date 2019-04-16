import React from "react"
import EntityDetails from "your-gift-hunt/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"
import Screens from "components/screens"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: Screens.MultiDetail
  })
  return <EntityDetails.Mailbox {...props} {...entityBehaviour} />
}
