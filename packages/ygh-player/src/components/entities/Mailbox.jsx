import React, { useContext } from "react"
import Entities from "your-gift-hunt/entities"
import useEntityBehaviour from "hooks/useEntityBehaviour"

import MailboxScreen from "components/screens/Mailbox"

import _ from "utils"
import GameContext from "contexts/Game"

export default props => {
  const entityBehaviour = useEntityBehaviour(props, {
    detailScreen: MailboxScreen
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
