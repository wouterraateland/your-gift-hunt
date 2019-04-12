import React from 'react'

import Screen from './Screen'
import { Note } from './Note'

const InstructionNoteScreen = ({
  isVisible,
  close
}) => {
  return (
    <Screen isVisible={isVisible} onClick={close}>
      <Note
        isVisible={isVisible}
        onClick={close}
      >
        <p>Instructions:<br />Below, you see an mailbox. There might be a message for you there...</p>
      </Note>
    </Screen>
  )
}

export default InstructionNoteScreen
