import React, { forwardRef } from "react"
import styled from "styled-components"

import Entity from "../Entity"
import NoteDetail from "../EntityDetails/Note"

const Note = styled(Entity)`
  padding: 0.25em;

  perspective: 100px;
  transform-style: preserve-3d;
`

const Paper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background: #f5f0d7;

  transform: rotate3d(0, 0, 1, 0deg);
`

const PaperClip = styled.div`
  position: absolute;
  right: 0.3em;
  top: -0.1em;

  width: 0.3em;
  height: 1em;

  border: 0.05em solid #999;
  border-radius: 0.15em 0.15em 0.1em 0.1em;

  transform: rotate3d(1, 10, 0, -5deg);
`

const PaperClip2 = styled.div`
  position: absolute;
  right: 0.3em;
  top: 0.1em;

  width: 0.2em;
  height: 0.8em;

  border-left: 0.05em solid #999;
  border-bottom: 0.05em solid #999;
  border-radius: 0 0 0.1em 0.1em;

  box-shadow: inset 0.05em -0.05em 0.1em -0.05em #0004,
    0.05em 0.05em 0.1em #0004;
`

const Text = styled.span`
  display: inline-block;

  white-space: nowrap;

  font-family: cursive;
  font-size: 0.6em;

  transform: translate(-0.5em, 1em) rotate(90deg);

  -webkit-touch-callout: none;
  user-select: none;
`

const InstructionNote = forwardRef(({ inspect, ...props }, ref) => (
  <Note {...props} onClick={inspect} ref={ref}>
    <Paper />
    <PaperClip />
    <PaperClip2 />
    <Text>Read me</Text>
  </Note>
))
InstructionNote.name = "InstructionNote"
InstructionNote.templateName = "Instruction note"
InstructionNote.defaultProps = {
  ...Entity.defaultProps,
  z: 0.1,
  width: 2,
  height: 3
}
InstructionNote.Detail = NoteDetail

export default InstructionNote
