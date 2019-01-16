import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { InstructionNote } from 'your-gift-hunt/objects'
import NoteScreen from 'components/screens/Note'

const EnhancedInstructionNote = (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <InstructionNote
      {...props}
      onClick={() => popup(NoteScreen, { instanceId: props.id })}
    />
  )
}
EnhancedInstructionNote.entityId = InstructionNote.entityId

export default EnhancedInstructionNote
