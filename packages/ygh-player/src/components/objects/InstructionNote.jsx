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
EnhancedInstructionNote.entityName = InstructionNote.entityName

export default EnhancedInstructionNote
