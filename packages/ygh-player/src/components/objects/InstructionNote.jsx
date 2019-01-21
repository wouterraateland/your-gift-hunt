import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { InstructionNote } from 'your-gift-hunt/objects'
import InstructionNoteScreen from 'components/screens/InstructionNote'

const EnhancedInstructionNote = (props) => {
  const { popup } = useContext(ScreenContext)

  return (
    <InstructionNote
      {...props}
      onClick={() => popup(InstructionNoteScreen)}
    />
  )
}
EnhancedInstructionNote.entityId = InstructionNote.entityId

export default EnhancedInstructionNote
