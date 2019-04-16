import React, { forwardRef } from "react"
import Note from "./Note"

const InstructionNote = forwardRef((props, ref) => (
  <Note
    ref={ref}
    {...props}
    fields={[
      {
        name: "Text",
        value:
          "Instructions:\nBelow, you see an mailbox. There might be a message for you there..."
      }
    ]}
  />
))
InstructionNote.name = "InstructionNote"
InstructionNote.templateName = "Instruction note"
InstructionNote.defaultProps = Note.defaultProps

export default InstructionNote
