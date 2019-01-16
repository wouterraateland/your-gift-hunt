import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { Mailbox } from 'your-gift-hunt/objects'
import MailboxScreen from 'components/screens/Mailbox'

const EnhancedMailbox = (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <Mailbox
      {...props}
      onClick={() => popup(MailboxScreen)}
    />
  )
}
EnhancedMailbox.entityId = Mailbox.entityId

export default EnhancedMailbox
