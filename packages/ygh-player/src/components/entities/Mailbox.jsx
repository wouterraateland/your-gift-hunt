import React, { useContext } from "react"
import Entities from "your-gift-hunt/entities"
import EntityDetails from "components/entityDetails"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import _ from "utils"
import GameContext from "contexts/Game"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: EntityDetails.Mailbox
  })
  const { getEntitiesByTemplateName } = useContext(GameContext)
  const notes = getEntitiesByTemplateName("Note")

  return (
    <Entities.Mailbox
      {...props}
      {...entityBehaviour}
      state={notes.some(note => _.hasState("unread")(note)) ? "open" : "closed"}
    />
  )
}
