import React, { useContext } from 'react'

import ScreenContext from 'contexts/Screen'

import { InstructionNote } from 'your-gift-hunt/objects'
import NoteScreen from 'components/screens/Note'

const EnhancedInstructionNote = ({ entity, ...props }) => {
  const { popup } = useContext(ScreenContext)

  return (
    <InstructionNote
      {...props}
      onClick={() => popup(NoteScreen, { entity })}
    />
  )
}
EnhancedInstructionNote.entityId = InstructionNote.entityId

export default EnhancedInstructionNote
