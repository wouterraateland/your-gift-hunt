import React, { useContext } from "react"
import _ from "utils"

import ScreenContext from "contexts/Screen"
import GameContext from "contexts/Game"

import { Mailbox } from "your-gift-hunt/objects"
import MailboxScreen from "components/screens/Mailbox"

const EnhancedMailbox = props => {
  const { popup } = useContext(ScreenContext)
  const {
    instances: { notes }
  } = useContext(GameContext)

  return (
    <Mailbox
      {...props}
      state={{
        name: notes.some(note => _.hasState("unread")(note)) ? "open" : "closed"
      }}
      onClick={() => popup(MailboxScreen)}
    />
  )
}
EnhancedMailbox.entityName = Mailbox.entityName

export default EnhancedMailbox
